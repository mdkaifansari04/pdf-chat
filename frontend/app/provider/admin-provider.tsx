'use client';

import Sidebar from '@/components/shared/admin-sidebar';
import { usePathname } from 'next/navigation';
import { PropsWithChildren, useEffect, useLayoutEffect, useState } from 'react';
import { accessTokenStorage } from '@/lib/token-storage';
import { useRouter } from 'next/navigation';
import { DefaultLoadingView } from '@/components/shared/loading-view';

const AuthWrapper = ({ children }: PropsWithChildren<{}>) => {
  const pathname = usePathname();
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();
  useLayoutEffect(() => {
    setIsAdminAuthenticated(accessTokenStorage.get() ? true : false);
  }, [pathname]);

  if (isAdminAuthenticated === null) return <DefaultLoadingView />;
  if (!isAdminAuthenticated) router.push('/admin/login');

  return (
    <div className="flex h-screen overflow-hidden">
      {isAdminAuthenticated && <Sidebar />}
      <div className="flex flex-col flex-1 w-full">
        <main className="flex-1 overflow-auto p-6 bg-white dark:bg-[#0F0F12]">{children}</main>
      </div>
    </div>
  );
};

export default AuthWrapper;
