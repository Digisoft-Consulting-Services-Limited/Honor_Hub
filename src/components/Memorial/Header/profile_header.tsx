// ProfileHeader.tsx
import { useMemorial } from '@/context/memorial/MemorialContext';

const ProfileHeader: React.FC = () => {
  const { profile } = useMemorial();

  return (
    <div className="bg-[url('/img/candle.png')] bg-cover bg-center lg:h-screen/2 text-white relative">
      <div className="absolute top-0 left-0 w-full h-full bg-black/20"></div>
      <div className="container mx-auto px-6 lg:py-20 flex flex-col items-center text-center h-full relative lg:flex-row lg:justify-between lg:items-center">
        <div className="flex flex-col lg:text-center py-6">
          <h1 className="text-3xl lg:text-5xl font-medium lg:font-semibold p-3 lg:p-5">
            {profile.name}
          </h1>
          <p className="text-xl lg:text-3xl mt-1 lg:mt-2">
            {profile.years}
          </p>
        </div>
        <div className="relative  lg:absolute lg:right-20 lg:top-1/2 lg:transform lg:-translate-y-1/2 mb-20 sm:mb-10 lg:mb-10">
          <div className="overflow-hidden rounded-lg border-4 border-white lg:w-50 w-40 h-48  lg:h-64  sm:w-48 sm:h-56">
            <img
              src={profile.imageUrl}
              alt={`${profile.name}'s Profile`}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};


export default ProfileHeader