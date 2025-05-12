import React from 'react';

function HowItWorksSection() {
  return (
    <section id="how-it-works" className="container py-8 md:py-12 lg:py-24">
      <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
        <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl">How It Works</h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">Get started in just three simple steps</p>
      </div>

      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-3">
        <div className="relative flex flex-col items-center text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white text-2xl font-bold">1</div>
          <h3 className="mt-6 text-xl font-bold">Upload PDF</h3>
          <p className="mt-2 text-muted-foreground">Drag and drop or select your PDF document to upload.</p>
        </div>
        <div className="relative flex flex-col items-center text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white text-2xl font-bold">2</div>
          <h3 className="mt-6 text-xl font-bold">Ask Questions</h3>
          <p className="mt-2 text-muted-foreground">Type any question about your document in natural language.</p>
        </div>
        <div className="relative flex flex-col items-center text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white text-2xl font-bold">3</div>
          <h3 className="mt-6 text-xl font-bold">Get Answers</h3>
          <p className="mt-2 text-muted-foreground">Receive accurate AI-generated answers with citations instantly.</p>
        </div>
      </div>
    </section>
  );
}

export default HowItWorksSection;
