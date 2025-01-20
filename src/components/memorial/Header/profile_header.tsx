
interface ProfileHeaderProps {
  name: string;
  years: string;
  imageUrl: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ name, years, imageUrl }) => {
  return (
<div
  className="bg-[url('/img/candle.png')] bg-cover bg-center lg:h-screen/2 text-white relative"
>
  {/* Overlay */}
  <div className="absolute top-0 left-0 w-full h-full bg-black/20"></div>

  <div className="container mx-auto px-6 lg:py-20 flex flex-col items-center text-center h-full relative lg:flex-row lg:justify-between lg:items-center">
    {/* Content */}
      <div className=" flex flex-col lg:text-center py-6">
        <h1 className="text-5xl font-semibold p-5">{name}</h1>
        <p className="text-3xl mt-2">{years}</p>
      </div>

    {/* Profile Image */}
    <div
      className={`relative z-20 ${
        "lg:absolute  lg:right-20 lg:top-1/2 lg:transform lg:-translate-y-1/2"
      } -mb-20 sm:-mb-20 lg:mb-10`}
    >
      <div
        className="overflow-hidden rounded-lg border-4 border-white w-50 h-64"
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
