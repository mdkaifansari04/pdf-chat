'use client';

import type React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LockKeyhole, User } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAdminLogin } from '@/hooks/mutation';
import { useToast } from '@/hooks/use-toast';
import { getErrorMessage } from '@/lib/utils';
import { accessTokenStorage } from '@/lib/token-storage';

export default function AdminLogin() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const isLoggedIn = accessTokenStorage.get() ? true : false;
  if (isLoggedIn) router.push('/admin/dashboard');

  const { mutate: login, isPending: isLoading } = useAdminLogin();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    login(
      { username, password },
      {
        onSuccess: (response) => {
          accessTokenStorage.set(response.token);
          router.push('/admin/dashboard');
        },
        onError: (error) => {
          toast({
            title: 'Oops! Error occurred',
            description: getErrorMessage(error),
            variant: 'destructive',
          });
          console.log(error);
        },
      },
    );
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="border-none shadow-lg">
          <CardHeader className="space-y-1 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <LockKeyhole className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold">Admin Portal</CardTitle>
            <CardDescription>Enter your credentials to access the dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                      <User className="h-5 w-5" />
                    </div>
                    <Input id="username" placeholder="Enter your username" className="pl-10" value={username} onChange={(e) => setUsername(e.target.value)} required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                      <LockKeyhole className="h-5 w-5" />
                    </div>
                    <Input id="password" type="password" placeholder="Enter your password" className="pl-10" value={password} onChange={(e) => setPassword(e.target.value)} required />
                  </div>
                </div>
              </div>
              <Button type="submit" className="mt-6 w-full" disabled={isLoading}>
                {isLoading ? 'Signing in...' : 'Sign in'}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center border-t p-4">
            <p className="text-sm text-slate-500">Secure Admin Access Only</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
