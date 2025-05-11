'use client';

import { useState } from 'react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const formSchema = z.object({
  documentName: z.string().min(2, {
    message: 'Document name must be at least 2 characters.',
  }),
  file: z.any().refine((file) => file?.size, {
    message: 'Please select a PDF file.',
  }),
});

export function ResourceUploadForm({ onSuccess }: { onSuccess: () => void }) {
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      documentName: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsUploading(true);

    // Simulate API call
    setTimeout(() => {
      console.log(values);
      setIsUploading(false);
      onSuccess();
    }, 1500);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="documentName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Document Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter document name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="file"
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <FormItem>
              <FormLabel>Upload PDF</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept=".pdf"
                  {...fieldProps}
                  onChange={(e) => {
                    onChange(e.target.files?.[0] || null);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <DialogFooter>
          <Button type="submit" disabled={isUploading}>
            {isUploading ? 'Uploading...' : 'Upload PDF'}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
