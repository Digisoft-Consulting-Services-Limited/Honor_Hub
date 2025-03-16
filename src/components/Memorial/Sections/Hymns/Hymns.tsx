import { useMemorial } from '@/context/memorial/MemorialContext';
import { useQuery } from "@tanstack/react-query";
import { getHymnList } from "@/services/Memorial/Hymns/Hymn";
// import { hymnsData } from "@/data/MemorialSectionData/HymnData";

const Hymns: React.FC = () => {
  const { currentMemorial } = useMemorial();
  const honoreeId = currentMemorial?.honoreeId;

  const {
    data: HymnResponse,
    isLoading,
    error,
    isError
  } = useQuery({
    queryKey: ['hymns', honoreeId],

    queryFn: () => honoreeId ? getHymnList(honoreeId) : Promise.resolve(null),
    enabled: !!honoreeId

  })


  if (isLoading) return <div>Loading hymns...</div>;
  if (isError) return <div>Error: {error?.message}</div>;

  return (
    <div className="mx-auto px-10 py-8   bg-primary-light rounded-lg shadow-md">
      <h1 className="text-4xl font-bold text-center text-[#774936]">
        Hymns Collection
      </h1>
      <h2 className="text-lg text-gray-700 text-center mt-2">
        A Selection of Hymns
      </h2>
      <div className="space-y-6 mx-auto">
      {HymnResponse?.data?.map((hymn) => (
          <div
            key={hymn.honoreeSongId}
            className="bg-white rounded-md shadow-md p-6 border border-[#FBEAE0] hover:bg-[#F7D9C7] transition duration-300"
          >
            <h3 className="text-2xl font-bold text-[#774936] mb-2">
            {hymn.title}
            </h3>
            <p className="text-lg text-gray-800 mb-2">
             Artist: {hymn.artist}
            </p>
            <p className="whitespace-pre-line text-gray-800 text-lg">
              {hymn.lyrics}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hymns;
