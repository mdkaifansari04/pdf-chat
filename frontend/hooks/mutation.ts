import { useMutation } from '@tanstack/react-query';
import * as PDF from '@/hooks/data-access/pdf';
import * as Admin from '@/hooks/data-access/admin';

export function useChatWithDocument() {
  return useMutation({
    mutationKey: ['chat-with-document'],
    mutationFn: PDF.chatWithDocument,
  });
}

export function useUploadDocument() {
  return useMutation({
    mutationKey: ['upload-document'],
    mutationFn: PDF.uploadDocument,
  });
}

export function useAdminLogin() {
  return useMutation({
    mutationKey: ['admin-login'],
    mutationFn: Admin.login,
  });
}
