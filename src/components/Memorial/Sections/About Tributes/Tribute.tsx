import { useState, useEffect } from 'react';
import { useMemorial } from '@/context/memorial/MemorialContext';
import { useQuery } from "@tanstack/react-query";
import AddTributeEditor from './AddTribute'; // Import the modal component

import { getTributeList } from "@/services/Memorial/Tribute/Tribute";
const Tribute: React.FC = () => {
  const [isEditorOpen, setEditorOpen] = useState(false);

  const openEditor = () => setEditorOpen(true);
  const closeEditor = () => setEditorOpen(false);
  const { currentMemorial } = useMemorial();
  const honoreeId = currentMemorial?.honoreeId;
  const fullName = currentMemorial?.fullName;
  
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
  const sortedData = TributeResponse?.data
  ?.slice() // make a shallow copy to avoid mutating original data
  ?.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) || [];

// Then paginate
const paginatedData = sortedData.slice(
  (currentPage - 1) * itemsPerPage,
  currentPage * itemsPerPage
);
  

  if (isLoading) return <div>Loading Tributes...</div>;
  if (isError) return <div>Error: {error?.message}</div>;

  return (
    <div className="relative">
<div className="hidden md:flex items-center justify-between bg-primary-hover_light border border-[#E7DCD2] rounded-xl px-6 py-5 mb-6">
  <p className="text-[#3E2B1C] text-lg font-medium">
    Share a special moment from {fullName}&apos;s life.
  </p>
  <button
    onClick={openEditor}
    className="flex items-center gap-2 border border-[#A1887F] text-[#5E2B1B] px-5 py-2 rounded-lg hover:bg-[#f5ece4] transition-colors duration-200"
  >
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
      />
    </svg>
    <span className="font-medium">Write a tribute</span>
  </button>
</div>

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
<div className="fixed bottom-5 left-5 md:hidden z-50">
  <button
    onClick={openEditor}
    className="flex items-center gap-2 bg-[#5E2B1B] text-white px-5 py-3 rounded-full shadow-lg hover:bg-[#4b2013] transition-all duration-300"
  >
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
      />
    </svg>
    <span className="text-sm font-medium">Share a Tribute</span>
  </button>
</div>




      {/* Add Tribute Editor Modal */}
      <AddTributeEditor isOpen={isEditorOpen} onClose={closeEditor} />
    </div>
  );
};

export default Tribute;