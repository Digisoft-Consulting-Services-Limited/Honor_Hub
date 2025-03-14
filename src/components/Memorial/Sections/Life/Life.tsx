// Life.tsx
import { useMemorial } from '@/context/memorial/MemorialContext';
import { useQuery } from "@tanstack/react-query";
import { getEulogyList } from "@/services/Memorial/Eulogy/Eulogy";

const Life: React.FC = () => {
  const { currentMemorial } = useMemorial();
  const honoreeId = currentMemorial?.honoreeId;

  const { 
    data: eulogyResponse,
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: ['eulogies', honoreeId],
    queryFn: () => honoreeId ? getEulogyList(honoreeId) : Promise.resolve(null),
    enabled: !!honoreeId // Only run query if honoreeId exists
  });

  if (isLoading) return <div>Loading eulogies...</div>;
  if (isError) return <div>Error: {error?.message}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      {eulogyResponse?.data?.map((eulogy) => (
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
    </div>
  );
};

export default Life;