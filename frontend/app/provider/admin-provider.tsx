'use client';

import Sidebar from '@/components/shared/admin-sidebar';

import { usePathname } from 'next/navigation';
import { PropsWithChildren, useEffect, useState } from 'react';
import { accessTokenStorage } from '@/lib/token-storage';

const AuthWrapper = ({ children }: PropsWithChildren<{}>) => {
  const pathname = usePathname();
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    setIsAdminAuthenticated(accessTokenStorage.get() ? true : false);
  }, [pathname]);

  if (isAdminAuthenticated === null) return null;

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 w-full">
        <main className="flex-1 overflow-auto p-6 bg-white dark:bg-[#0F0F12]">{children}</main>
      </div>
    </div>
  );
};

export default AuthWrapper;
