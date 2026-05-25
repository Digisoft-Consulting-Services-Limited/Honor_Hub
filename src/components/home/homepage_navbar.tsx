'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Flame, LogOut, Menu, UserRound, X } from 'lucide-react';

interface AccountImageProps {
  name: string;
  imageUrl: string;
}

const accountLinks = [
  { href: '/account/my-memorials', label: 'My Memorials' },
  { href: '/account/account-information', label: 'Account Information' },
];

const Homepage_Navbar: React.FC<AccountImageProps> = ({ name, imageUrl }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (sidebarRef.current && !sidebarRef.current.contains(target)) {
        setIsSidebarOpen(false);
      }

      if (dropdownRef.current && !dropdownRef.current.contains(target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative z-50">
      <nav className="bg-primary text-primary-light shadow-md">
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="/home" className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-light_yellow text-primary">
              <Flame className="h-6 w-6" />
            </span>
            <span className="text-xl font-bold text-primary-light_yellow">HonorHub</span>
          </Link>

          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-primary-light hover:bg-primary-hover_light hover:text-primary md:hidden"
            onClick={() => setIsSidebarOpen(true)}
            type="button"
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>

          <div className="hidden items-center gap-6 md:flex">
            <a
              href="mailto:sallygithinji72@gmail.com"
              className="text-sm font-medium text-primary-light hover:text-primary-hover_light"
            >
              Contact Support
            </a>

            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen((current) => !current)}
                className="flex items-center gap-2 rounded-md px-2 py-2 text-sm font-medium text-primary-light hover:bg-primary-hover_light hover:text-primary"
                type="button"
              >
                <UserRound className="h-5 w-5" />
                <span>Hello, {name || 'Guest'}</span>
                <ChevronDown className="h-4 w-4" />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 overflow-hidden rounded-md bg-primary-light_yellow text-primary shadow-lg">
                  <ul className="py-1 text-sm">
                    {accountLinks.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="block px-4 py-2 hover:bg-primary-hover_light"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                    <li className="border-t border-primary-hover_light">
                      <button
                        className="flex w-full items-center gap-2 px-4 py-2 text-left hover:bg-primary-hover_light"
                        type="button"
                      >
                        <LogOut className="h-4 w-4" />
                        Sign Out
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div
        ref={sidebarRef}
        className={`fixed left-0 top-0 z-50 h-full w-72 bg-primary-light_yellow text-primary shadow-lg transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between bg-primary p-4 text-primary-light">
          <div className="flex items-center gap-3">
            <img src={imageUrl} alt={`${name || 'Guest'} profile`} className="h-11 w-11 rounded-full object-cover" />
            <div>
              <p className="font-semibold">Hello, {name || 'Guest'}</p>
              <p className="text-xs text-primary-hover_light">Welcome</p>
            </div>
          </div>
          <button
            className="rounded-md p-2 hover:bg-primary-hover_light hover:text-primary"
            onClick={() => setIsSidebarOpen(false)}
            type="button"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-5 p-4">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-primary-text_black/60">
              My Account
            </p>
            <ul className="space-y-1">
              {accountLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block rounded-md px-3 py-2 text-sm hover:bg-primary-hover_light"
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-primary-hover_light pt-4">
            <a
              href="mailto:sallygithinji72@gmail.com"
              className="block rounded-md px-3 py-2 text-sm hover:bg-primary-hover_light"
            >
              Contact Support
            </a>
            <Link
              href="/terms-of-service"
              className="block rounded-md px-3 py-2 text-sm hover:bg-primary-hover_light"
              onClick={() => setIsSidebarOpen(false)}
            >
              Terms of Service
            </Link>
            <Link
              href="/privacy-policy"
              className="block rounded-md px-3 py-2 text-sm hover:bg-primary-hover_light"
              onClick={() => setIsSidebarOpen(false)}
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>

      {isSidebarOpen && (
        <button
          className="fixed inset-0 z-40 bg-black/40"
          onClick={() => setIsSidebarOpen(false)}
          type="button"
          aria-label="Close menu overlay"
        />
      )}
    </div>
  );
};

export default Homepage_Navbar;
