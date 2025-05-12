import axios from 'axios';
import { Analytics, ApiResponse, Query, User } from './responseType';

const analyticsApi = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_HOST_URL}`,
});

export const getAnalytics = async (startDate: string, endDate: string) => {
  const { data } = await analyticsApi.get<ApiResponse<Analytics>>(`/analytics/${startDate}/${endDate}`);
  return data.data;
};

export const getAllUsers = async () => {
  const { data } = await analyticsApi.get<ApiResponse<User[]>>(`/users`);
  return data.data;
};

export const getAllQueries = async () => {
  const { data } = await analyticsApi.get<ApiResponse<Query[]>>(`/queries`);
  return data.data;
};
