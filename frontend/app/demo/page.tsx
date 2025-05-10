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

// Mock data for initial messages
const initialMessages = [
  { id: '1', content: 'What is the main topic of this PDF?', sender: 'user' },
  {
    id: '2',
    content: 'This PDF discusses the impact of artificial intelligence on modern healthcare systems, focusing on diagnostic tools and patient care improvements.',
    sender: 'ai',
  },
  {
    id: '3',
    content: 'Can you summarize the key findings?',
    sender: 'user',
  },
  {
    id: '4',
    content:
      'The key findings include: 1) AI-powered diagnostic tools showed a 37% improvement in early detection rates, 2) Patient satisfaction increased by 28% when AI assistants were used for routine follow-ups, 3) Healthcare costs were reduced by 15-20% in facilities that implemented AI systems for administrative tasks.',
    sender: 'ai',
  },
];

type PDF = {
  id: string;
  name: string;
  file?: File;
  url?: string;
};

type Message = {
  id: string;
  content: string;
  sender: 'user' | 'ai';
};

export function page() {
  const [activeTab, setActiveTab] = useState('uploaded');
  const [pdfs, setPdfs] = useState<PDF[]>(initialPdfs);
  const [selectedPdf, setSelectedPdf] = useState<PDF | null>(initialPdfs[0]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [viewMode, setViewMode] = useState<'chat' | 'pdf' | 'split'>('split');
  const [isFullscreen, setIsFullscreen] = useState(false);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'application/pdf': ['.pdf'],
    },
    onDrop: (acceptedFiles) => {
      handleFileUpload(acceptedFiles);
    },
  });

  const handleFileUpload = async (files: File[]) => {
    if (files.length === 0) return;

    setIsUploading(true);

    // Simulate upload delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const newPdfs = files.map((file) => ({
      id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
      name: file.name,
      file,
      url: URL.createObjectURL(file),
    }));

    setPdfs((prev) => [...prev, ...newPdfs]);
    setSelectedPdf(newPdfs[0]);
    setActiveTab('uploaded');
    setIsUploading(false);
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedPdf) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: 'user',
    };

    setMessages((prev) => [...prev, userMessage]);
    setNewMessage('');

    // Simulate AI response after a short delay
    setTimeout(() => {
      const aiMessage: Message = {
        id: Date.now().toString() + '-ai',
        content: `I've analyzed the document "${selectedPdf.name}". ${
          Math.random() > 0.5 ? 'The information you requested can be found on pages 12-15, which discusses the methodology and results.' : 'Based on the content, the main conclusion suggests that further research is needed in this area to establish more definitive results.'
        }`,
        sender: 'ai',
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const removePdf = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();

    // Clean up object URL if it exists
    const pdfToRemove = pdfs.find((pdf) => pdf.id === id);
    if (pdfToRemove?.url && pdfToRemove.file) {
      URL.revokeObjectURL(pdfToRemove.url);
    }

    setPdfs((prev) => prev.filter((pdf) => pdf.id !== id));

    if (selectedPdf && selectedPdf.id === id) {
      setSelectedPdf(pdfs.length > 1 ? pdfs.filter((p) => p.id !== id)[0] : null);
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Clean up object URLs when component unmounts
  useEffect(() => {
    return () => {
      pdfs.forEach((pdf) => {
        if (pdf.url && pdf.file) {
          URL.revokeObjectURL(pdf.url);
        }
      });
    };
  }, []);

  return (
    <div className={cn('flex h-[90vh] w-full max-w-7xl flex-col overflow-hidden rounded-xl border bg-white shadow-lg md:flex-row', isFullscreen && 'fixed inset-0 z-50 h-screen max-w-none rounded-none')}>
      {/* Sidebar */}
      <div className="w-full border-b md:w-1/4 md:border-b-0 md:border-r">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
          <TabsList className="grid w-full grid-cols-2">
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
                    <li key={pdf.id} onClick={() => setSelectedPdf(pdf)} className={cn('flex items-center justify-between rounded-md px-3 py-2 cursor-pointer hover:bg-gray-100', selectedPdf?.id === pdf.id && 'bg-gray-100 font-medium')}>
                      <div className="flex items-center space-x-2 truncate">
                        <FileText className="h-4 w-4 shrink-0 text-gray-500" />
                        <span className="truncate">{pdf.name}</span>
                      </div>
                      <Button variant="ghost" size="icon" className="h-6 w-6 shrink-0 opacity-50 hover:opacity-100" onClick={(e) => removePdf(pdf.id, e)}>
                        <X className="h-4 w-4" />
                        <span className="sr-only">Remove</span>
                      </Button>
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

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-4 py-3">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-md bg-gray-100 p-1.5">
              <FileText className="h-full w-full text-gray-700" />
            </div>
            <h2 className="ml-2 font-semibold">AI Planet</h2>
          </div>
          <div className="flex items-center gap-2">
            {selectedPdf && <div className="truncate text-sm font-medium text-gray-600">{selectedPdf.name}</div>}
            <Button variant="ghost" size="icon" onClick={toggleFullscreen}>
              {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* View Mode Tabs */}
        <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as 'split' | 'pdf' | 'chat')} className="w-full">
          <TabsList className="w-full justify-start rounded-none border-0 bg-transparent p-0">
            <TabsTrigger value="split" className="rounded-none border-0 px-4 py-2 data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none">
              Split View
            </TabsTrigger>
            <TabsTrigger value="pdf" className="rounded-none border-0 px-4 py-2 data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none">
              PDF View
            </TabsTrigger>
            <TabsTrigger value="chat" className="rounded-none border-0 px-4 py-2 data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none">
              Chat View
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Content Area */}
        <div className="flex flex-1 overflow-hidden">
          {/* PDF Viewer - Hidden in chat-only mode */}
          {(viewMode === 'pdf' || viewMode === 'split') && (
            <div className={cn('flex flex-col', viewMode === 'pdf' ? 'w-full' : 'w-1/2 border-r')}>
              {selectedPdf ? (
                <DocumentViewer docName={selectedPdf.name} docUrl={[{ uri: selectedPdf.url || '' }]} />
              ) : (
                <div className="flex h-full items-center justify-center text-center text-gray-500">
                  <div>
                    <FileText className="mx-auto h-12 w-12 opacity-20" />
                    <p className="mt-2">Select a PDF to view</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Chat Area - Hidden in PDF-only mode */}
          {(viewMode === 'chat' || viewMode === 'split') && (
            <div className={cn('flex flex-1 flex-col', viewMode === 'chat' ? 'w-full' : 'w-1/2')}>
              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                {!selectedPdf ? (
                  <div className="flex h-full items-center justify-center text-center text-gray-500">
                    <div>
                      <FileText className="mx-auto h-12 w-12 opacity-20" />
                      <p className="mt-2">Select a PDF to start chatting</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div key={message.id} className={cn('flex', message.sender === 'user' ? 'justify-end' : 'justify-start')}>
                        <div className={cn('max-w-[80%] rounded-lg px-4 py-2', message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800')}>{message.content}</div>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>

              {/* Input */}
              <div className="border-t p-4">
                <div className="flex space-x-2">
                  <Textarea value={newMessage} onChange={(e) => setNewMessage(e.target.value)} onKeyDown={handleKeyDown} placeholder={selectedPdf ? 'Ask a question about the PDF...' : 'Select a PDF to start chatting'} className="min-h-[60px] flex-1 resize-none" disabled={!selectedPdf} />
                  <Button onClick={handleSendMessage} disabled={!newMessage.trim() || !selectedPdf} className="h-[60px] w-[60px] shrink-0">
                    <Send className="h-5 w-5" />
                    <span className="sr-only">Send</span>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default page;
