import { SignedIn, UserButton } from '@clerk/nextjs';
import { FileText, Upload } from 'lucide-react';
import { ModeToggle } from '../theme-toggler';
import Logo from './logo';
import UserProfile from '../data-display/user-profile';
import { Button } from '../ui/button';

function Header() {
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
