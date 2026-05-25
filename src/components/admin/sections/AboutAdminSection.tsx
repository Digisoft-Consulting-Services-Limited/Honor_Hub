'use client';

import { ChangeEvent, FormEvent, useState } from 'react';
import { Check, ImagePlus, Save } from 'lucide-react';
import { useMemorialAdmin } from '@/components/admin/memorial/MemorialAdminProvider';
import FormField, { inputClass } from '@/components/admin/sections/FormField';
import SectionCard from '@/components/admin/sections/SectionCard';

export default function AboutAdminSection() {
  const { identity, setIdentity, honoreeName } = useMemorialAdmin();
  const [notice, setNotice] = useState('');

  const updateIdentity = (field: keyof typeof identity, value: string) => {
    setIdentity((current) => ({ ...current, [field]: value }));
  };

  const handleImagePreview = (
    event: ChangeEvent<HTMLInputElement>,
    field: 'profileImage' | 'coverImage'
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    updateIdentity(field, URL.createObjectURL(file));
  };

  const saveMemorial = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setNotice('Memorial identity saved in this admin draft.');
    window.setTimeout(() => setNotice(''), 2500);
  };

  return (
    <SectionCard
      title="Memorial Identity"
      description="Edit the main honoree information, profile image, cover image, and short memorial message."
    >
      <form onSubmit={saveMemorial} className="grid gap-5">
        <div className="grid gap-4 md:grid-cols-2">
          <FormField label="First name">
            <input className={inputClass} value={identity.firstName} onChange={(event) => updateIdentity('firstName', event.target.value)} />
          </FormField>
          <FormField label="Last name">
            <input className={inputClass} value={identity.lastName} onChange={(event) => updateIdentity('lastName', event.target.value)} />
          </FormField>
          <FormField label="Date of birth">
            <input type="date" className={inputClass} value={identity.birthDate} onChange={(event) => updateIdentity('birthDate', event.target.value)} />
          </FormField>
          <FormField label="Date of passing">
            <input type="date" className={inputClass} value={identity.passingDate} onChange={(event) => updateIdentity('passingDate', event.target.value)} />
          </FormField>
        </div>

        <FormField label="Biography or short memorial message">
          <textarea className={`${inputClass} min-h-28 resize-y`} value={identity.shortMessage} onChange={(event) => updateIdentity('shortMessage', event.target.value)} />
        </FormField>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-md border border-primary-hover_light bg-primary-light p-4">
            <div className="mb-3 flex items-center gap-2 text-sm font-medium text-primary">
              <ImagePlus className="h-4 w-4" />
              Profile image
            </div>
            <img src={identity.profileImage} alt={`${honoreeName} profile preview`} className="mb-3 h-32 w-32 rounded-full border border-primary-hover_light object-cover" />
            <input type="file" accept="image/*" className="text-sm text-primary" onChange={(event) => handleImagePreview(event, 'profileImage')} />
          </div>

          <div className="rounded-md border border-primary-hover_light bg-primary-light p-4">
            <div className="mb-3 flex items-center gap-2 text-sm font-medium text-primary">
              <ImagePlus className="h-4 w-4" />
              Cover image
            </div>
            <img src={identity.coverImage} alt={`${honoreeName} cover preview`} className="mb-3 h-32 w-full rounded-md border border-primary-hover_light object-cover" />
            <input type="file" accept="image/*" className="text-sm text-primary" onChange={(event) => handleImagePreview(event, 'coverImage')} />
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <button type="submit" className="inline-flex w-fit items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-light hover:bg-border">
            <Save className="h-4 w-4" />
            Save memorial
          </button>
          {notice && (
            <span className="inline-flex items-center gap-2 text-sm font-medium text-primary">
              <Check className="h-4 w-4" />
              {notice}
            </span>
          )}
        </div>
      </form>
    </SectionCard>
  );
}
