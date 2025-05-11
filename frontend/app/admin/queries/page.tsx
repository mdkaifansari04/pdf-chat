'use client';

import { useState } from 'react';
import { MessageSquare, MoreHorizontal, Search, UserCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

// Sample query data based on the provided JSON
const queries = [
  {
    _id: '681f62b1b65b4d07f1e5163c',
    userClerkId: 'user_2wtUj5wu61LFSaZOyluZmMcRxp2',
    sessionId: '1746887345329',
    messages: [
      {
        sender: 'user',
        text: 'hi',
        timestamps: '2025-05-10T14:30:22.083Z',
        _id: '681f62feb65b4d07f1e5163f',
      },
      {
        sender: 'model',
        text: 'Hello! How can I assist you today?',
        timestamps: '2025-05-10T14:30:22.083Z',
        _id: '681f62feb65b4d07f1e51640',
      },
      {
        sender: 'user',
        text: 'can you tell me who is elon musk ?',
        timestamps: '2025-05-10T14:30:50.898Z',
        _id: '681f631ab65b4d07f1e51645',
      },
      {
        sender: 'model',
        text: "Sure, I'd be happy to provide some information about Elon Musk.\n\n**Elon Musk** is a billionaire entrepreneur, inventor, and business magnate. He was born on June 28, 1971, in Pretoria, South Africa. Musk is known for founding several high-profile technology companies, including:\n\n1. **Zip2 Corporation**: A city guide software company founded in 1996 and sold to Compaq in 1999.\n\n2. **PayPal**: An online payments system, which was sold to eBay in 2002 for $1.5 billion.\n\n3. **SpaceX**: Founded in 2002, SpaceX aims to reduce space transportation costs to enable the colonization of Mars. SpaceX has launched numerous satellites, resupplied the International Space Station (ISS), and developed the Falcon and Starship rockets.\n\n4. **Tesla, Inc.**: Musk joined Tesla in 2004, a year after its founding, and is the CEO and lead product architect. Tesla is known for producing electric vehicles and renewable energy products.\n\n5. **SolarCity**: A solar energy services company that is now a subsidiary of Tesla.\n\n6. **Neuralink**: A neurotechnology company, founded in 2016, that's developing implantable brain–machine interfaces.\n\n7. **The Boring Company**: An infrastructure and tunnel construction services company founded in 2016.\n\nMusk's work with these companies has made him a pivotal figure in the advancement of electric vehicles, sustainable energy, and space travel. As of 2021, he is one of the wealthiest people in the world.\n\nPlease note that this is a brief overview. For more detailed information, consider reading biographies about Musk or checking reliable online resources.",
        timestamps: '2025-05-10T14:30:50.898Z',
        _id: '681f631ab65b4d07f1e51646',
      },
    ],
    createdAt: '2025-05-10T14:29:05.334Z',
    updatedAt: '2025-05-10T14:30:50.901Z',
    __v: 2,
  },
];

export default function QueriesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedQuery, setSelectedQuery] = useState<(typeof queries)[0] | null>(null);

  // Filter queries based on search term
  const filteredQueries = queries.filter((query) => {
    // Search in messages
    return query.messages.some((message) => message.text.toLowerCase().includes(searchTerm.toLowerCase()));
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

  // Get the first user message as a title
  const getQueryTitle = (query: (typeof queries)[0]) => {
    const firstUserMessage = query.messages.find((m) => m.sender === 'user' && m.text.length > 5);
    return firstUserMessage ? (firstUserMessage.text.length > 30 ? firstUserMessage.text.substring(0, 30) + '...' : firstUserMessage.text) : 'Chat session';
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Chat Sessions</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sessions</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{queries.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{queries.reduce((total, query) => total + query.messages.length, 0)}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Chat Sessions</CardTitle>
          <CardDescription>View all user chat sessions with PDFs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search in messages..." className="pl-8" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Session ID</TableHead>
                  <TableHead>First Message</TableHead>
                  <TableHead>Messages</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredQueries.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      No chat sessions found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredQueries.map((query) => (
                    <TableRow key={query._id} className="cursor-pointer hover:bg-muted/50" onClick={() => setSelectedQuery(query)}>
                      <TableCell className="font-mono text-xs">{query.sessionId}</TableCell>
                      <TableCell>{getQueryTitle(query)}</TableCell>
                      <TableCell>{query.messages.length}</TableCell>
                      <TableCell>{formatDate(query.createdAt)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedQuery(query);
                              }}
                            >
                              View conversation
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">Delete session</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Chat Session Details Dialog */}
      {selectedQuery && (
        <Dialog open={!!selectedQuery} onOpenChange={(open) => !open && setSelectedQuery(null)}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Chat Session</DialogTitle>
              <DialogDescription>
                Session ID: {selectedQuery.sessionId} • {formatDate(selectedQuery.createdAt)}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 max-h-[400px] overflow-y-auto border rounded-md p-4">
              {selectedQuery.messages.map((message) => (
                <div key={message._id} className={`flex ${message.sender === 'user' ? 'justify-start' : 'justify-end'}`}>
                  <div className={`max-w-[80%] rounded-lg p-3 ${message.sender === 'user' ? 'bg-muted text-foreground' : 'bg-primary text-primary-foreground'}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <UserCircle className="h-4 w-4" />
                      <span className="text-xs font-medium">{message.sender === 'user' ? 'User' : 'AI Assistant'}</span>
                      <span className="text-xs text-muted-foreground">{formatDate(message.timestamps)}</span>
                    </div>
                    <p className="whitespace-pre-wrap">{message.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedQuery(null)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
