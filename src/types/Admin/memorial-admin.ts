export interface MemorialIdentity {
  firstName: string;
  lastName: string;
  birthDate: string;
  passingDate: string;
  shortMessage: string;
  profileImage: string;
  coverImage: string;
}

export interface LifeAdminItem {
  quote: string;
  biography: string;
 }

export interface TributeAdminItem {
  id: number;
  author: string;
  message: string;
}

export interface StoryAdminItem {
  id: number;
  title: string;
  body: string;
  hidden: boolean;
}

export interface ProgramAdminItem {
  eventTitle: string;
  dateTime: string;
}

export interface HymnAdminItem {
  id: number;
  title: string;
  artist: string;
  notes: string;
}

export interface GalleryAdminItem {
  id: number;
  title: string;
  imageUrl: string;
  hidden: boolean;
}

export interface MemorialAdminState {
  identity: MemorialIdentity;
  life: LifeAdminItem;
  tributes: TributeAdminItem[];
  stories: StoryAdminItem[];
  program: ProgramAdminItem;
  hymns: HymnAdminItem[];
  gallery: GalleryAdminItem[];
}
