import React from 'react';
import Link from 'next/link';
import { FileText, Github, Twitter, Linkedin } from 'lucide-react';
import Logo from './logo';

function Footer() {
  return (
    <footer className="border-t py-6 dark:bg-transparent">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:flex-row">
        <Link href="/" className="flex items-center space-x-2 text-sm font-medium">
          <Logo />
        </Link>

        <div className="flex items-center space-x-4">
          <Link href="https://github.com/mdkaifansari04/pdf-chat" target="_blank" rel="noopener noreferrer">
            <Github className="h-5 w-5 hover:text-foreground text-muted-foreground" />
          </Link>
          <Link href="https://www.linkedin.com/in/md-kaif-ansari" target="_blank" rel="noopener noreferrer">
            <Linkedin className="h-5 w-5 hover:text-foreground text-muted-foreground" />
          </Link>
          <Link href="https://x.com/MdKaifA16697201" target="_blank" rel="noopener noreferrer">
            <Twitter className="h-5 w-5 hover:text-foreground text-muted-foreground" />
          </Link>
        </div>
      </div>

      <div className="container mt-4 mx-auto">
        <p className="text-center text-xs text-muted-foreground">&copy; {new Date().getFullYear()} PDFChat. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
