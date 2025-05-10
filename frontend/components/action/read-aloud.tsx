'use client';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { CirclePause, Volume2 } from 'lucide-react';
import { useState } from 'react';

export function ReadAloud({ text }: { text: string }) {
  const [isReading, setIsReading] = useState(false);
  let utterance: SpeechSynthesisUtterance;

  const handleReadAloud = () => {
    if (isReading) {
      speechSynthesis.cancel();
      setIsReading(false);
      return;
    }
    utterance = new SpeechSynthesisUtterance(text);
    setIsReading(true);
    utterance.onend = () => {
      setIsReading(false);
    };
    speechSynthesis.speak(utterance);
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="flex items-center justify-center w-6 rounded-md cursor-pointer text-slate-500 group hover:bg-muted" onClick={handleReadAloud}>
            {isReading ? <CirclePause className="w-3" /> : <Volume2 className="w-3" />}
          </span>
        </TooltipTrigger>
        <TooltipContent sideOffset={1}>
          <p>{isReading ? 'Stop' : 'Read Aloud'}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
