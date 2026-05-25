'use client';

import { EyeOff, ImagePlus, Trash2 } from 'lucide-react';
import { useMemorialAdmin } from '@/components/admin/memorial/MemorialAdminProvider';
import SectionCard from '@/components/admin/sections/SectionCard';

export default function GalleryAdminSection() {
  const { gallery, setGallery } = useMemorialAdmin();

  return (
    <SectionCard title="Gallery" description="Add, hide, or delete memorial images. Uploads are preview-only until API storage is connected.">
      <div className="mb-4">
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-light hover:bg-border"
          onClick={() => setGallery((current) => [...current, { id: Date.now(), title: 'New memory', imageUrl: '/img/memorial.webp', hidden: false }])}
        >
          <ImagePlus className="h-4 w-4" />
          Add image
        </button>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {gallery.map((item) => (
          <div key={item.id} className="overflow-hidden rounded-md border border-primary-hover_light bg-primary-light">
            <img src={item.imageUrl} alt={item.title} className="h-44 w-full object-cover" />
            <div className="flex items-center justify-between gap-3 p-4">
              <div>
                <p className="font-semibold text-primary">{item.title}</p>
                {item.hidden && <p className="text-xs uppercase text-primary">Hidden</p>}
              </div>
              <div className="flex gap-2">
                <button type="button" className="rounded-md border border-primary-hover_light p-2 text-primary hover:bg-primary-hover_light" onClick={() => setGallery((current) => current.map((photo) => photo.id === item.id ? { ...photo, hidden: !photo.hidden } : photo))} aria-label="Hide image">
                  <EyeOff className="h-4 w-4" />
                </button>
                <button type="button" className="rounded-md border border-primary-hover_light p-2 text-primary hover:bg-primary-hover_light" onClick={() => setGallery((current) => current.filter((photo) => photo.id !== item.id))} aria-label="Delete image">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
