import AccountLayout from '@/components/account/AccountLayout';
import AccountTabs from '@/components/account/AccountTabs';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AccountLayout>
      <AccountTabs />
      {children}
    </AccountLayout>
  );
}
