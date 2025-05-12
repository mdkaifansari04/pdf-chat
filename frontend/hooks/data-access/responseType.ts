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

export interface TopInteractingUsers {
  _id: string;
  totalSessions: number;
  sessionsWith10Messages: number;
}
export interface Analytics {
  totalUsers: number;
  totalResources: number;
  totalQueries: number;
  avgQueriesPerUser: number;
  avgResourcesPerUser: number;
  userGrowth: number;
  resourceGrowth: number;
  queryGrowth: number;
  avgQueriesGrowth: number;
  avgResourcesGrowth: number;
  resourcesUploadedByUser: { name: string; value: number }[];
  userSignups: { date: string; count: number }[];
  topInteractingUsers: TopInteractingUsers[];
}

export interface User {
  _id: string;
  clerkId: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
