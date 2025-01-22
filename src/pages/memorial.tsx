// Memorial.tsx
import { useMemorial } from '../context/memorial/memorialcontext';
import { Middle_Navbar, ProfileHeader, Memorial_Navbar, Tribute, Story, Life, Gallery, SecondColumn, MemorialProgram, Hymns } from "../components/Memorial";

const Memorial: React.FC = () => {
  const { 
    activeButton, 
    profile, 
    showFullHeader 
  } = useMemorial();

  const renderPageContent = () => {
    switch(activeButton) {
      case "TRIBUTES": return <Tribute />;
      case "LIFE": return <Life />;
      case "GALLERY": return <Gallery />;
      case "STORIES": return <Story />;
      case "PROGRAM": return <MemorialProgram />;
      case "HYMNS": return <Hymns />;
      default: return <Tribute />;
    }
  };

  return (
    <>
      <Memorial_Navbar 
        name='sally'
        imageUrl={profile.imageUrl}
      />

      {showFullHeader && (
        <ProfileHeader />
      )}

      <div className="lg:mt-0 md:mt-20 sm:mt-20">
        <Middle_Navbar />
      </div>

      <div className="container mx-auto px-6 py-12 flex">
        {renderPageContent()}
        <SecondColumn />
      </div>
    </>
  );
};


export default Memorial