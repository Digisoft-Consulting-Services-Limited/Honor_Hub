import AdminFooter from '@/components/admin/AdminFooter';
import AdminNavbar from '@/components/admin/AdminNavbar';

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-primary-light text-primary-text_black">
      <AdminNavbar />
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <h1 className="text-3xl font-semibold text-primary">My Account</h1>
        <p className="mt-2 text-sm text-primary-text_black/70">Manage your memorials and account information.</p>
        <div className="mt-6 overflow-hidden rounded-lg border border-primary-hover_light bg-white shadow-sm">
          {children}
        </div>
      </main>
      <AdminFooter />
    </div>
  );
}
