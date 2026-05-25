'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const tabs = [
  { href: '/account/my-memorials', label: 'My Memorials' },
  { href: '/account/account-information', label: 'Account Information' },
];

export default function AccountTabs() {
  const pathname = usePathname();

  return (
    <div className="grid border-b border-primary-hover_light bg-primary-light_yellow sm:grid-cols-2">
      {tabs.map((tab) => (
        <Link
          key={tab.href}
          href={tab.href}
          className={`px-4 py-4 text-center text-sm font-semibold uppercase tracking-wide ${
            pathname === tab.href
              ? 'border-b-4 border-primary text-primary'
              : 'text-primary-text_black hover:bg-primary-hover_light'
          }`}
        >
          {tab.label}
        </Link>
      ))}
    </div>
  );
}
