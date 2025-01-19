
import { Middle_Navbar, ProfileHeader,Memorial_Navbar } from "../components/memorial";

const Memorial: React.FC = () => {
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
      <Middle_Navbar />

      {/* Memorial Content */}
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-center">Memorial Page</h1>
        <p className="text-lg text-center mt-4">
          This page is dedicated to the life and memories of Juhudi Khamisi Lugo.
        </p>
      </div>
    </>
  );
};

export default Memorial;
