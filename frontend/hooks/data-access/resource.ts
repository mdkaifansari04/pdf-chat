import axios from 'axios';
import { ApiResponse, Resource } from './responseType';

const resourceApi = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_HOST_URL}/resources`,
});

export const getResources = async (userId: string) => {
  const { data } = await resourceApi.get<ApiResponse<Resource[]>>(`/${userId}`);
  return data.data;
};

export const getAllResources = async () => {
  const { data } = await resourceApi.get<ApiResponse<Resource[]>>(`/`);
  return data.data;
};
