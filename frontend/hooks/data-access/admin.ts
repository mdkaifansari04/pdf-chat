import axios from 'axios';
import { Analytics, ApiResponse, Query, User } from './responseType';

const adminApi = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_HOST_URL}`,
});

export const login = async (body: { username: string; password: string }) => {
  const { data } = await adminApi.post<ApiResponse<{ token: string }>>('/admin/login', body);
  return data.data;
};
