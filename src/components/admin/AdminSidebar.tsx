'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BarChart3,
  BookOpenText,
  CalendarDays,
  FileText,
  Image,
  Music,
  Settings,
  UsersRound,
  UserRound,
} from 'lucide-react';

const links = [
  { href: '/admin/memorials/demo/insights', label: 'Insights', icon: BarChart3 },
  { href: '/admin/memorials/demo/about', label: 'About', icon: UserRound },
  { href: '/admin/memorials/demo/life', label: 'Life', icon: BookOpenText },
  { href: '/admin/memorials/demo/gallery', label: 'Gallery', icon: Image },
  { href: '/admin/memorials/demo/stories', label: 'Stories', icon: BookOpenText },
  { href: '/admin/memorials/demo/tributes', label: 'Tributes', icon: FileText },
  { href: '/admin/memorials/demo/program', label: 'Program', icon: CalendarDays },
  { href: '/admin/memorials/demo/hymns', label: 'Hymns', icon: Music },
  { href: '/admin/memorials/demo/guests', label: 'Guests', icon: UsersRound },
  { href: '/admin/memorials/demo/settings', label: 'Settings', icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden h-fit rounded-lg border border-primary-hover_light bg-primary-light_yellow p-3 shadow-sm lg:block">
      <p className="mb-3 border-b border-primary-hover_light pb-3 text-sm font-semibold text-primary">
        Memorial Admin
      </p>
      <ul className="space-y-1">
        {links.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm transition ${
                  isActive ? 'bg-primary text-primary-light' : 'text-primary hover:bg-primary-hover_light'
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
