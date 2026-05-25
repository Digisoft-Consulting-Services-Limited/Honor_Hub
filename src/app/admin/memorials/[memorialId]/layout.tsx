import AdminLayout from '@/components/admin/AdminLayout';
import { MemorialAdminProvider } from '@/components/admin/memorial/MemorialAdminProvider';

export default function MemorialAdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <MemorialAdminProvider>
      <AdminLayout>{children}</AdminLayout>
    </MemorialAdminProvider>
  );
}
