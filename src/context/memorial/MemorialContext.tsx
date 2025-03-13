// contexts/MemorialContext.tsx
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { useMemo } from 'react';
import { useCallback } from 'react';
import { getHonoreeList } from '@/services/Memorial/Honoree';
interface Honoree {
  title: string;
  fullName: string;
  dateOfBirth: string;
  dateOfPassing: string;
  profilePicture: string;
  biography: string;
  partnerId: number;
  honoreeId: number;
  slug: string;
}

interface MemorialContextType {
  activeButton: string;
  setActiveButton: (button: string) => void;
  currentMemorial: Honoree | null;
  isMobileView: boolean;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  memorials: Honoree[]; 
  showFullHeader: boolean;
  setShowFullHeader: (show: boolean) => void;
}

const MemorialContext = createContext<MemorialContextType | undefined>(undefined);



export const MemorialProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { slug } = useParams();

  const [activeButton, setActiveButton] = useState("LIFE");
  const [isMobileView, setIsMobileView] = useState(false);
  const [showFullHeader, setShowFullHeader] = useState(true);

  const generateSlug = useCallback((fullName: string) => {
    return fullName
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')   
      .replace(/[^\w-]+/g, '') 
      .replace(/--+/g, '-')    
      .replace(/^-+/, '')      
      .replace(/-+$/, '');
  }, []);

  const {
    data: apiData,
    isLoading,
    isError,
    error
  } = useQuery(
    {
      queryKey: ['memorials'],
      queryFn: getHonoreeList,
      select: (data) => {
        if (!data) return [];
        return data.pageCollection.map(honoree => ({
          title: honoree.title,
          fullName: honoree.fullName,
          dateOfBirth: new Date(honoree.dateOfBirth).toLocaleDateString(),
          dateOfPassing: new Date(honoree.dateOfPassing).toLocaleDateString(),
          profilePicture: honoree.profilePicture,
          biography: honoree.biography,
          partnerId: honoree.partnerId,
          honoreeId: honoree.honoreeId,
          slug: generateSlug(honoree.fullName)
        }));
      },
      staleTime: 5 * 60 * 1000, 
      refetchOnWindowFocus: false,
    });

  const memorials = useMemo(() => apiData || [], [apiData]);

  const currentMemorial = useMemo(() => {
    return memorials.find(m => m.slug === slug || generateSlug(m.fullName) === slug) || null;

  }, [slug, memorials, generateSlug]);






  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobileView(mobile);
      if (mobile) {
        setShowFullHeader(activeButton === "LIFE");
      } else {
        setShowFullHeader(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeButton]);

  const handleSetActive = (button: string) => {
    setActiveButton(button);
    if (isMobileView) {
      setShowFullHeader(false);
    }
  };

  return (
    <MemorialContext.Provider
      value={{
        activeButton,
        setActiveButton: handleSetActive,
        currentMemorial,
        isLoading,
        isError,
        error,
        isMobileView,
        showFullHeader,
        memorials,
        setShowFullHeader
      }}
    >
      {children}
    </MemorialContext.Provider>
  );
};

export const useMemorial = () => {
  const context = useContext(MemorialContext);
  if (!context) {
    throw new Error('useMemorial must be used within a MemorialProvider');
  }
  return context;
};