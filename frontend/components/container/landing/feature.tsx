import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, MessageSquare, Zap, FileText, CheckCircle } from 'lucide-react';

function Feature() {
  return (
    <section id="features" className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24">
      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
        <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl">Powerful Features</h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">Our platform offers everything you need to interact with your PDF documents intelligently.</p>
      </div>
      <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
        <Card className="border-none shadow-md">
          <CardHeader>
            <Upload className="h-10 w-10 text-primary" />
            <CardTitle className="mt-4">PDF Upload & Processing</CardTitle>
            <CardDescription>Upload any PDF document and our AI will process it instantly.</CardDescription>
          </CardHeader>
        </Card>
        <Card className="border-none shadow-md">
          <CardHeader>
            <MessageSquare className="h-10 w-10 text-primary" />
            <CardTitle className="mt-4">Natural Language Queries</CardTitle>
            <CardDescription>Ask questions in plain English and get accurate answers.</CardDescription>
          </CardHeader>
        </Card>
        <Card className="border-none shadow-md">
          <CardHeader>
            <Zap className="h-10 w-10 text-primary" />
            <CardTitle className="mt-4">AI-Powered Responses</CardTitle>
            <CardDescription>Get intelligent answers powered by advanced language models.</CardDescription>
          </CardHeader>
        </Card>
        <Card className="border-none shadow-md">
          <CardHeader>
            <FileText className="h-10 w-10 text-primary" />
            <CardTitle className="mt-4">Document History</CardTitle>
            <CardDescription>Access your previously uploaded documents and conversations.</CardDescription>
          </CardHeader>
        </Card>
        <Card className="border-none shadow-md">
          <CardHeader>
            <CheckCircle className="h-10 w-10 text-primary" />
            <CardTitle className="mt-4">Accurate Citations</CardTitle>
            <CardDescription>All answers include references to the source material.</CardDescription>
          </CardHeader>
        </Card>
        <Card className="border-none shadow-md">
          <CardHeader>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 text-primary">
              <rect width="20" height="14" x="2" y="5" rx="2" />
              <line x1="2" x2="22" y1="10" y2="10" />
            </svg>
            <CardTitle className="mt-4">Analytics Dashboard</CardTitle>
            <CardDescription>Track usage and gain insights with detailed analytics.</CardDescription>
          </CardHeader>
        </Card>
      </div>
    </section>
  );
}

export default Feature;
