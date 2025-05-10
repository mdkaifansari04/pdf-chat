'use client';

import type React from 'react';

import { useState, useEffect } from 'react';
import { FileText, Send, Upload, X, Maximize, Minimize } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { PDFViewer } from '@/components/data-display/pdf-viewer';
import DocumentViewer from '@/components/data-display/docs-viewer';

// Mock data for initial PDF list
const initialPdfs = [
  { id: '1', name: 'Research Paper.pdf', url: 'https://zmugxnie50.ufs.sh/f/JeZeyt9S4cMwZ3NuHQxnd6TPXCaHKoJYmfSbvu4UQ01ekL8s' },
  { id: '2', name: 'Annual Report 2023.pdf', url: '/sample.pdf' },
  { id: '3', name: 'Product Documentation.pdf', url: '/sample.pdf' },
];

type PDF = {
  id: string;
  name: string;
  url?: string;
};

function UploadSidebar() {
  const [activeTab, setActiveTab] = useState('uploaded');
  const [pdfs, setPdfs] = useState<PDF[]>(initialPdfs);
  const [selectedPdf, setSelectedPdf] = useState<PDF | null>(initialPdfs[0]);
  const [isUploading, setIsUploading] = useState(false);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'application/pdf': ['.pdf'],
    },
    onDrop: (acceptedFiles) => {
      //   handleFileUpload(acceptedFiles);
    },
  });

  return (
    <div className="w-full border-b md:w-1/4 md:border-b-0 md:border-r">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full rounded-none">
        <TabsList className="grid w-full grid-cols-2 rounded-none">
          <TabsTrigger value="uploaded">Uploaded PDFs</TabsTrigger>
          <TabsTrigger value="upload">Upload</TabsTrigger>
        </TabsList>

        <TabsContent value="uploaded" className="h-[calc(90vh-45px)] md:h-[calc(90vh-45px)]">
          <ScrollArea className="h-full">
            {pdfs.length === 0 ? (
              <div className="flex h-full items-center justify-center p-4 text-center text-gray-500">
                <div>
                  <FileText className="mx-auto h-12 w-12 opacity-20" />
                  <p className="mt-2">No PDFs uploaded yet</p>
                  <Button variant="link" onClick={() => setActiveTab('upload')} className="mt-1">
                    Upload a PDF
                  </Button>
                </div>
              </div>
            ) : (
              <ul className="space-y-1 p-2">
                {pdfs.map((pdf) => (
                  <li key={pdf.id} onClick={() => setSelectedPdf(pdf)} className={cn('flex items-center justify-between rounded-md px-3 py-2 cursor-pointer', selectedPdf?.id === pdf.id && 'bg-primary/40 font-medium')}>
                    <div className="flex items-center space-x-2 truncate">
                      <FileText className="h-4 w-4 shrink-0 text-gray-500" />
                      <span className="truncate text-xs font-medium">{pdf.name}</span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </ScrollArea>
        </TabsContent>

        <TabsContent value="upload" className="h-[calc(90vh-45px)] md:h-[calc(90vh-45px)]">
          <div className="flex h-full flex-col items-center justify-center p-4">
            <div {...getRootProps()} className={cn('flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-6 transition-colors', isDragActive && 'border-blue-500 bg-blue-50')}>
              <input {...getInputProps()} />
              <Upload className={cn('mb-4 h-12 w-12', isDragActive ? 'text-blue-500' : 'text-gray-400')} />

              {isUploading ? (
                <div className="text-center">
                  <div className="mb-2 text-sm font-medium">Uploading...</div>
                  <div className="h-1.5 w-48 overflow-hidden rounded-full bg-gray-200">
                    <div className="h-full w-1/2 animate-pulse rounded-full bg-blue-500"></div>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <p className="mb-1 text-sm font-medium">{isDragActive ? 'Drop your PDF here' : 'Drag & drop your PDF here'}</p>
                  <p className="text-xs text-gray-500">or click to browse files</p>
                  <p className="mt-2 text-xs text-gray-400">Only PDF files are accepted</p>
                </div>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default UploadSidebar;
