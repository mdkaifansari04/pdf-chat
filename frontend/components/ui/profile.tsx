import { useClerk } from '@clerk/nextjs';
import { LogOut, MoveUpRight, Settings, CreditCard, FileText } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { FadeImg } from './fade-img';

interface MenuItem {
  label: string;
  value?: string;
  href: string;
  icon?: React.ReactNode;
  external?: boolean;
}

interface ProfileProps {
  name: string;
  email: string;
  avatar: string;
  subscription?: string;
}

export default function Profile({ name, email, avatar, subscription }: ProfileProps) {
  const { signOut } = useClerk();
  const menuItems: MenuItem[] = [
    // {
    //   label: 'Credits',
    //   value: subscription,
    //   href: '#',
    //   icon: <CreditCard className="w-4 h-4" />,
    //   external: false,
    // },
  ];

  return (
    <div className="w-full max-w-sm mx-auto dark:bg-zinc-900 ">
      <div className="relative overflow-hidden border rounded-2xl border-zinc-200 dark:border-zinc-800">
        <div className="relative px-6 pt-12 pb-6">
          <div className="flex items-center gap-4 mb-8">
            <div className="relative shrink-0">
              <FadeImg src={avatar} alt={name} width={72} height={72} className="object-cover rounded-full ring-4 ring-white dark:ring-zinc-900" />
              <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-zinc-900" />
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">{name}</h2>
              <p className="text-zinc-600 text-sm dark:text-zinc-400">{email}</p>
            </div>
          </div>
          <div className="h-px my-6 bg-zinc-200 dark:bg-zinc-800" />
          <div className="space-y-2">
            {menuItems.map((item) => (
              <Link key={item.label} href={item.href} className="flex items-center justify-between p-2 transition-colors duration-200 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                <div className="flex items-center gap-2">
                  {item.icon}
                  <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{item.label}</span>
                </div>
                <div className="flex items-center">
                  {item.value && <span className="mr-2 text-sm text-zinc-500 dark:text-zinc-400">{item.value}</span>}
                  {item.external && <MoveUpRight className="w-4 h-4" />}
                </div>
              </Link>
            ))}

            <button type="button" className="flex items-center justify-between w-full p-2 transition-colors duration-200 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
              <div onClick={() => signOut()} className="flex items-center gap-2">
                <LogOut className="w-4 h-4" />
                <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Logout</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
