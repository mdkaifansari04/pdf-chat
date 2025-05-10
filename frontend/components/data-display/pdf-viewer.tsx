'use client';

import { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

// Set up the worker for PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

interface PDFViewerProps {
  pdfUrl: string;
}

export function PDFViewer({ pdfUrl }: PDFViewerProps) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);
  const [rotation, setRotation] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  // Reset state when PDF URL changes
  useEffect(() => {
    setPageNumber(1);
    setScale(1.0);
    setRotation(0);
    setIsLoading(true);
    setError(null);
  }, [pdfUrl]);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setIsLoading(false);
  }

  function onDocumentLoadError(error: Error) {
    console.error('Error loading PDF:', error);
    setError(error);
    setIsLoading(false);
  }

  function previousPage() {
    setPageNumber((prevPageNumber) => Math.max(prevPageNumber - 1, 1));
  }

  function nextPage() {
    setPageNumber((prevPageNumber) => Math.min(prevPageNumber + 1, numPages || 1));
  }

  function zoomIn() {
    setScale((prevScale) => Math.min(prevScale + 0.2, 3.0));
  }

  function zoomOut() {
    setScale((prevScale) => Math.max(prevScale - 0.2, 0.5));
  }

  function rotate() {
    setRotation((prevRotation) => (prevRotation + 90) % 360);
  }

  return (
    <div className="flex h-full flex-col">
      {/* PDF Controls */}
      <div className="flex items-center justify-between border-b p-2">
        <div className="flex items-center space-x-1">
          <Button variant="outline" size="icon" onClick={previousPage} disabled={pageNumber <= 1} className="h-8 w-8">
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous page</span>
          </Button>
          <span className="text-sm">
            {pageNumber} / {numPages || '?'}
          </span>
          <Button variant="outline" size="icon" onClick={nextPage} disabled={!numPages || pageNumber >= numPages} className="h-8 w-8">
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next page</span>
          </Button>
        </div>

        <div className="flex items-center space-x-1">
          <Button variant="outline" size="icon" onClick={zoomOut} className="h-8 w-8">
            <ZoomOut className="h-4 w-4" />
            <span className="sr-only">Zoom out</span>
          </Button>
          <span className="text-sm">{Math.round(scale * 100)}%</span>
          <Button variant="outline" size="icon" onClick={zoomIn} className="h-8 w-8">
            <ZoomIn className="h-4 w-4" />
            <span className="sr-only">Zoom in</span>
          </Button>
          <Button variant="outline" size="icon" onClick={rotate} className="h-8 w-8">
            <RotateCw className="h-4 w-4" />
            <span className="sr-only">Rotate</span>
          </Button>
        </div>
      </div>

      {/* PDF Document */}
      <ScrollArea className="flex-1">
        <div className="flex min-h-full flex-col items-center p-4">
          {isLoading && (
            <div className="flex h-full w-full items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-500"></div>
            </div>
          )}

          {error && (
            <div className="flex h-full w-full flex-col items-center justify-center text-center text-red-500">
              <p className="font-medium">Error loading PDF</p>
              <p className="text-sm">{error.message}</p>
            </div>
          )}

          <Document
            file={pdfUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            loading={
              <div className="flex h-full w-full items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-500"></div>
              </div>
            }
            className={cn('pdf-document', isLoading && 'hidden')}
          >
            <Page pageNumber={pageNumber} scale={scale} rotate={rotation} renderTextLayer={false} renderAnnotationLayer={false} className="pdf-page shadow-md" />
          </Document>
        </div>
      </ScrollArea>
    </div>
  );
}
