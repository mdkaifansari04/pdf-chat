import { useQuery } from '@tanstack/react-query';
import * as Resource from '@/hooks/data-access/resource';
import * as Analytics from '@/hooks/data-access/analytics';

export function useGetResources(userId: string) {
  return useQuery({
    queryKey: ['resources', userId],
    queryFn: () => Resource.getResources(userId),
    enabled: !!userId,
  });
}

export function useGetAnalytics(startDate: string, endDate: string) {
  return useQuery({
    queryKey: ['analytics'],
    queryFn: () => Analytics.getAnalytics(startDate, endDate),
    enabled: !!startDate && !!endDate,
  });
}

export function useGetAllUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => Analytics.getAllUsers(),
  });
}

export function useGetAllResources() {
  return useQuery({
    queryKey: ['resources'],
    queryFn: () => Resource.getAllResources(),
  });
}

export function useGetAllQueries() {
  return useQuery({
    queryKey: ['queries'],
    queryFn: () => Analytics.getAllQueries(),
  });
}
