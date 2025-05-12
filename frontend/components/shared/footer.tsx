import React from 'react';
import Link from 'next/link';
import { FileText } from 'lucide-react';

function Footer() {
  return (
    <footer className="border-t bg-slate-50 py-12 dark:bg-transparent">
      <div className="container grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <FileText className="h-6 w-6" />
            <span className="font-bold inline-block">PDFChat</span>
          </Link>
          <p className="text-sm text-muted-foreground">Chat with your PDF documents using AI-powered natural language processing.</p>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-semibold">Product</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="#features" className="text-muted-foreground hover:text-foreground">
                Features
              </Link>
            </li>
            <li>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                Pricing
              </Link>
            </li>
            <li>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                API
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-semibold">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                Documentation
              </Link>
            </li>
            <li>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                Guides
              </Link>
            </li>
            <li>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                Support
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-semibold">Company</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                About
              </Link>
            </li>
            <li>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                Blog
              </Link>
            </li>
            <li>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="container mt-8 border-t pt-8">
        <p className="text-center text-sm text-muted-foreground">&copy; {new Date().getFullYear()} PDFChat. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
