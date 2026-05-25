'use client';

import { useMemorialAdmin } from '@/components/admin/memorial/MemorialAdminProvider';
import FormField, { inputClass } from '@/components/admin/sections/FormField';
import SectionCard from '@/components/admin/sections/SectionCard';

export default function LifeAdminSection() {
  const { life, setLife } = useMemorialAdmin();

  return (
    <SectionCard title="Life" description="Edit the main life note and biography shown on the memorial.">
      <div className="grid gap-4">
        <FormField label="Memorial quote">
          <input className={inputClass} value={life.quote} onChange={(event) => setLife((current) => ({ ...current, quote: event.target.value }))} />
        </FormField>
        <FormField label="Biography">
          <textarea className={`${inputClass} min-h-40`} value={life.biography} onChange={(event) => setLife((current) => ({ ...current, biography: event.target.value }))} />
        </FormField>
      </div>
    </SectionCard>
  );
}
