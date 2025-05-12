import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import DocumentViewer from './docs-viewer';

export function PDFPreviewDialog({ pdfUrl, pdfName }: { pdfUrl: string; pdfName: string }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="w-8 h-8 cursor-pointer" size={'icon'} variant="outline">
          <Eye className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="min-w-[90vw] min-h-[90vh]">
        <DocumentViewer docName={pdfName} docUrl={[{ uri: pdfUrl }]} />
        <AlertDialogFooter>
          <AlertDialogCancel>Close</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
