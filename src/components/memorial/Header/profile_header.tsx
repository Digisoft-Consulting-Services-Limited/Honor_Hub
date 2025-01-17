
interface ProfileHeaderProps {
  name: string;
  years: string;
  imageUrl: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ name, years, imageUrl }) => {
  return (
<div
  className="bg-[url('/img/candle.png')] bg-cover bg-center   lg:h-screen/4  text-white "
>
  <div className="container mx-auto px-6 py-7 flex flex-col items-center text-center h-full relative lg:flex-row lg:items-center lg:space-x-20">
    {/* Overlay */}
    <div className="absolute top-0 left-0 w-full h-full bg-black/20"></div>

    {/* Content */}
      
    <div className="z-20 flex flex-col lg:items-start lg:text-center py-12 lg:py-0">
      <h1 className="text-4xl font-bold">{name}</h1>
      <p className="text-2xl mt-2">{years}</p>
    </div>

    {/* Profile Image */}
    <div className="relative ">

    <div
      className="
      rounded-lg overflow-hidden border-4 border-white w-50 h-64 sm:w-50 sm:h-64 lg:w-50 lg:h-66 z-10 relative -mb-20 sm:-mb-20 lg:mb-0"
      >
      <img
        src={imageUrl}
        alt={`${name}'s Profile`}
        className="w-full h-full object-cover"
        />
    </div>
        </div>
        </div>
  </div>



  );
};

export default ProfileHeader;
