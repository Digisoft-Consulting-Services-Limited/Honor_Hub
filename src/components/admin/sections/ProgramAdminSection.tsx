'use client';

import { CalendarDays } from 'lucide-react';
import { useMemorialAdmin } from '@/components/admin/memorial/MemorialAdminProvider';
import FormField, { inputClass } from '@/components/admin/sections/FormField';
import SectionCard from '@/components/admin/sections/SectionCard';

export default function ProgramAdminSection() {
  const { program, setProgram } = useMemorialAdmin();

  return (
    <SectionCard title="Program" description="Add the memorial service or celebration-of-life event details.">
      <div className="grid gap-4 md:grid-cols-2">
        <FormField label="Event title">
          <input className={inputClass} value={program.eventTitle} onChange={(event) => setProgram((current) => ({ ...current, eventTitle: event.target.value }))} />
        </FormField>
        <FormField label="Date and time">
          <input type="datetime-local" className={inputClass} value={program.dateTime} onChange={(event) => setProgram((current) => ({ ...current, dateTime: event.target.value }))} />
        </FormField>
      </div>
      <div className="mt-4 rounded-md bg-primary-light_yellow p-4 text-sm text-primary">
        <CalendarDays className="mr-2 inline h-4 w-4" />
        This will later connect to the public Program section.
      </div>
    </SectionCard>
  );
}
