'use client';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Check, Copy } from 'lucide-react';
import { useState } from 'react';

export function CopyToClipboard({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    });
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="flex items-center justify-center w-6 rounded-md cursor-pointer text-slate-500 group hover:bg-muted" onClick={handleCopy}>
            {copied ? <Check className="w-3" /> : <Copy className="w-3" />}
          </span>
        </TooltipTrigger>
        <TooltipContent sideOffset={1}>
          <p>{copied ? 'Copied' : 'Copy'}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
