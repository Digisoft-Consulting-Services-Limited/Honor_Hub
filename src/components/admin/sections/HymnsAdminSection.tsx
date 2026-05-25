'use client';

import { useState } from 'react';
import { Check, Edit3, Music, Plus, Trash2 } from 'lucide-react';
import { useMemorialAdmin } from '@/components/admin/memorial/MemorialAdminProvider';
import FormField, { inputClass } from '@/components/admin/sections/FormField';
import SectionCard from '@/components/admin/sections/SectionCard';

export default function HymnsAdminSection() {
  const { hymns, setHymns } = useMemorialAdmin();
  const [editingId, setEditingId] = useState<number | null>(null);

  const addHymn = () => {
    const nextId = Date.now();
    setHymns((current) => [...current, { id: nextId, title: 'New hymn', artist: '', notes: '' }]);
    setEditingId(nextId);
  };

  return (
    <SectionCard title="Hymns" description="Create hymns with a title, artist or composer, and lyrics or service notes.">
      <button className="mb-4 inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-light hover:bg-border" onClick={addHymn} type="button">
        <Plus className="h-4 w-4" />
        Add hymn
      </button>
      <div className="space-y-3">
        {hymns.map((hymn) => (
          <div key={hymn.id} className="rounded-md border border-primary-hover_light bg-primary-light p-4">
            {editingId === hymn.id ? (
              <div className="grid gap-3">
                <div className="grid gap-3 md:grid-cols-2">
                  <FormField label="Title">
                    <input className={inputClass} value={hymn.title} onChange={(event) => setHymns((current) => current.map((item) => item.id === hymn.id ? { ...item, title: event.target.value } : item))} />
                  </FormField>
                  <FormField label="Artist or composer">
                    <input className={inputClass} value={hymn.artist} onChange={(event) => setHymns((current) => current.map((item) => item.id === hymn.id ? { ...item, artist: event.target.value } : item))} />
                  </FormField>
                </div>
                <FormField label="Lyrics or notes">
                  <textarea className={`${inputClass} min-h-28`} value={hymn.notes} onChange={(event) => setHymns((current) => current.map((item) => item.id === hymn.id ? { ...item, notes: event.target.value } : item))} />
                </FormField>
                <button className="inline-flex w-fit items-center gap-2 rounded-md bg-primary px-3 py-2 text-sm text-primary-light" onClick={() => setEditingId(null)} type="button">
                  <Check className="h-4 w-4" />
                  Done
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="font-semibold text-primary">
                    <Music className="mr-2 inline h-4 w-4" />
                    {hymn.title}
                  </p>
                  <p className="mt-1 text-sm text-primary-text_black/70">{hymn.artist}</p>
                  <p className="mt-2 text-sm leading-6 text-primary-text_black/80">{hymn.notes}</p>
                </div>
                <div className="flex gap-2">
                  <button className="rounded-md border border-primary-hover_light p-2 text-primary hover:bg-primary-hover_light" onClick={() => setEditingId(hymn.id)} type="button" aria-label="Edit hymn">
                    <Edit3 className="h-4 w-4" />
                  </button>
                  <button className="rounded-md border border-primary-hover_light p-2 text-primary hover:bg-primary-hover_light" onClick={() => setHymns((current) => current.filter((item) => item.id !== hymn.id))} type="button" aria-label="Delete hymn">
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
