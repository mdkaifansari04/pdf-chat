export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data: T;
}

export interface Message {
  sender: 'user' | 'model';
  text: string;
  timestamps: string;
  _id: string;
}

export interface Query {
  userClerkId: string;
  sessionId: string;
  _id: string;
  messages: Message[];
  createdAt: '2025-03-28T10:43:02.252Z';
  updatedAt: '2025-03-28T10:43:02.252Z';
  __v: number;
}

export interface Resource {
  _id: string;
  documentName: string;
  documentUrl: string;
  userId: string;
  namespace: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
