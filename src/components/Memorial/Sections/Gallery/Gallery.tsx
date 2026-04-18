// Album.tsx
import { useMemorial } from '@/context/memorial/MemorialContext';
import { useQuery } from "@tanstack/react-query";
import { getPhotoAlbumList } from "@/services/Memorial/Gallery/Gallery";
import { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface Photo {
  photoAlbumId: number;
  honoreeId: number;
  partnerId: number;
  title: string;
  url: string;
  sequence: number;
  createdBy: string;
  modifiedBy: string | null;
  commands: null;
}

// Skeleton loading component
const PhotoSkeleton = () => (
  <div className="bg-primary-light animate-pulse rounded-lg overflow-hidden aspect-square"></div>
);

const Gallery: React.FC = () => {
  const { currentMemorial } = useMemorial();
  const honoreeId = currentMemorial?.honoreeId;

  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const {
    data: photoAlbumResponse,
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: ['photos', honoreeId],
    queryFn: () => honoreeId ? getPhotoAlbumList(honoreeId) : Promise.resolve(null),
    enabled: !!honoreeId // Only run query if honoreeId exists
  });

  const photos = photoAlbumResponse?.data || [];

  const handlePrevious = () => {
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((selectedPhotoIndex - 1 + photos.length) % photos.length);
  };

  const handleNext = () => {
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((selectedPhotoIndex + 1) % photos.length);
  };

  return (
    <div className="bg-primary-light p-6 rounded-lg shadow-md">
      {/* Header Section */}
      <div className="px-4 py-8 md:px-8 md:py-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-primary mb-2">
              Photo Gallery
            </h1>
            <p className="text-lg" style={{ color: '#a0826d' }}>
              Memories in frames
            </p>
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {isLoading ? (
            // Skeleton Loading Grid
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <PhotoSkeleton key={i} />
              ))}
            </div>
          ) : isError ? (
            <div className="text-center py-12">
              <p style={{ color: '#a0826d' }}>Error loading photos: {error?.message}</p>
            </div>
          ) : photos.length === 0 ? (
            // Empty State
            <div className="py-20 text-center">
              <div className="mb-6">
                <svg className="w-24 h-24 mx-auto opacity-30" style={{ color: '#d4796f' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-serif mb-2" style={{ color: '#8b5a3c' }}>No Photos Yet</h3>
              <p style={{ color: '#a0826d' }}>Photos will appear here as they are added</p>
            </div>
          ) : (
            // Masonry Grid Layout
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 pb-12">
              {photos.map((photo, index) => (
                <div
                  key={photo.photoAlbumId}
                  onClick={() => setSelectedPhotoIndex(index)}
                  className="group cursor-pointer rounded-lg overflow-hidden aspect-square shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-102"
                  style={{
                    backgroundColor: '#e8d5c4',
                  }}
                >
                  <div className="relative w-full h-full overflow-hidden bg-gradient-to-br from-amber-100 to-rose-100">
                    <img
                      src={photo.url}
                      alt={photo.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      loading="lazy"
                    />
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition-opacity duration-300" />
                    
                    {/* Caption on hover */}
                    {photo.title && (
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p className="text-white text-sm font-medium">{photo.title}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Lightbox / Modal */}
      {selectedPhotoIndex !== null && photos.length > 0 && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-90"
          onClick={() => setSelectedPhotoIndex(null)}
        >
          {/* Close button */}
          <button
            onClick={() => setSelectedPhotoIndex(null)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
            aria-label="Close"
          >
            <X size={32} />
          </button>

          {/* Previous button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrevious();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors hover:scale-110 z-10"
            aria-label="Previous photo"
          >
            <ChevronLeft size={40} />
          </button>

          {/* Image container */}
          <div className="relative max-w-4xl max-h-[90vh] flex items-center justify-center">
            <img
              src={photos[selectedPhotoIndex]?.url}
              alt={photos[selectedPhotoIndex]?.title}
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Caption in lightbox */}
            {photos[selectedPhotoIndex]?.title && (
              <div className="absolute bottom-4 left-4 right-4 bg-black bg-opacity-70 text-white p-4 rounded-lg">
                <p className="text-center">{photos[selectedPhotoIndex].title}</p>
              </div>
            )}

            {/* Counter */}
            <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white px-4 py-2 rounded-lg text-sm font-medium">
              {selectedPhotoIndex + 1} / {photos.length}
            </div>
          </div>

          {/* Next button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors hover:scale-110 z-10"
            aria-label="Next photo"
          >
            <ChevronRight size={40} />
          </button>

          {/* Keyboard navigation hint */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-gray-400 text-xs">
            Press ESC to close
          </div>
        </div>
      )}

      {/* Add keyboard navigation */}
      {typeof window !== 'undefined' && selectedPhotoIndex !== null && (
        <script>
          {`
            document.addEventListener('keydown', (e) => {
              if (e.key === 'Escape') setSelectedPhotoIndex(null);
              if (e.key === 'ArrowLeft') handlePrevious();
              if (e.key === 'ArrowRight') handleNext();
            });
          `}
        </script>
      )}
    </div>
  );
};

export default Gallery;