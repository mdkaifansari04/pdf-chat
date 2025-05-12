'use client';
import { Loader } from '@/components/shared/loader';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useChatWithDocument } from '@/hooks/mutation';
import { useToast } from '@/hooks/use-toast';
import { accessSessionStorage } from '@/lib/session-storage';
import { cn, getErrorMessage, getUserShortName } from '@/lib/utils';
import useChatStore from '@/store/chat';
import { useUser } from '@clerk/nextjs';
import { motion } from 'framer-motion';
import { SendIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import Markdown from 'react-markdown';
import '../../app/globals.css';
import { CopyToClipboard } from '../action/copy-to-clipboard';
import { ReadAloud } from '../action/read-aloud';

export default function MainResponseSection() {
  const { chat, resetChat, streamText, resetStream, currentPdf } = useChatStore();
  const messageEndRef = useRef<HTMLDivElement | null>(null);
  const showEmptyActivity = chat.length === 0;
  const router = useRouter();
  useEffect(() => {
    resetChat();
  }, [router, resetChat, resetStream]);
  useEffect(() => {
    messageEndRef.current?.scrollIntoView();
  }, [streamText]);
  return (
    <main className="flex flex-col justify-center flex-1 max-w-6xl mx-auto ">
      <div className={cn('flex-1 p-4 sm:p-6 !overflow-y-auto hide-scrollbar')}>
        <div
          className={cn('', {
            'max-w-3xl mx-auto': showEmptyActivity,
            'max-w-full': !showEmptyActivity,
          })}
        >
          <div className="pb-10 mb-4 space-y-3 pt-14 hide-scrollbar">
            {chat.map((i, k) => (
              <ChatMessage key={k} type={i.sender} userName={i.sender === 'user' ? 'You' : 'PDF AI'} message={i.message} />
            ))}
            {streamText.length !== 0 ? <ChatMessage type="model" userName="AI Model" message={streamText!} /> : null}

            {showEmptyActivity && <EmptyActivity />}
            <div ref={messageEndRef} />
          </div>
        </div>
      </div>
      <PromptInputBox />
    </main>
  );
}

function EmptyActivity() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }} className={cn('relative z-30 text-center top-20 h-full', 'opacity-100 scale-100')}>
      <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-normal">
        Chat With any <span className="bg-primary text-white px-2 py-1 rounded-xl -rotate-[3deg] scale-105 inline-block tracking-tight">PDF</span>
      </h1>
      <p className="relative z-30 text-xl text-gray-600 dark:text-zinc-400">Ask me anything about the PDF</p>
    </motion.div>
  );
}

const PromptInputBox = () => {
  const { user } = useUser();
  const [prompt, setPrompt] = useState('');
  const { toast } = useToast();
  const ChatStore = useChatStore();
  const { mutate: chatWithDocument, isPending: isProcessing } = useChatWithDocument();

  const handleStream = async (response: Response) => {
    const reader = response.body?.getReader();
    const decoder = new TextDecoder();

    let result = '';

    if (reader) {
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          ChatStore.resetStream();
          ChatStore.setChat({ sender: 'model', message: result });
          break;
        }

        const chunk = decoder.decode(value, { stream: true });
        result += chunk;
        ChatStore.setStreamText(chunk);
      }
    } else {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request, Try again',
      });
    }
  };

  const handleSubmit = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (prompt.length === 0) return;
    if (!ChatStore.currentPdf) {
      toast({
        variant: 'destructive',
        title: 'No PDF selected',
        description: 'Please select a PDF to chat with',
      });
      return;
    }
    setPrompt('');
    ChatStore.setChat({ sender: 'user', message: prompt });
    chatWithDocument(
      {
        userPrompt: prompt,
        namespace: ChatStore.currentPdf.namespace,
        sessionId: accessSessionStorage.get()!,
        userId: user?.id!,
      },
      {
        onSuccess: (response) => {
          handleStream(response);
        },
        onError: (error) => {
          toast({
            variant: 'destructive',
            title: getErrorMessage(error),
          });
        },
      },
    );
  };
  return (
    <div className="sticky px-4 py-2 shadow-none bottom-7 md:bottom-8 sm:px-6">
      <div className="flex flex-col w-full max-w-3xl gap-4 mx-auto">
        <div className="relative bg-white border-2 dark:bg-zinc-900 rounded-xl">
          <Textarea
            placeholder="What would you like to do?"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
            className={cn(
              'w-full px-4 py-3',
              'resize-none',
              'bg-transparent',
              'border-none',
              'text-gray-800 dark:text-zinc-100 text-sm',
              'focus:outline-none',
              'focus-visible:ring-0 focus-visible:ring-offset-0',
              'placeholder:text-gray-500 dark:placeholder:text-zinc-500 placeholder:text-base',
              'min-h-[60px]',
            )}
          />
          <div className="flex items-center justify-end p-3">
            <Button
              className={cn('px-1.5 py-1.5 h-10 rounded-full text-sm transition-colors hover:bg-primary/75 dark:hover:bg-zinc-800 flex items-center justify-between gap-1', 'text-gray-800 dark:text-zinc-100', 'disabled:opacity-50 disabled:cursor-not-allowed bg-white dark:bg-zinc-900')}
              disabled={prompt.length === 0}
              onClick={(e) => handleSubmit(e)}
            >
              {isProcessing ? (
                <Loader className="w-3 h-3" />
              ) : (
                <Fragment>
                  <SendIcon className="w-4 h-4" />
                  <span className="sr-only">Send</span>
                </Fragment>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
function ChatMessage(props: { userName: string | undefined; message: string; type: 'model' | 'user' }) {
  return (
    <div className="flex items-start gap-4">
      <Avatar className={cn('w-8 h-8 border')}>
        <AvatarImage src={props.type === 'user' ? '/images/placeholder-user.jpg' : '/images/ai.svg'} />
        <AvatarFallback>{getUserShortName(props.userName)}</AvatarFallback>
      </Avatar>
      <div className="grid items-start gap-1 text-sm">
        <div className="flex items-center gap-2">
          <div className="font-medium">{props.userName}</div>
        </div>
        <div>{props.type === 'user' ? <p>{props.message}</p> : <Markdown>{props.message}</Markdown>}</div>
        <div className="flex gap-1">
          {props.type === 'model' && <CopyToClipboard text={props.message} />}
          {props.type === 'model' && <ReadAloud text={props.message} />}
        </div>
      </div>
    </div>
  );
}
