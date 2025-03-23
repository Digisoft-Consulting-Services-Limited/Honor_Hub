// Life.tsx
import { useMemorial } from '@/context/memorial/MemorialContext';
import { useQuery } from "@tanstack/react-query";
import { getEulogyList } from "@/services/Memorial/Eulogy/Eulogy";
import { useState, useEffect } from 'react';

const Life: React.FC = () => {
  const { currentMemorial } = useMemorial();
  const honoreeId = currentMemorial?.honoreeId;

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

      useEffect(() => {
        setCurrentPage(1);
      }, [honoreeId]);
    

  const { 
    data: eulogyResponse,
    isLoading,
    isError,
    isFetching,
    error
  } = useQuery({
    queryKey: ['eulogies', honoreeId],
    queryFn: () => honoreeId ? getEulogyList(honoreeId) : Promise.resolve(null),
    enabled: !!honoreeId // Only run query if honoreeId exists
  });

  if (isLoading) return <div>Loading eulogies...</div>;
  if (isError) return <div>Error: {error?.message}</div>;

  const totalItems = eulogyResponse?.data?.length || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Slice data for pagination
  const paginatedData = eulogyResponse?.data?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  ) || [];
  return (
    <div className="container mx-auto px-4 py-8">
      {paginatedData.map((eulogy) => (
        <div key={eulogy.eulogyId} className="bg-primary-light p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-primary mb-2">{eulogy.title}</h2>
          <p className="text-sm text-primary-text_black mb-4">
            {/* Add dates/author if available in API response */}
          </p>
          <p className="text-gray-700 mb-4 whitespace-pre-line">
            {eulogy.content}
          </p>
        </div>
      ))}

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
  );
};

export default Life;