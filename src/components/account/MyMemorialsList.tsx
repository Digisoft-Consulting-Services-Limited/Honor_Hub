'use client';

import { useState } from 'react';
import CreateMemorialInlineForm from '@/components/account/CreateMemorialInlineForm';
import MemorialAccountCard from '@/components/account/MemorialAccountCard';
import { AccountMemorial } from '@/types/Admin/account';

export default function MyMemorialsList() {
  const [memorials, setMemorials] = useState<AccountMemorial[]>([
    { id: 1, name: 'Lisa Luu Luu', slug: 'lisa-luu-luu', plan: 'Free', status: 'Draft' },
  ]);

  return (
    <section className="space-y-4 p-5">
      {memorials.map((memorial) => (
        <MemorialAccountCard
          key={memorial.id}
          memorial={memorial}
          onDelete={(id) => setMemorials((current) => current.filter((item) => item.id !== id))}
        />
      ))}
      <CreateMemorialInlineForm />
    </section>
  );
}
