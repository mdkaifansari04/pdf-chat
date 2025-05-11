'use client';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { UploadButton } from '@/lib/uploadthing';
import { FileTextIcon } from 'lucide-react';
import { useState } from 'react';

interface DocumentUploadButtonProps {
  setResourceUrl: (value: string) => void;
  setResourceName?: (value: string) => void;
  endPoint: 'documentUploader' | 'mediaUploader' | 'imageUploader';
}

function PrimaryUploadButton({ setResourceUrl, endPoint, setResourceName }: DocumentUploadButtonProps) {
  const [loaderProgress, setLoaderProgress] = useState<number | undefined>(undefined);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const showProgressbar = loaderProgress !== undefined;
  const { toast } = useToast();
  return (
    <div className="relative w-full">
      <FileTextIcon className=" absolute top-5 left-[45%] z-20 w-10 h-10 mx-auto text-gray-400" />
      <UploadButton
        onUploadProgress={(progress) => {
          setLoaderProgress(progress);
        }}
        endpoint={endPoint as 'documentUploader'}
        className="p-6 text-center transition-colors border-2 border-gray-300 border-dashed rounded-lg cursor-pointer dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50"
        onClientUploadComplete={(response) => {
          setResourceUrl(response[0].ufsUrl);
          setUploadedFile(response[0].name);
          setResourceName && setResourceName(response[0].name);
          setLoaderProgress(undefined);
        }}
        onUploadError={(error) => {
          toast({
            variant: 'destructive',
            title: 'Uh oh! Something went wrong.',
            description: 'There was a problem while uploading, Try again.',
          });
          console.log('Error', error);
        }}
        appearance={{
          button({ ready, isUploading }) {
            return {
              fontSize: '0.9rem',
              color: 'black',
              ...(ready && { color: '#67737D' }),
              ...(isUploading && { color: '#d1d5db' }),
            };
          },
          container: {
            paddingTop: '3rem',
            paddingBottom: '3rem',
          },
          allowedContent: {
            color: '#a1a1aa',
          },
        }}
        content={{
          button({ ready }) {
            if (ready)
              return (
                <span className="relative text-xs py-11 top-3">
                  Drag & Drop or&nbsp;
                  <span className="underline text-primary">Choose Files</span>
                </span>
              );
            return <span className="relative z-30 text-xs dark:text-slate-400 text-primary-foreground top-3 py-7">Getting ready ...</span>;
          },
        }}
      />
      {showProgressbar && <Progress className="absolute bg-primary bottom-4 w-[60%] h-1 z-20 left-[20%]" value={loaderProgress} />}
      {uploadedFile && <span className="absolute text-xs text-center uppercase bottom-7 w-[60%] h-1 z-20 left-[20%]">{uploadedFile}</span>}
    </div>
  );
}

export default PrimaryUploadButton;
