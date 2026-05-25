import AdminFooter from '@/components/admin/AdminFooter';
import AdminNavbar from '@/components/admin/AdminNavbar';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminTopBar from '@/components/admin/AdminTopBar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-primary-light text-primary-text_black">
      <AdminNavbar />
      <main className="mx-auto grid max-w-6xl gap-6 px-3 py-6 sm:px-6 sm:py-8 lg:grid-cols-[250px_1fr]">
        <AdminSidebar />
        <section>
          <AdminTopBar />
          {children}
        </section>
      </main>
      <AdminFooter />
    </div>
  );
}
