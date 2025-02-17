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
import { useEffect  } from 'react';
import { useParams } from "react-router-dom";



const Memorial: React.FC = () => {
  const { slug } = useParams<{ slug: string }>(); // Get slug from URL
  console.log("Params object:", slug); // Debugging


    

  const { 
    activeButton, 
    currentMemorial, 
    isLoading,
    showFullHeader,
    loadMemorial
  } = useMemorial();

  
  useEffect(() => {
    if (slug) {
        console.log("Loading memorial for slug:", slug);
        loadMemorial(slug);
    }
}, [slug, loadMemorial]);
  
if (isLoading) return <p className="text-center text-lg text-gray-600">Loading memorial...</p>;

if (!currentMemorial) return (
  <p className="text-center text-lg text-red-500">
    Memorial not found. Please check the URL or try again later.
  </p>
);


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
        imageUrl="https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg"
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




