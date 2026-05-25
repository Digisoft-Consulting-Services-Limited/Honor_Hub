'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import {
  BarChart3,
  BookOpenText,
  CalendarDays,
  FileText,
  Flame,
  Image,
  LogIn,
  Menu,
  Music,
  Settings,
  UserPlus,
  UsersRound,
  UserRound,
  X,
} from 'lucide-react';

const accountLinks = [
  { href: '/account/my-memorials', label: 'My Memorials', icon: UserRound },
  { href: '/auth/login', label: 'Login', icon: LogIn },
  { href: '/auth/register', label: 'Register', icon: UserPlus },
];

const adminLinks = [
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

export default function AdminNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative z-50">
      <nav className="bg-primary text-primary-light shadow-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-3 sm:h-20 sm:px-6">
          <Link href="/home" className="flex min-w-0 items-center gap-2 text-lg font-bold text-primary-light_yellow sm:text-xl">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-light_yellow text-primary">
              <Flame className="h-5 w-5" />
            </span>
            <span className="truncate">HonorHub</span>
          </Link>

          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-primary-light hover:bg-primary-hover_light hover:text-primary md:hidden"
            onClick={() => setIsOpen(true)}
            type="button"
            aria-label="Open admin menu"
          >
            <Menu className="h-6 w-6" />
          </button>

          <div className="hidden items-center gap-3 text-sm md:flex">
            <Link href="/account/my-memorials" className="rounded-md px-3 py-2 hover:bg-primary-hover_light hover:text-primary">
              My Memorials
            </Link>
            <Link href="/auth/login" className="inline-flex items-center gap-2 rounded-md px-3 py-2 hover:bg-primary-hover_light hover:text-primary">
              <LogIn className="h-4 w-4" />
              Login
            </Link>
            <Link
              href="/auth/register"
              className="inline-flex items-center gap-2 rounded-md bg-primary-hover_light px-4 py-2 font-medium text-primary hover:bg-primary-light_yellow"
            >
              <UserPlus className="h-4 w-4" />
              Register
            </Link>
          </div>
        </div>
      </nav>

      <div
        ref={drawerRef}
        className={`fixed right-0 top-0 z-50 h-dvh w-[min(20rem,88vw)] overflow-y-auto bg-primary-light_yellow text-primary shadow-lg transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between gap-3 bg-primary p-4 text-primary-light">
          <div className="min-w-0">
            <p className="font-semibold">HonorHub Admin</p>
            <p className="text-xs text-primary-hover_light">Manage memorial content</p>
          </div>
          <button
            className="rounded-md p-2 hover:bg-primary-hover_light hover:text-primary"
            onClick={() => setIsOpen(false)}
            type="button"
            aria-label="Close admin menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-5 p-4">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-primary-text_black/60">
              Account
            </p>
            <ul className="space-y-1">
              {accountLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-primary-hover_light"
                      onClick={() => setIsOpen(false)}
                    >
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="border-t border-primary-hover_light pt-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-primary-text_black/60">
              Memorial Admin
            </p>
            <ul className="space-y-1">
              {adminLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-primary-hover_light"
                      onClick={() => setIsOpen(false)}
                    >
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      {isOpen && (
        <button
          className="fixed inset-0 z-40 bg-black/40"
          onClick={() => setIsOpen(false)}
          type="button"
          aria-label="Close admin menu overlay"
        />
      )}
    </div>
  );
}
