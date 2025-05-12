import { FadeImg } from '@/components/ui/fade-img';
import React from 'react';

function ScreenshotSection() {
  return (
    <section id="demo" className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24">
      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
        <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl">See It In Action</h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">Take a look at our intuitive interface and powerful features</p>
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2">
        <div className="overflow-hidden rounded-xl border bg-background shadow-xl">
          <div className="p-2 bg-slate-100 dark:bg-slate-800 border-b">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-red-500"></div>
              <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
              <div className="h-3 w-3 rounded-full bg-green-500"></div>
              <div className="ml-2 text-xs text-muted-foreground">Chat Interface</div>
            </div>
          </div>
          <FadeImg src="/images/chat-light.png" alt="Chat Interface" className="w-full object-cover block dark:hidden" />
          <FadeImg src="/images/chat-dark.png" alt="Chat Interface" className="w-full object-cover hidden dark:block" />
          <div className="p-4 text-center">
            <p className="text-sm font-medium">Ask questions and get instant answers about your documents</p>
          </div>
        </div>
        <div className="overflow-hidden rounded-xl border bg-background shadow-xl">
          <div className="p-2 bg-slate-100 dark:bg-slate-800 border-b">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-red-500"></div>
              <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
              <div className="h-3 w-3 rounded-full bg-green-500"></div>
              <div className="ml-2 text-xs text-muted-foreground">Analytics Dashboard</div>
            </div>
          </div>
          <FadeImg src="/images/admin-light.png" alt="Analytics Dashboard" className="w-full object-cover block dark:hidden" />
          <FadeImg src="/images/admin-dark.png" alt="Analytics Dashboard" className="w-full object-cover hidden dark:block" />
          <div className="p-4 text-center">
            <p className="text-sm font-medium">Track usage and gain insights with detailed analytics</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ScreenshotSection;
