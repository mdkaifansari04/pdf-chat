import { useMutation } from '@tanstack/react-query';
import * as pdf from '@/hooks/data-access/pdf';

export function useChatWithDocument() {
  return useMutation({
    mutationKey: ['chat-with-document'],
    mutationFn: pdf.chatWithDocument,
  });
}

export function useUploadDocument() {
  return useMutation({
    mutationKey: ['upload-document'],
    mutationFn: pdf.uploadDocument,
  });
}
