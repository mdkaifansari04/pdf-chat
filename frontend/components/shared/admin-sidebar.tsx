'use client';

import { cn } from '@/lib/utils';
import { Home, LogOut, Menu, MessageCircle, Users, File } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Logo from '../shared/logo';

export default function Sidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const paths = usePathname().split('/');

  function NavItem({ href, icon: Icon, onClick, text }: { href: string; icon: any; text: string; onClick?: () => void }) {
    return (
      <Link
        href={href}
        onClick={onClick}
        className={cn('flex items-center px-3 py-2 text-sm rounded-md transition-colors text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-[#1F1F23]', {
          'text-gray-900 dark:text-white bg-gray-50 dark:bg-[#1F1F23]': paths.includes(text.toLowerCase()),
        })}
      >
        <Icon className="flex-shrink-0 mr-3 w-4 h-4" />
        {text}
      </Link>
    );
  }

  return (
    <>
      <button type="button" className="lg:hidden fixed top-4 left-4 z-[70] p-2 rounded-lg bg-white dark:bg-[#0F0F12] shadow-md" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
        <Menu className="w-5 h-5 text-gray-600 dark:text-gray-300" />
      </button>
      <nav
        className={`
                fixed inset-y-0 left-0 z-[70] w-64 bg-white dark:bg-[#0F0F12] transform transition-transform duration-200 ease-in-out
                lg:translate-x-0 lg:static lg:w-64 border-r border-gray-200 dark:border-[#1F1F23]
                ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
            `}
      >
        <div className="flex flex-col h-full">
          <Link href="/" rel="noopener noreferrer" className="h-16 px-6 flex items-center border-b border-gray-200 dark:border-[#1F1F23]">
            <div className="flex gap-3 items-center">
              <Logo />
            </div>
          </Link>

          <div className="overflow-y-auto flex-1 px-4 py-4">
            <div className="space-y-6">
              <div>
                <div className="px-3 mb-2 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">Overview</div>
                <div className="space-y-1">
                  <NavItem text="Dashboard" href="/admin/dashboard" icon={Home} />
                  <NavItem text="Users" href="/admin/users" icon={Users} />
                  <NavItem text="Resources" href="/admin/resources" icon={File} />
                  <NavItem text="Chats" href="/admin/queries" icon={MessageCircle} />
                </div>
              </div>
            </div>
          </div>
          <div className="px-4 py-4 border-t border-gray-200 dark:border-[#1F1F23]">
            <div className="space-y-1">
              <span className="flex cursor-pointer items-center px-3 py-2 text-sm rounded-md transition-colors text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-[#1F1F23]">
                <LogOut className="flex-shrink-0 mr-3 w-4 h-4" />
                Logout
              </span>
            </div>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-[65] lg:hidden" onClick={() => setIsMobileMenuOpen(false)} />}
    </>
  );
}
