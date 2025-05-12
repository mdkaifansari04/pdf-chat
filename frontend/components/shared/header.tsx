'use client';
import { SignedIn, SignedOut } from '@clerk/nextjs';
import UserProfile from '../data-display/user-profile';
import { ModeToggle } from '../theme-toggler';
import Logo from './logo';
import { usePathname } from 'next/navigation';
import { Button } from '../ui/button';
import Link from 'next/link';

function Header() {
  const pathname = usePathname().split('/');
  const isAdmin = pathname.includes('admin');
  if (isAdmin) return null;
  return (
    <div className="flex justify-between items-center py-4 px-10 border-b">
      <Logo />
      <div className="flex items-center space-x-3">
        <ModeToggle />
        <SignedIn>
          <UserProfile />
        </SignedIn>
        <SignedOut>
          <Link href="/sign-in">
            <Button size={'lg'} className="text-white cursor-pointer">
              Login
            </Button>
          </Link>
        </SignedOut>
      </div>
    </div>
  );
}

export default Header;
