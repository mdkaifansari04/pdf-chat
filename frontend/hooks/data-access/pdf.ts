import axios from 'axios';
import { ApiResponse } from './responseType';

const pdfApi = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_HOST_URL}/pdf`,
});

interface ChatWithDocumentRequest {
  sessionId: string;
  namespace: string;
  userId: string;
  userPrompt: string;
}
interface UploadDocumentRequest {
  documentName: string;
  documentUrl: string;
  userId: string;
}

export const chatWithDocument = async (body: ChatWithDocumentRequest) => {
  const response: Response = await fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/pdf/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userPrompt: body.userPrompt,
      sessionId: body.sessionId,
      namespace: body.namespace,
      userId: body.userId,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch chat response');
  }
  return response;
};

export const uploadDocument = async (body: UploadDocumentRequest) => {
  const { data } = await pdfApi.post<ApiResponse>('/upload', body);
  return data;
};
