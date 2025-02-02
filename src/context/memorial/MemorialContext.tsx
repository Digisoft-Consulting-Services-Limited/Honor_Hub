// contexts/MemorialContext.tsx
import  { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface MemorialContextType {
  activeButton: string;
  setActiveButton: (button: string) => void;
  profile: {
    name: string;
    imageUrl: string;
    years: string;
  };
  isMobileView: boolean;
  showFullHeader: boolean;
  setShowFullHeader: (show: boolean) => void;
}

const MemorialContext = createContext<MemorialContextType | undefined>(undefined);

export const MemorialProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [activeButton, setActiveButton] = useState("LIFE");
  const [isMobileView, setIsMobileView] = useState(false);
  const [showFullHeader, setShowFullHeader] = useState(true);

  const profile = {
    name: "Juhudi Khamisi Lugo",
    imageUrl: "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg",
    years: "1990 - 2024"
  };

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
        profile,
        isMobileView,
        showFullHeader,
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

export default MemorialProvider