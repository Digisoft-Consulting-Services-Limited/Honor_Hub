import { useMemorial } from '@/context/memorial/MemorialContext';
import { useQuery } from "@tanstack/react-query";
import { getHymnList } from "@/services/Memorial/Hymns/Hymn";
import { useState } from 'react';
import { useEffect } from 'react';
const Hymns: React.FC = () => {
  const { currentMemorial } = useMemorial();
  const honoreeId = currentMemorial?.honoreeId;
   const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
   

  useEffect(() => {
      setCurrentPage(1);
    }, [honoreeId]);


  const {
    data: HymnResponse,
    isLoading,
    isFetching,
    error,
    isError
  } = useQuery({
    queryKey: ['hymns', honoreeId],

    queryFn: () => honoreeId ? getHymnList(honoreeId) : Promise.resolve(null),
    enabled: !!honoreeId

  })

  const totalItems = HymnResponse?.data?.length || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Slice data for pagination
  const paginatedData = HymnResponse?.data?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  ) || [];
  

  if (isLoading) return <div>Loading hymns...</div>;
  if (isError) return <div>Error: {error?.message}</div>;

  return (
    <>
    <div className="mx-auto px-10 py-8   bg-primary-light rounded-lg shadow-md">
      <h1 className="text-4xl font-bold text-center text-[#774936]">
        Hymns Collection
      </h1>
      <h2 className="text-lg text-gray-700 text-center mt-2">
        A Selection of Hymns
      </h2>
      <div className="space-y-6 mx-auto">
      {paginatedData.map((hymn) => (
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


      {totalItems > itemsPerPage && (
        <div className="flex justify-center items-center gap-4 my-6">
            <button
            className="px-4 py-2 bg-gray-100 rounded-md disabled:opacity-50 hover:bg-gray-200 transition-colors"
            onClick={() => setCurrentPage((p: number) => Math.max(1, p - 1))}
            disabled={currentPage === 1 || isFetching}
            >
            Previous
            </button>
          
          <span className="text-gray-600">
            {currentPage} of {totalPages}
          </span>

          <button
            className="px-4 py-2 bg-gray-100 rounded-md disabled:opacity-50 hover:bg-gray-200 transition-colors"
            onClick={() => setCurrentPage((p:number) => p + 1)}
            disabled={currentPage >= totalPages || isFetching}
          >
            Next
          </button>

          {isFetching && (
            <div className="text-gray-500 text-sm">
              Loading Hymns...
            </div>
          )}
        </div>
      )}

    </div>
        </>

  );
};

export default Hymns;
