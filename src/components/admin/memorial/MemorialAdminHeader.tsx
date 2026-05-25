'use client';

import MemorialStatusBadge from '@/components/admin/memorial/MemorialStatusBadge';
import { useMemorialAdmin } from '@/components/admin/memorial/MemorialAdminProvider';

export default function MemorialAdminHeader() {
  const { honoreeName, identity } = useMemorialAdmin();

  return (
    <div className="overflow-hidden rounded-lg border border-primary-hover_light bg-white shadow-sm">
      <img src={identity.coverImage} alt="" className="h-40 w-full object-cover" />
      <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
        <img
          src={identity.profileImage}
          alt={`${honoreeName} profile`}
          className="h-20 w-20 rounded-full border-4 border-primary-light_yellow object-cover"
        />
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-2xl font-semibold text-primary">{honoreeName}</h2>
            <MemorialStatusBadge />
          </div>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-primary-text_black/70">
            {identity.shortMessage}
          </p>
        </div>
      </div>
    </div>
  );
}
