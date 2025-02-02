// Memorial.tsx
import  { useMemorial }  from '@/context/memorial/MemorialContext';
import  Middle_Navbar from '@/components/Memorial/MiddleNavbar/MiddleNavbar';
import ProfileHeader from '@/components/Memorial/Header/profile_header';
import Memorial_Navbar from '@/components/Memorial/Header/memorial_navbar';
import Tribute from '@/components/Memorial/Sections/About Tributes/Tribute';
import Life from '@/components/Memorial/Sections/Life/Life';
import Gallery from '@/components/Memorial/Sections/Gallery/Gallery';
import Story from '@/components/Memorial/Sections/Stories/Story';
import MemorialProgram from '@/components/Memorial/Sections/Program/MemorialProgram';
import Hymns from '@/components/Memorial/Sections/Hymns/Hymns';



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

      <div className="">
        <Middle_Navbar />
      </div>

      <div className="container mx-auto px-6 py-12 flex">
        {renderPageContent()}
        {/* <SecondColumn /> */}
      </div>
    </>
  );
};


export default Memorial