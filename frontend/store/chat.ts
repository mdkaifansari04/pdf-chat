import { Resource } from '@/hooks/data-access/responseType';
import { create } from 'zustand';

export interface Message {
  sender: 'user' | 'model';
  message: string;
}

interface StoreSchema {
  chat: Message[];
  setChat: (message: Message) => void;
  loading: boolean;
  setLoading: (value: boolean) => void;
  resetChat: () => void;
  streamText: string;
  setStreamText: (value: string) => void;
  resetStream: () => void;
  currentPdf: Resource | null;
  setCurrentPdf: (pdf: Resource) => void;
}

const useChatStore = create<StoreSchema>()((set, get) => ({
  chat: [],
  streamText: '',
  loading: false,
  currentPdf: null,
  setChat: (message) => {
    set({ chat: [...get().chat, message] });
  },
  setCurrentPdf: (pdf) => {
    set({ currentPdf: pdf });
  },
  resetChat: () => set({ chat: [] }),
  setLoading: (value) => set({ loading: value }),
  setStreamText: (text) => set({ streamText: get().streamText + text }),
  resetStream: () => set({ streamText: '' }),
}));

export default useChatStore;
