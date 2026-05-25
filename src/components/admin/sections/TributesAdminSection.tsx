'use client';

import { useState } from 'react';
import { Check, Edit3, Trash2 } from 'lucide-react';
import { useMemorialAdmin } from '@/components/admin/memorial/MemorialAdminProvider';
import FormField, { inputClass } from '@/components/admin/sections/FormField';
import SectionCard from '@/components/admin/sections/SectionCard';

export default function TributesAdminSection() {
  const { tributes, setTributes } = useMemorialAdmin();
  const [editingId, setEditingId] = useState<number | null>(null);

  return (
    <SectionCard title="Tributes" description="View tributes, edit wording, or delete posts that should no longer appear.">
      <div className="space-y-3">
        {tributes.map((tribute) => (
          <div key={tribute.id} className="rounded-md border border-primary-hover_light bg-primary-light p-4">
            {editingId === tribute.id ? (
              <div className="grid gap-3">
                <FormField label="Author">
                  <input className={inputClass} value={tribute.author} onChange={(event) => setTributes((current) => current.map((item) => item.id === tribute.id ? { ...item, author: event.target.value } : item))} />
                </FormField>
                <FormField label="Tribute message">
                  <textarea className={`${inputClass} min-h-24`} value={tribute.message} onChange={(event) => setTributes((current) => current.map((item) => item.id === tribute.id ? { ...item, message: event.target.value } : item))} />
                </FormField>
                <button className="inline-flex w-fit items-center gap-2 rounded-md bg-primary px-3 py-2 text-sm text-primary-light" onClick={() => setEditingId(null)} type="button">
                  <Check className="h-4 w-4" />
                  Done
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="font-semibold text-primary">{tribute.author}</p>
                  <p className="mt-1 text-sm leading-6 text-primary-text_black/80">{tribute.message}</p>
                </div>
                <div className="flex gap-2">
                  <button className="rounded-md border border-primary-hover_light p-2 text-primary hover:bg-primary-hover_light" onClick={() => setEditingId(tribute.id)} type="button" aria-label="Edit tribute">
                    <Edit3 className="h-4 w-4" />
                  </button>
                  <button className="rounded-md border border-primary-hover_light p-2 text-primary hover:bg-primary-hover_light" onClick={() => setTributes((current) => current.filter((item) => item.id !== tribute.id))} type="button" aria-label="Delete tribute">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
