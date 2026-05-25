// Memorial Profile
export interface Memorial {
  id: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  deathDate: string;
  biography: string;
  profileImage?: string;
  coverImage?: string;
  slug: string;
  visibility: 'public' | 'unlisted' | 'private';
  status: 'draft' | 'published' | 'archived';
  createdAt: string;
  updatedAt: string;
}

// Tribute
export interface Tribute {
  id: string;
  memorialId: string;
  authorName: string;
  authorEmail?: string;
  content: string;
  status: 'pending' | 'published' | 'rejected' | 'hidden';
  createdAt: string;
  updatedAt: string;
}

// Story/Eulogy
export interface Story {
  id: string;
  memorialId: string;
  title: string;
  content: string;
  authorName?: string;
  mediaUrl?: string;
  featured: boolean;
  status: 'draft' | 'published' | 'hidden';
  createdAt: string;
  updatedAt: string;
}

// Program/Service
export interface Program {
  id: string;
  memorialId: string;
  eventTitle: string;
  date: string;
  time: string;
  venue?: string;
  address?: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

// Hymn
export interface Hymn {
  id: string;
  memorialId: string;
  title: string;
  artist: string;
  lyrics?: string;
  audioUrl?: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}
