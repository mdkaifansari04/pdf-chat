import axios from 'axios';
import { ApiResponse, Resource } from './responseType';
import { ResourceLimits } from 'worker_threads';
import { useUser } from '@clerk/nextjs';

const resourceApi = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_HOST_URL}/resources`,
});

export const getResearchPapers = async (userId: string) => {
  const { data } = await resourceApi.get<ApiResponse<Resource[]>>(`/${userId}`);
  return data.data;
};
