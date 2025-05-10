import {
  OPENAI_EMBEDDING_MODEL,
  PDF_CHAT_SYSTEM_PROMPT,
  PINECONE_INDEX_NAME,
} from '../../../constants';
import { NextFunction, Response } from 'express';
import { openai } from '@ai-sdk/openai';
import { CustomRequest } from 'types/custom-request';
import { Query } from '../model/query.model';
import pinecone from 'libs/pinecone';
import { PineconeStore } from '@langchain/pinecone';
import { OpenAIEmbeddings } from '@langchain/openai';
import { OPENAI_API_KEY } from 'config/env';
import { CoreMessage, streamText } from 'ai';
import ErrorResponse from 'helper/errorResponse';
import fs from 'fs';
import path from 'path';
import mammoth from 'mammoth';
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';
import Resource from '../model/resource.model';

const embeddings = new OpenAIEmbeddings({
  model: OPENAI_EMBEDDING_MODEL,
  openAIApiKey: OPENAI_API_KEY!,
});

export const chatWithDocument = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userPrompt, namespace, userId, sessionId } = req.value;

    const chatSession = await Query.findOne({ userClerkId: userId, sessionId });
    if (!chatSession) {
      throw new Error('Chat session not found');
    }

    const pineconeIndex = pinecone.Index(PINECONE_INDEX_NAME);
    const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
      pineconeIndex,
      namespace,
    });

    if (!vectorStore) {
      console.log('No vector store found');
      return next(new ErrorResponse('Vector store not found', 404));
    }

    const results = await vectorStore.similaritySearch(userPrompt, 5);
    const messages: CoreMessage[] = [
      {
        role: 'system',
        content: PDF_CHAT_SYSTEM_PROMPT,
      },
      {
        role: 'user',
        content: `Use the following context or previous conversation to respond in markdown format. If you don't know the answer, acknowledge it and avoid making up information.
                   CONTEXT:
                   ${results && results.map((r) => r.pageContent).join('\n\n')}
                   
                   USER INPUT: ${userPrompt}`,
      },
    ];

    // Stream response from GPT-4
    const streamedText = await streamText({
      model: openai('gpt-4'),
      system:
        typeof messages[0].content === 'string' ? messages[0].content : '',
      messages,
    });
    let aiResponse = '';
    const stream = streamedText.textStream;

    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Transfer-Encoding', 'chunked');

    for await (const textPart of stream) {
      aiResponse += textPart;
      res.write(textPart);
    }

    res.end();
    chatSession.messages.push(
      {
        sender: 'user',
        text: userPrompt,
        timestamps: new Date(),
      },
      {
        sender: 'model',
        text: aiResponse,
        timestamps: new Date(),
      },
    );
    await chatSession.save();
  } catch (error) {
    console.error(error);
    next(new ErrorResponse('Internal server error', 500));
  }
};

export const uploadPdf = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { documentName, userId, documentUrl } = req.value;
    const namespace = `${userId}-${documentName}`;
    const response = await fetch(documentUrl);
    const contentType = response.headers.get('content-type') || '';
    const arrayBuffer = await response.arrayBuffer();

    let fileExtension = '';
    if (contentType.includes('pdf')) {
      fileExtension = '.pdf';
    } else if (
      contentType.includes('officedocument.wordprocessingml.document')
    ) {
      fileExtension = '.docx';
    } else {
      return res
        .status(500)
        .json({ success: false, message: 'Unsupported file type' });
    }

    const uploadsDir = path.join(__dirname, '/uploads');

    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const filePath = path.join(uploadsDir, `${documentName}${fileExtension}`);
    fs.writeFileSync(filePath, Buffer.from(arrayBuffer));

    let pageLevelDocs;

    if (fileExtension === '.pdf') {
      // 3️⃣ Process PDF
      const loader = new PDFLoader(filePath);
      pageLevelDocs = await loader.load();
      console.log(pageLevelDocs);
    } else if (fileExtension === '.docx') {
      // 4️⃣ Process DOCX (Extract Text)
      const docBuffer = fs.readFileSync(filePath);
      const { value: text } = await mammoth.extractRawText({
        buffer: docBuffer,
      });
      pageLevelDocs = [{ pageContent: text, metadata: { documentName } }];
      console.log(pageLevelDocs);
    }

    // 5️⃣ Upload to Pinecone
    const pineconeIndex = pinecone.Index(PINECONE_INDEX_NAME);

    await PineconeStore.fromDocuments(pageLevelDocs!, embeddings, {
      pineconeIndex,
      namespace,
    });
    await Resource.create({
      documentName,
      documentUrl,
      userId,
      namespace,
    });

    return res.status(200).json({
      success: true,
      message: 'Document uploaded successfully',
    });
  } catch (error) {
    console.error(error);
    next(new ErrorResponse('Internal server error', 500));
  }
};

export const startChatSession = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = req.value;
    const query = await Query.create({
      userClerkId: userId,
      sessionId: new Date().getTime().toString(),
    });

    if (!query) {
      return next(
        new ErrorResponse('Error occured while creating the session.', 400),
      );
    }

    res.status(200).json({
      success: true,
      message: 'Session started',
      data: query,
    });
  } catch (error) {
    console.error('Error starting session', error);
    return next(new ErrorResponse('Internal server error', 500));
  }
};
