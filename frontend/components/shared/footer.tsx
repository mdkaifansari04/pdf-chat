import { Github, Linkedin, Twitter } from 'lucide-react';
import Link from 'next/link';
import Logo from './logo';

function Footer() {
  return (
    <footer className="border-t bg-slate-50 py-6 dark:bg-transparent">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <Link href="/" className="flex items-center space-x-2 text-sm font-medium">
          <Logo />
        </Link>

        <div className="flex items-center space-x-4">
          <Link href="https://github.com/your-repo" target="_blank" rel="noopener noreferrer">
            <Github className="h-5 w-5 hover:text-foreground text-muted-foreground" />
          </Link>
          <Link href="https://linkedin.com/in/your-profile" target="_blank" rel="noopener noreferrer">
            <Linkedin className="h-5 w-5 hover:text-foreground text-muted-foreground" />
          </Link>
          <Link href="https://twitter.com/your-handle" target="_blank" rel="noopener noreferrer">
            <Twitter className="h-5 w-5 hover:text-foreground text-muted-foreground" />
          </Link>
        </div>
      </div>

      <div className="container mt-4">
        <p className="text-center text-xs text-muted-foreground">&copy; {new Date().getFullYear()} PDFChat. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
