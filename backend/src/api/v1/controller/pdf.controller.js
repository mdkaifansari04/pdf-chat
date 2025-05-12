"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startChatSession = exports.uploadPdf = exports.chatWithDocument = void 0;
const constants_1 = require("../../../constants");
const openai_1 = require("@ai-sdk/openai");
const query_model_1 = require("../model/query.model");
const pinecone_1 = __importDefault(require("libs/pinecone"));
const pinecone_2 = require("@langchain/pinecone");
const openai_2 = require("@langchain/openai");
const env_1 = require("config/env");
const ai_1 = require("ai");
const errorResponse_1 = __importDefault(require("helper/errorResponse"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const mammoth_1 = __importDefault(require("mammoth"));
const pdf_1 = require("@langchain/community/document_loaders/fs/pdf");
const resource_model_1 = __importDefault(require("../model/resource.model"));
const embeddings = new openai_2.OpenAIEmbeddings({
    model: constants_1.OPENAI_EMBEDDING_MODEL,
    openAIApiKey: env_1.OPENAI_API_KEY,
});
const chatWithDocument = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, e_1, _b, _c;
    try {
        const { userPrompt, namespace, userId, sessionId } = req.value;
        const chatSession = yield query_model_1.Query.findOne({ userClerkId: userId, sessionId });
        if (!chatSession) {
            throw new Error('Chat session not found');
        }
        console.log(namespace);
        const pineconeIndex = pinecone_1.default.Index(constants_1.PINECONE_INDEX_NAME);
        const vectorStore = yield pinecone_2.PineconeStore.fromExistingIndex(embeddings, {
            pineconeIndex,
            namespace,
        });
        if (!vectorStore) {
            console.log('No vector store found');
            return next(new errorResponse_1.default('Vector store not found', 404));
        }
        const results = yield vectorStore.similaritySearch(userPrompt, 5);
        const messages = [
            {
                role: 'system',
                content: constants_1.PDF_CHAT_SYSTEM_PROMPT,
            },
            {
                role: 'user',
                content: `Use the following context or previous conversation to respond in markdown format. If you don't know the answer, acknowledge it and avoid making up information.
                   CONTEXT:
                   ${results && results.map((r) => r.pageContent).join('\n\n')}
                   
                   USER INPUT: ${userPrompt}`,
            },
        ];
        console.log(results);
        // Stream response from GPT-4
        const streamedText = yield (0, ai_1.streamText)({
            model: (0, openai_1.openai)('gpt-4'),
            system: typeof messages[0].content === 'string' ? messages[0].content : '',
            messages,
        });
        let aiResponse = '';
        const stream = streamedText.textStream;
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.setHeader('Transfer-Encoding', 'chunked');
        try {
            for (var _d = true, stream_1 = __asyncValues(stream), stream_1_1; stream_1_1 = yield stream_1.next(), _a = stream_1_1.done, !_a; _d = true) {
                _c = stream_1_1.value;
                _d = false;
                const textPart = _c;
                aiResponse += textPart;
                res.write(textPart);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (!_d && !_a && (_b = stream_1.return)) yield _b.call(stream_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        res.end();
        chatSession.messages.push({
            sender: 'user',
            text: userPrompt,
            timestamps: new Date(),
        }, {
            sender: 'model',
            text: aiResponse,
            timestamps: new Date(),
        });
        yield chatSession.save();
    }
    catch (error) {
        console.error(error);
        next(new errorResponse_1.default('Internal server error', 500));
    }
});
exports.chatWithDocument = chatWithDocument;
const uploadPdf = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { documentName, userId, documentUrl } = req.value;
        const namespace = `${userId}-${documentName}`;
        const response = yield fetch(documentUrl);
        const contentType = response.headers.get('content-type') || '';
        const arrayBuffer = yield response.arrayBuffer();
        let fileExtension = '';
        if (contentType.includes('pdf')) {
            fileExtension = '.pdf';
        }
        else if (contentType.includes('officedocument.wordprocessingml.document')) {
            fileExtension = '.docx';
        }
        else {
            return res
                .status(500)
                .json({ success: false, message: 'Unsupported file type' });
        }
        const uploadsDir = path_1.default.join(__dirname, '/uploads');
        if (!fs_1.default.existsSync(uploadsDir)) {
            fs_1.default.mkdirSync(uploadsDir, { recursive: true });
        }
        const filePath = path_1.default.join(uploadsDir, `${documentName}${fileExtension}`);
        fs_1.default.writeFileSync(filePath, Buffer.from(arrayBuffer));
        let pageLevelDocs = [];
        if (fileExtension === '.pdf') {
            // 3️⃣ Process PDF
            const loader = new pdf_1.PDFLoader(filePath);
            pageLevelDocs = yield loader.load();
        }
        else if (fileExtension === '.docx') {
            // 4️⃣ Process DOCX (Extract Text)
            const docBuffer = fs_1.default.readFileSync(filePath);
            const { value: text } = yield mammoth_1.default.extractRawText({
                buffer: docBuffer,
            });
            pageLevelDocs = [{ pageContent: text, metadata: { documentName } }];
        }
        if (pageLevelDocs.length === 0) {
            return next(new errorResponse_1.default('No content found in the document, Please upload a valid document', 400));
        }
        const pineconeIndex = pinecone_1.default.Index(constants_1.PINECONE_INDEX_NAME);
        yield pinecone_2.PineconeStore.fromDocuments(pageLevelDocs, embeddings, {
            pineconeIndex,
            namespace,
        });
        yield resource_model_1.default.create({
            documentName,
            documentUrl,
            userId,
            namespace,
        });
        return res.status(200).json({
            success: true,
            message: 'Document uploaded successfully',
        });
    }
    catch (error) {
        console.error(error);
        next(new errorResponse_1.default('Internal server error', 500));
    }
});
exports.uploadPdf = uploadPdf;
const startChatSession = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.value;
        const query = yield query_model_1.Query.create({
            userClerkId: userId,
            sessionId: new Date().getTime().toString(),
        });
        if (!query) {
            return next(new errorResponse_1.default('Error occured while creating the session.', 400));
        }
        res.status(200).json({
            success: true,
            message: 'Session started',
            data: query,
        });
    }
    catch (error) {
        console.error('Error starting session', error);
        return next(new errorResponse_1.default('Internal server error', 500));
    }
});
exports.startChatSession = startChatSession;
