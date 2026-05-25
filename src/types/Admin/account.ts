export interface AccountMemorial {
  id: number;
  name: string;
  slug: string;
  plan: string;
  status: 'Draft' | 'Published';
}

export interface AccountProfile {
  fullName: string;
  email: string;
}
