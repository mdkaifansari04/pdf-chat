import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { FadeImg } from '@/components/ui/fade-img';

function Hero() {
  return (
    <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
      <div className="container flex flex-col items-center gap-4 text-center">
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-normal">
          Chat With Your <span className="bg-primary text-white px-2 py-1 rounded-xl -rotate-[3deg] scale-105 inline-block tracking-tight">PDFs</span> Instantly
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground md:text-xl">Upload your documents and get instant AI-powered answers to any question about their content.</p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button size="lg" asChild>
            <Link href="/chat">
              Try It Now <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="#demo">See Demo</Link>
          </Button>
        </div>
      </div>
      <div className="container relative">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-xl border bg-background shadow-xl">
          <div className="relative">
            <FadeImg src="/images/hero-light.png" alt="PDF Chat Interface" className="w-full object-cover block dark:hidden" />
            <FadeImg src="/images/hero-dark.png" alt="PDF Chat Interface" className="w-full object-cover hidden dark:block" />
            <div className="absolute inset-2.5 bg-gradient-to-t from-background to-background/10 pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
