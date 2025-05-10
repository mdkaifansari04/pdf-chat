import ChatInterface from '@/components/data-display/chat-interface';
import SessionProvider from '../provider/session-provider';

export default function Home() {
  return (
    <SessionProvider>
      <div className="flex flex-col w-full h-[calc(100vh-4rem)] bg-gradient-to-br from-white via-gray-100 to-gray-200 dark:bg-gradient-to-br  dark:from-black dark:via-zinc-800/40 dark:to-black">
        <div className="flex flex-1 overflow-hidden">
          <ChatInterface />
        </div>
      </div>
    </SessionProvider>
  );
}
