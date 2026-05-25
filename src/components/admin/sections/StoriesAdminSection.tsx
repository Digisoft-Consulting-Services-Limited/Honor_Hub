'use client';

import { useState } from 'react';
import { Check, Edit3, EyeOff, Plus, Trash2 } from 'lucide-react';
import { useMemorialAdmin } from '@/components/admin/memorial/MemorialAdminProvider';
import FormField, { inputClass } from '@/components/admin/sections/FormField';
import SectionCard from '@/components/admin/sections/SectionCard';

export default function StoriesAdminSection() {
  const { stories, setStories } = useMemorialAdmin();
  const [editingId, setEditingId] = useState<number | null>(null);

  const addStory = () => {
    const nextId = Date.now();
    setStories((current) => [...current, { id: nextId, title: 'New story', body: 'Write the story here.', hidden: false }]);
    setEditingId(nextId);
  };

  return (
    <SectionCard title="Stories and Eulogy" description="Create longer stories, edit them, or hide and delete content.">
      <button className="mb-4 inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-light hover:bg-border" onClick={addStory} type="button">
        <Plus className="h-4 w-4" />
        Create story
      </button>
      <div className="space-y-3">
        {stories.map((story) => (
          <div key={story.id} className={`rounded-md border border-primary-hover_light p-4 ${story.hidden ? 'bg-primary-hover_light/50' : 'bg-primary-light'}`}>
            {editingId === story.id ? (
              <div className="grid gap-3">
                <FormField label="Story title">
                  <input className={inputClass} value={story.title} onChange={(event) => setStories((current) => current.map((item) => item.id === story.id ? { ...item, title: event.target.value } : item))} />
                </FormField>
                <FormField label="Story or eulogy body">
                  <textarea className={`${inputClass} min-h-32`} value={story.body} onChange={(event) => setStories((current) => current.map((item) => item.id === story.id ? { ...item, body: event.target.value } : item))} />
                </FormField>
                <button className="inline-flex w-fit items-center gap-2 rounded-md bg-primary px-3 py-2 text-sm text-primary-light" onClick={() => setEditingId(null)} type="button">
                  <Check className="h-4 w-4" />
                  Done
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-semibold text-primary">{story.title}</p>
                    {story.hidden && <span className="rounded bg-primary px-2 py-1 text-xs text-primary-light">Hidden</span>}
                  </div>
                  <p className="mt-1 text-sm leading-6 text-primary-text_black/80">{story.body}</p>
                </div>
                <div className="flex gap-2">
                  <button className="rounded-md border border-primary-hover_light p-2 text-primary hover:bg-primary-hover_light" onClick={() => setEditingId(story.id)} type="button" aria-label="Edit story">
                    <Edit3 className="h-4 w-4" />
                  </button>
                  <button className="rounded-md border border-primary-hover_light p-2 text-primary hover:bg-primary-hover_light" onClick={() => setStories((current) => current.map((item) => item.id === story.id ? { ...item, hidden: !item.hidden } : item))} type="button" aria-label="Hide story">
                    <EyeOff className="h-4 w-4" />
                  </button>
                  <button className="rounded-md border border-primary-hover_light p-2 text-primary hover:bg-primary-hover_light" onClick={() => setStories((current) => current.filter((item) => item.id !== story.id))} type="button" aria-label="Delete story">
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
