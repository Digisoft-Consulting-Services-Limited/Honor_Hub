
import { Middle_Navbar, ProfileHeader } from "../components/memorial";

const Memorial: React.FC = () => {
  return (
    <div>
      {/* Profile Header */}
      <ProfileHeader
        name="Juhudi Khamisi Lugo"
        years="1990 - 2024"
        imageUrl="https://example.com/path-to-image.jpg"
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
    </div>
  );
};

export default Memorial;
