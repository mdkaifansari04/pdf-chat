'use client';
import { accessSessionStorage } from '@/lib/session-storage';
import { useUser } from '@clerk/nextjs';
import React, { useEffect } from 'react';
import axios from 'axios';

import { useToast } from '@/hooks/use-toast';
import { getErrorMessage } from '@/lib/utils';
import { ApiResponse, Query } from '@/hooks/data-access/responseType';

function SessionProvider({ children }: React.PropsWithChildren) {
  const { isSignedIn, user } = useUser();
  const { toast } = useToast();
  const axiosInstance = axios.create({ baseURL: process.env.NEXT_PUBLIC_HOST_URL });

  const sessionStorage = accessSessionStorage;
  const startSession = async () => {
    if (sessionStorage.get() || !user?.id) return;
    try {
      const { data } = await axiosInstance.post<ApiResponse<Query>>('/pdf/session', { userId: user?.id });
      sessionStorage.set(data.data.sessionId);
    } catch (error) {
      console.error(error);
      toast({
        title: getErrorMessage(error as Error),
        variant: 'destructive',
      });
    }
  };

  useEffect(() => {
    startSession();
  }, [isSignedIn, user]);
  return <div>{children}</div>;
}

export default SessionProvider;
