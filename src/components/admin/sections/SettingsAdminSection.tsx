import SectionCard from '@/components/admin/sections/SectionCard';

export default function SettingsAdminSection() {
  return (
    <SectionCard title="Settings" description="Advanced memorial settings will live here when privacy, publishing, and ownership are connected.">
      <div className="grid gap-3 text-sm text-primary-text_black/75">
        <p className="rounded-md bg-primary-light p-4">Visibility controls will be added later.</p>
        <p className="rounded-md bg-primary-light p-4">Transfer ownership and delete memorial actions should be protected by confirmations.</p>
      </div>
    </SectionCard>
  );
}
