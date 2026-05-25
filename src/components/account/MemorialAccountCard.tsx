'use client';

import Link from 'next/link';
import { Edit3, Globe2, Trash2, UserRound } from 'lucide-react';
import { AccountMemorial } from '@/types/Admin/account';

export default function MemorialAccountCard({
  memorial,
  onDelete,
}: {
  memorial: AccountMemorial;
  onDelete: (id: number) => void;
}) {
  return (
    <div className="grid gap-4 rounded-lg border border-primary-hover_light bg-primary-light p-4 md:grid-cols-[1fr_auto]">
      <div className="flex gap-4">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary-hover_light text-primary">
          <UserRound className="h-8 w-8" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-primary">{memorial.name}</h2>
          <p className="mt-1 flex items-center gap-2 text-sm text-primary-text_black/70">
            <Globe2 className="h-4 w-4 text-primary" />
            honorhub.com/memorial/{memorial.slug}
          </p>
          <p className="mt-2 text-sm text-primary">
            Current plan:{' '}
            <span className="rounded bg-primary px-2 py-1 text-xs uppercase text-primary-light">
              {memorial.plan}
            </span>
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 md:justify-end">
        <Link href="/admin/memorials/demo/insights" className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-light hover:bg-border">
          <Edit3 className="h-4 w-4" />
          Manage
        </Link>
        <button className="inline-flex items-center gap-2 rounded-md border border-primary-hover_light px-4 py-2 text-sm font-medium text-primary hover:bg-primary-hover_light" onClick={() => onDelete(memorial.id)} type="button">
          <Trash2 className="h-4 w-4" />
          Delete
        </button>
      </div>
    </div>
  );
}
