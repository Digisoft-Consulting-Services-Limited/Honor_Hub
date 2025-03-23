import { useState, useEffect } from 'react';
import { useMemorial } from '@/context/memorial/MemorialContext';
import { useQuery } from "@tanstack/react-query";
import { getTributeList } from "@/services/Memorial/Tribute/Tribute";
const Tribute: React.FC = () => {
  const { currentMemorial } = useMemorial();
  const honoreeId = currentMemorial?.honoreeId;
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Reset to first page when memorial changes
  useEffect(() => {
    setCurrentPage(1);
  }, [honoreeId]);

  const {
    data: TributeResponse,
    isLoading,
    isFetching,
    error,
    isError
  } = useQuery({
    queryKey: ['tributes', honoreeId],
    queryFn: () => honoreeId ? 
      getTributeList(honoreeId ) : 
      Promise.resolve(null),
    enabled: !!honoreeId,
  });
  // console.log("Tribute Response:", TributeResponse);


  // Calculate pagination details
  const totalItems = TributeResponse?.data?.length || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Slice data for pagination
  const paginatedData = TributeResponse?.data?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  ) || [];
  

  if (isLoading) return <div>Loading Tributes...</div>;
  if (isError) return <div>Error: {error?.message}</div>;

  return (
    <div className="relative">
      {/* Tribute List */}
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 p-6">
        {paginatedData.map((tribute) => (
          <div
            key={tribute.tributeId}
            className="bg-primary-light p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="mb-6 border-b pb-4">
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
                {tribute.tributeBy}
              </h2>
            </div>
            <div className="space-y-4 text-gray-700">
              <p className="leading-relaxed text-justify text-sm md:text-base">
                {tribute.content}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalItems > itemsPerPage && (
        <div className="flex justify-center items-center gap-4 my-6">
          <button
            className="px-4 py-2 bg-gray-100 rounded-md disabled:opacity-50 hover:bg-gray-200 transition-colors"
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1 || isFetching}
          >
            Previous
          </button>
          
          <span className="text-gray-600">
            {currentPage} of {totalPages}
          </span>

          <button
            className="px-4 py-2 bg-gray-100 rounded-md disabled:opacity-50 hover:bg-gray-200 transition-colors"
            onClick={() => setCurrentPage(p => p + 1)}
            disabled={currentPage >= totalPages || isFetching}
          >
            Next
          </button>

          {isFetching && (
            <div className="text-gray-500 text-sm">
              Loading Tributes...
            </div>
          )}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && TributeResponse?.data?.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No tributes found for this memorial
        </div>
      )}
    </div>
  );
};

export default Tribute;