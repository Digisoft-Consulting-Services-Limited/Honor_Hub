// Middle_Navbar.tsx
import { useMemorial } from '@/context/memorial/MemorialContext';

const Middle_Navbar: React.FC = () => {
  const { 
    activeButton, 
    setActiveButton, 
    isMobileView, 
    currentMemorial, 
    setShowFullHeader 
  } = useMemorial();

  const handleBack = () => {
    setActiveButton("LIFE");
    setShowFullHeader(true);
  };

  return (
    <nav className="bg-primary text-primary-light">
      {isMobileView ? (
        activeButton === "LIFE" ? (
          // Show all tabs when LIFE is active
          <div className="flex-row items-center  p-4">
            {["LIFE", "PROGRAM", "TRIBUTES", "HYMNS"].map((item) => (
              <button
                key={item}
                onClick={() => setActiveButton(item)}
                className={`p-2 justify-between flex-1 min-w-[80px] sm:min-w-[120px] rounded-md font-medium transition-all duration-200 text-center ${
                  activeButton === item
                    ? "text-primary bg-primary-hover_light"
                    : "text-white hover:text-primary hover:bg-primary-hover_light"
                } whitespace-nowrap`}
              >
                {item}
              </button>
            ))}
          </div>
        ) : (
          // Show back button and image when other tabs are active
          <div className="flex items-center justify-between p-4">
            <button onClick={handleBack} className="text-white hover:text-primary-hover_light">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="flex items-center">
              <img 
                src={currentMemorial?.imageUrl || "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg"} 
                alt={currentMemorial?.name || "Memorial"} 
                className="w-8 h-8 rounded-full object-cover mr-2 border-2 border-white"
              />
              <span className="text-white font-medium">{activeButton}</span>
            </div>
            <div className="w-6"></div>
          </div>
        )
      ) : (
        // Original desktop view
        <div className="relative">
        <div className="flex overflow-x-auto p-4 gap-2 justify-center">
          {["LIFE", "PROGRAM", "TRIBUTES", "HYMNS"].map((item) => (
            <button
              key={item}
              onClick={() => setActiveButton(item)}
              className={`p-2 rounded-md font-medium transition-all duration-200 ${
                activeButton === item
                  ? "text-primary bg-primary-hover_light"
                  : "text-white hover:text-primary hover:bg-primary-hover_light"
              } whitespace-nowrap`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      )}
    </nav>
  );
};

export default Middle_Navbar;