'use client';

import { createContext, useContext, useMemo, useState } from 'react';
import {
  GalleryAdminItem,
  HymnAdminItem,
  LifeAdminItem,
  MemorialIdentity,
  ProgramAdminItem,
  StoryAdminItem,
  TributeAdminItem,
} from '@/types/Admin/memorial-admin';

interface MemorialAdminContextValue {
  identity: MemorialIdentity;
  setIdentity: React.Dispatch<React.SetStateAction<MemorialIdentity>>;
  life: LifeAdminItem;
  setLife: React.Dispatch<React.SetStateAction<LifeAdminItem>>;
  tributes: TributeAdminItem[];
  setTributes: React.Dispatch<React.SetStateAction<TributeAdminItem[]>>;
  stories: StoryAdminItem[];
  setStories: React.Dispatch<React.SetStateAction<StoryAdminItem[]>>;
  program: ProgramAdminItem;
  setProgram: React.Dispatch<React.SetStateAction<ProgramAdminItem>>;
  hymns: HymnAdminItem[];
  setHymns: React.Dispatch<React.SetStateAction<HymnAdminItem[]>>;
  gallery: GalleryAdminItem[];
  setGallery: React.Dispatch<React.SetStateAction<GalleryAdminItem[]>>;
  honoreeName: string;
}

const MemorialAdminContext = createContext<MemorialAdminContextValue | null>(null);

export function MemorialAdminProvider({ children }: { children: React.ReactNode }) {
  const [identity, setIdentity] = useState<MemorialIdentity>({
    firstName: 'Lisa',
    lastName: 'Luu Luu',
    birthDate: '2001-02-02',
    passingDate: '',
    shortMessage: 'Let the memory of Lisa be with us forever.',
    profileImage: '/img/honorhub_logo.jpg',
    coverImage: '/img/candle.png',
  });

  const [life, setLife] = useState<LifeAdminItem>({
    quote: 'Let the memory of Lisa be with us forever.',
    biography: 'This memorial website was created in memory of our loved one.',
  });

  const [tributes, setTributes] = useState<TributeAdminItem[]>([
    { id: 1, author: 'Family', message: 'Your love and light remain with us every day.' },
  ]);

  const [stories, setStories] = useState<StoryAdminItem[]>([
    {
      id: 1,
      title: 'A life remembered',
      body: 'A gentle place to collect longer memories and eulogies.',
      hidden: false,
    },
  ]);

  const [program, setProgram] = useState<ProgramAdminItem>({
    eventTitle: 'Celebration of Life',
    dateTime: '',
  });

  const [hymns, setHymns] = useState<HymnAdminItem[]>([
    {
      id: 1,
      title: 'Nearer, My God, to Thee',
      artist: 'Traditional',
      notes: 'Add lyrics, audio notes, or service notes here.',
    },
  ]);

  const [gallery, setGallery] = useState<GalleryAdminItem[]>([
    {
      id: 1,
      title: 'Profile memory',
      imageUrl: '/img/memorial.webp',
      hidden: false,
    },
  ]);

  const honoreeName = useMemo(
    () => `${identity.firstName} ${identity.lastName}`.trim() || 'Untitled Memorial',
    [identity.firstName, identity.lastName]
  );

  const value = {
    identity,
    setIdentity,
    life,
    setLife,
    tributes,
    setTributes,
    stories,
    setStories,
    program,
    setProgram,
    hymns,
    setHymns,
    gallery,
    setGallery,
    honoreeName,
  };

  return <MemorialAdminContext.Provider value={value}>{children}</MemorialAdminContext.Provider>;
}

export function useMemorialAdmin() {
  const context = useContext(MemorialAdminContext);
  if (!context) {
    throw new Error('useMemorialAdmin must be used within MemorialAdminProvider');
  }
  return context;
}
