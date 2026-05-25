import { AccountMemorial, AccountProfile } from '@/types/Admin/account';

export async function getAccountMemorials(): Promise<AccountMemorial[]> {
  return [{ id: 1, name: 'Lisa Luu Luu', slug: 'lisa-luu-luu', plan: 'Free', status: 'Draft' }];
}

export async function saveAccountProfile(profile: AccountProfile) {
  return profile;
}
