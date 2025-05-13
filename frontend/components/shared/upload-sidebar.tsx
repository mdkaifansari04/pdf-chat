'use client';

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useUploadDocument } from '@/hooks/mutation';
import { useGetResources } from '@/hooks/query';
import { useToast } from '@/hooks/use-toast';
import { cn, getErrorMessage } from '@/lib/utils';
import useChatStore from '@/store/chat';
import { useAuth } from '@clerk/nextjs';
import { FileText, Loader2 } from 'lucide-react';
import { useState } from 'react';
import PrimaryUploadButton from '../action/primary-upload-button';
import { PDFPreviewDialog } from '../data-display/pdf-preview-dialog';
import { CardDescription, CardTitle } from '../ui/card';
import { FadeImg } from '../ui/fade-img';
import { Input } from '../ui/input';
import ResourceLoadingView from './loading-view';
import QueryWrapper from './wrapper';

function UploadSidebar({ className }: { className?: string }) {
  const [activeTab, setActiveTab] = useState('uploaded');
  const { userId } = useAuth();
  const { data: pdfs, isPending, isError, error } = useGetResources(userId || '');
  const { mutate: uploadDocument, isPending: isUploading } = useUploadDocument();

  const { toast } = useToast();
  const [pdfName, setPdfName] = useState('');
  const [pdfUrl, setPdfUrl] = useState('');
  const { setCurrentPdf, currentPdf } = useChatStore();
  const handleUpload = () => {
    uploadDocument(
      {
        documentName: pdfName,
        documentUrl: pdfUrl,
        userId: userId!,
      },
      {
        onSuccess: () => {
          toast({
            title: 'PDF uploaded successfully',
            description: `${pdfName} has been uploaded`,
          });
          setPdfName('');
          setPdfUrl('');
        },
        onError: (error) => {
          toast({
            title: 'Error uploading PDF',
            description: getErrorMessage(error),
          });
        },
      },
    );
  };

  return (
    <div className={cn('w-full mt-8 md:mt-0 hidden md:block border-b md:w-1/4 md:border-b-0 md:border-r', className)}>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full rounded-none">
        <TabsList className="grid w-full grid-cols-2 rounded-none">
          <TabsTrigger value="uploaded">Uploaded PDFs</TabsTrigger>
          <TabsTrigger value="upload">Upload</TabsTrigger>
        </TabsList>

        <TabsContent value="uploaded" className="h-[calc(90vh-45px)] md:h-[calc(90vh-45px)]">
          <ScrollArea className="h-full">
            <QueryWrapper
              data={pdfs}
              isPending={isPending}
              isError={isError}
              error={error}
              pendingView={<ResourceLoadingView />}
              view={
                <div className="flex flex-col gap-2">
                  {pdfs && pdfs.length === 0 ? (
                    <div className="flex h-full items-center justify-center p-4 text-center text-gray-500">
                      <div>
                        <FadeImg className="w-full" src="/images/empty-pdf.svg" alt="No PDFs uploaded yet" />
                        <p className="mt-2">No PDFs uploaded yet</p>
                        <Button variant="link" onClick={() => setActiveTab('upload')} className="mt-1">
                          Upload a PDF
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <ul className="space-y-1 p-2">
                      {pdfs?.map((pdf) => (
                        <li key={pdf._id} onClick={() => setCurrentPdf(pdf)} className={cn('flex items-center justify-between rounded-md px-3 py-2 cursor-pointer', currentPdf?._id === pdf._id && 'bg-primary/40 font-medium')}>
                          <div className="flex items-center justify-between w-full">
                            <div className="flex items-center space-x-2 truncate">
                              <FileText className="h-4 w-4 shrink-0 text-gray-500" />
                              <span className="truncate text-sm font-medium">{pdf.documentName}</span>
                            </div>
                            <PDFPreviewDialog pdfName={pdf.documentName} pdfUrl={pdf.documentUrl} />
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              }
            />
          </ScrollArea>
        </TabsContent>

        <TabsContent value="upload" className="h-[calc(90vh-45px)] md:h-[calc(90vh-45px)]">
          <div className="flex h-full flex-col gap-2.5 p-4">
            <CardTitle>Upload New PDF</CardTitle>
            <CardDescription>Add a new PDF document to chat with</CardDescription>
            <Input onChange={(e) => setPdfName(e.target.value)} type="text" placeholder="Enter document name" />
            <PrimaryUploadButton endPoint="documentUploader" setResourceUrl={setPdfUrl} />
            <Button disabled={isUploading || pdfName.length == 0 || pdfUrl.length === 0} onClick={handleUpload} size={'sm'} variant="outline" className="w-full cursor-pointer">
              Upload {isUploading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default UploadSidebar;
