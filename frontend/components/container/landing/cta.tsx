import { Button } from '@/components/ui/button';
import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

function CTA() {
  return (
    <section className="container py-8 md:py-12 lg:py-24 px-4 md:px-0">
      <div className="mx-auto max-w-5xl rounded-2xl bg-primary p-6 px-4 py-16 text-center sm:p-8 md:p-12 lg:p-16">
        <h2 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl">Start Chatting With Your PDFs Today</h2>
        <p className="mx-auto mt-4 max-w-[600px] text-gray-300 md:text-xl">Join thousands of professionals who are saving time and gaining insights with our AI-powered PDF chat platform.</p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button size="lg" className="bg-white text-slate-950 hover:bg-gray-200" asChild>
            <Link href="/chat">
              Get Started For Free <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

export default CTA;
