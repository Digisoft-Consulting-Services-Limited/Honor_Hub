'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const tabs = [
  { href: '/admin/memorials/demo/insights', label: 'Insights' },
  { href: '/admin/memorials/demo/about', label: 'About' },
  { href: '/admin/memorials/demo/tributes', label: 'Tributes' },
  { href: '/admin/memorials/demo/stories', label: 'Stories' },
  { href: '/admin/memorials/demo/program', label: 'Program' },
  { href: '/admin/memorials/demo/hymns', label: 'Hymns' },
];

export default function MemorialAdminTabs() {
  const pathname = usePathname();

  return (
    <div className="overflow-x-auto rounded-lg border border-primary-hover_light bg-white">
      <div className="flex min-w-max">
        {tabs.map((tab) => (
          <Link
            key={tab.href}
            href={tab.href}
            className={`px-4 py-3 text-sm font-semibold uppercase tracking-wide ${
              pathname === tab.href
                ? 'border-b-4 border-primary text-primary'
                : 'text-primary-text_black hover:bg-primary-hover_light'
            }`}
          >
            {tab.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
