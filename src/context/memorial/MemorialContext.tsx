// contexts/MemorialContext.tsx
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface deceasedName {
  slug: string;
  name: string;
  imageUrl: string;
  years: string;
}

interface MemorialContextType {
  activeButton: string;
  setActiveButton: (button: string) => void;
  currentMemorial: deceasedName | null;
  loadMemorial: (slug: string) => void;
  isMobileView: boolean;
  isLoading: boolean;
  memorials: deceasedName[]; // Add this

  showFullHeader: boolean;
  setShowFullHeader: (show: boolean) => void;
}

const MemorialContext = createContext<MemorialContextType | undefined>(undefined);

// Sample memorial data
const initialMemorials: deceasedName[] = [
  {
    slug: 'Heri-Wonder-Ochieng',
    name: "Heri Wonder Ochieng",
    imageUrl: "/img/heri.png",
    years: "29/01/2019-23/02/2025"
  },

  // Add more memorials as needed
];

export const MemorialProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const [activeButton, setActiveButton] = useState("LIFE");
  const [isMobileView, setIsMobileView] = useState(false);
  const [showFullHeader, setShowFullHeader] = useState(true);
  const [currentMemorial, setCurrentMemorial] = useState<deceasedName | null>(null);
  const [memorials] = useState<deceasedName[]>(initialMemorials);

  // Load memorial based on slug
  const loadMemorial = (slug: string) => {
    setIsLoading(true);
    console.log("Looking for memorial with slug:", slug); // Debugging output

    const found = memorials.find(m => m.slug === slug);
    if (found) {
        console.log("Memorial found:", found); // Debugging output
    } else {
        console.log("No memorial found for slug:", slug);
    }

    setCurrentMemorial(found || null);
    setIsLoading(false);
};


  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobileView(mobile);
      if (mobile) {
        setShowFullHeader(activeButton === "LIFE" );
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
        loadMemorial,
        isLoading,
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