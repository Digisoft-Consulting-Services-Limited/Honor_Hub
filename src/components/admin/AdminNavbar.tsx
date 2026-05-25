'use client';

import Link from 'next/link';
import { Flame, LogIn, UserPlus } from 'lucide-react';

export default function AdminNavbar() {
  return (
    <nav className="bg-primary text-primary-light shadow-md">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:px-6 md:flex-row md:items-center md:justify-between">
        <Link href="/home" className="flex items-center gap-2 text-xl font-bold text-primary-light_yellow">
          <Flame className="h-5 w-5" />
          HonorHub
        </Link>
        <div className="flex flex-wrap items-center gap-3 text-sm">
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
  );
}
