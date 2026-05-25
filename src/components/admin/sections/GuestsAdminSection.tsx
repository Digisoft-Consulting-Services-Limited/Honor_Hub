import { UsersRound } from 'lucide-react';
import SectionCard from '@/components/admin/sections/SectionCard';

export default function GuestsAdminSection() {
  return (
    <SectionCard title="Guests" description="Guest login is not enabled yet. This page is reserved for invites and contributor access later.">
      <div className="rounded-md bg-primary-light_yellow p-5 text-primary">
        <UsersRound className="mb-3 h-6 w-6" />
        <p className="text-sm leading-6">
          For now, only the admin edits memorial content. Later this page can manage invite links, guest roles, and contributor permissions.
        </p>
      </div>
    </SectionCard>
  );
}
