
import { Middle_Navbar, ProfileHeader,Memorial_Navbar,Tribute,Story,Life,Gallery,SecondColumn } from "../components/Memorial";
import { useState } from "react";

const Memorial: React.FC = () => {
  const [activeButton, setActiveButton] = useState<string>("TRIBUTE");

  const renderPageContent = () => {
    
    switch(activeButton){
      case "TRIBUTE":
        return <Tribute/>
      case "LIFE":
        return <Life/>
      case "GALLERY":
        return <Gallery/>
      case "STORIES":
        return <Story/>
      default:
        return <Tribute/>
    }

  }
  return (
    <>
    {/* Memorial Navbar  */}
      <Memorial_Navbar 
      name='sally'
      imageUrl="https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      />

      {/* Profile Header */}
      <ProfileHeader
        name="Juhudi Khamisi Lugo"
        years="1990 - 2024"
        imageUrl="https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      />

      {/* Navbar */}
      <div className="lg:mt-0 md:mt-20 sm:mt-20">
        <Middle_Navbar 
          activeButton={activeButton} 
          setActiveButton={setActiveButton} 
        />
      </div>

      {/* Conditional Memorial Content Based on Active Button */}
      <div className="container mx-auto px-6 py-12 flex sm:flex-col">
  {renderPageContent()}
  <SecondColumn  />
      </div>
    </>
  );
};

export default Memorial;
