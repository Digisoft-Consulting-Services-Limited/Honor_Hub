
interface ProfileHeaderProps {
  name: string;
  years: string;
  imageUrl: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ name, years, imageUrl }) => {
  return (
    <header className="relative bg-gradient-to-b from-black to-gray-800 text-white">
      <div className="container mx-auto px-6 py-12 flex flex-col items-center text-center">
        <div className="absolute top-0 left-0 w-full h-full bg-black/50"></div>

        <h1 className="text-4xl font-bold z-10">{name}</h1>
        <p className="text-2xl mt-2 z-10">{years}</p>

        <div className="rounded-full overflow-hidden border-4 border-white mt-6 w-32 h-32 z-10">
          <img src={imageUrl} alt={`${name}'s Profile`} className="w-full h-full object-cover" />
        </div>
      </div>
    </header>
  );
};

export default ProfileHeader;
