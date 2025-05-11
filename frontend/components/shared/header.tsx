'use client';
import { SignedIn } from '@clerk/nextjs';
import UserProfile from '../data-display/user-profile';
import { ModeToggle } from '../theme-toggler';
import Logo from './logo';
import { usePathname } from 'next/navigation';

function Header() {
  const pathname = usePathname().split('/');
  const isAdmin = pathname.includes('admin');
  if (isAdmin) return null;
  return (
    <div className="flex justify-between items-center py-4 px-10 border-b">
      <Logo />
      <SignedIn>
        <div className="flex items-center space-x-3">
          <ModeToggle />
          <UserProfile />
        </div>
      </SignedIn>
    </div>
  );
}

export default Header;
