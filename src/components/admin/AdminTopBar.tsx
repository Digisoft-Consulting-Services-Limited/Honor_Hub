'use client';

import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { useMemorialAdmin } from '@/components/admin/memorial/MemorialAdminProvider';

export default function AdminTopBar() {
  const { honoreeName } = useMemorialAdmin();

  return (
    <div className="mb-6 rounded-lg bg-primary p-5 text-primary-light shadow-sm">
      <p className="text-sm uppercase tracking-wide text-primary-hover_light">Website administrator</p>
      <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold">{honoreeName}</h1>
          <p className="mt-1 text-sm text-primary-light_yellow">
            Manage the memorial identity and public sections.
          </p>
        </div>
        <Link
          href="/memorial/lisa-luu-luu"
          className="inline-flex w-fit items-center gap-2 rounded-md bg-primary-hover_light px-4 py-2 text-sm font-medium text-primary hover:bg-primary-light_yellow"
        >
          <ExternalLink className="h-4 w-4" />
          View memorial
        </Link>
      </div>
    </div>
  );
}
