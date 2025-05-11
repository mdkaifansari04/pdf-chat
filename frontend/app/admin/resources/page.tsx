'use client';

import { useState } from 'react';
import { Download, ExternalLink, MoreHorizontal, Search, Upload } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ResourceUploadForm } from '@/components/container/resource-upload-form';

// Sample resource data based on the provided JSON
const resources = [
  {
    _id: '68206205ad901f8a59d7f4bf',
    documentName: 'demoa-s',
    documentUrl: 'https://zmugxnie50.ufs.sh/f/JeZeyt9S4cMwccIdMo0XnpSdTGClztD3NhguFjY59ab6wvmi',
    userId: 'user_2wtUj5wu61LFSaZOyluZmMcRxp2',
    namespace: 'user_2wtUj5wu61LFSaZOyluZmMcRxp2-demoa-s',
    createdAt: '2025-05-11T08:38:29.435Z',
    updatedAt: '2025-05-11T08:38:29.435Z',
    __v: 0,
  },
  {
    _id: '682062511cb29678fadea406',
    documentName: 'asignment',
    documentUrl: 'https://zmugxnie50.ufs.sh/f/JeZeyt9S4cMwZ3NuHQxnd6TPXCaHKoJYmfSbvu4UQ01ekL8s',
    userId: 'user_2wtUj5wu61LFSaZOyluZmMcRxp2',
    namespace: 'user_2wtUj5wu61LFSaZOyluZmMcRxp2-asignment',
    createdAt: '2025-05-11T08:39:45.513Z',
    updatedAt: '2025-05-11T08:39:45.513Z',
    __v: 0,
  },
];

export default function ResourcesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);

  // Filter resources based on search term
  const filteredResources = resources.filter((resource) => {
    return resource.documentName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Format date to be more readable
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">PDF Resources</h2>
        <div className="flex items-center space-x-2">
          <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Upload className="mr-2 h-4 w-4" />
                Upload PDF
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Upload New PDF</DialogTitle>
                <DialogDescription>Add a new PDF document to chat with</DialogDescription>
              </DialogHeader>
              <ResourceUploadForm onSuccess={() => setIsUploadDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total PDFs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{resources.length}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>PDF Documents</CardTitle>
          <CardDescription>Browse and manage all uploaded PDF documents</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search documents..." className="pl-8" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredResources.length === 0 ? (
              <div className="col-span-full text-center py-10">
                <p className="text-muted-foreground">No documents found.</p>
              </div>
            ) : (
              filteredResources.map((resource) => <ResourceCard key={resource._id} resource={resource} formatDate={formatDate} />)
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ResourceCard({ resource, formatDate }: { resource: (typeof resources)[0]; formatDate: (date: string) => string }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">{resource.documentName}</CardTitle>
        <CardDescription className="truncate text-xs">Namespace: {resource.namespace}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex items-center text-sm text-muted-foreground">
          <span>Uploaded on {formatDate(resource.createdAt)}</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm" asChild>
          <a href={resource.documentUrl} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="mr-2 h-4 w-4" />
            View PDF
          </a>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">More options</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>
              <a href={resource.documentUrl} target="_blank" rel="noopener noreferrer" className="flex w-full">
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </a>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">Delete document</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardFooter>
    </Card>
  );
}
