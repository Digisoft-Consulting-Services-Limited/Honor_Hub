'use client';

import { BarChart3, BookOpenText, FileText, Image, Music } from 'lucide-react';
import MemorialAdminHeader from '@/components/admin/memorial/MemorialAdminHeader';
import MemorialAdminTabs from '@/components/admin/memorial/MemorialAdminTabs';
import { useMemorialAdmin } from '@/components/admin/memorial/MemorialAdminProvider';

export default function InsightsAdminSection() {
  const { tributes, stories, hymns, gallery } = useMemorialAdmin();
  const cards = [
    { label: 'Tributes', value: tributes.length, icon: FileText },
    { label: 'Stories', value: stories.length, icon: BookOpenText },
    { label: 'Photos', value: gallery.length, icon: Image },
    { label: 'Hymns', value: hymns.length, icon: Music },
  ];

  return (
    <div className="space-y-5">
      <MemorialAdminHeader />
      <MemorialAdminTabs />
      <section className="rounded-lg border border-primary-hover_light bg-white p-5 shadow-sm">
        <div className="mb-5 flex items-center gap-2 border-b border-primary-hover_light pb-4">
          <BarChart3 className="h-5 w-5 text-primary" />
          <div>
            <h1 className="text-2xl font-semibold text-primary">Insights</h1>
            <p className="text-sm text-primary-text_black/70">
              Basic content overview. Visitor statistics are not collected yet.
            </p>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div key={card.label} className="rounded-lg bg-primary-light p-4">
                <Icon className="mb-3 h-5 w-5 text-primary" />
                <p className="text-2xl font-semibold text-primary">{card.value}</p>
                <p className="text-sm text-primary-text_black/70">{card.label}</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
