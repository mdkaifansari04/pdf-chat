'use client';

import type React from 'react';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { DialogFooter } from '@/components/ui/dialog';

export function QueryResponseForm({ queryId, onSuccess }: { queryId: string; onSuccess: () => void }) {
  const [response, setResponse] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!response.trim()) return;

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log('Submitting response:', { queryId, response });
      setIsSubmitting(false);
      onSuccess();
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 py-4">
        <Textarea placeholder="Type your response here..." className="min-h-[150px]" value={response} onChange={(e) => setResponse(e.target.value)} required />
      </div>

      <DialogFooter>
        <Button type="submit" disabled={isSubmitting || !response.trim()}>
          {isSubmitting ? 'Sending...' : 'Send Response'}
        </Button>
      </DialogFooter>
    </form>
  );
}
