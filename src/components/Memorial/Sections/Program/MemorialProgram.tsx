import { useMemorial } from '@/context/memorial/MemorialContext';
import { useQuery } from "@tanstack/react-query";
import { getProgramList } from "@/services/Memorial/Program/Program";

const MemorialProgram: React.FC = () => {
  const { currentMemorial } = useMemorial();
  const honoreeId = currentMemorial?.honoreeId;

  const {
    data: programResponse,
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: ['programs', honoreeId],
    queryFn: () => honoreeId ? getProgramList(honoreeId) : Promise.resolve(null),
    enabled: !!honoreeId
  });

  if (isLoading) return <div>Loading eulogies...</div>;
  if (isError) return <div>Error: {error?.message}</div>;

  const formatToLocalTime = (time: string) => {
    const date = new Date(time);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedTime = `${hours % 12 || 12}:${minutes < 10 ? `0${minutes}` : minutes}`;
    return { formattedTime, period };
  };

  return (
    <div className="mx-auto px-4 py-8 bg-primary-light rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Memorial Program
      </h2>

      <div className="relative">
        <div className="absolute left-4 top-0 w-1 h-full bg-primary-light transform -translate-x-1/2"></div>

        {programResponse?.data.map((program) => {
          const { formattedTime: startTime, period: startPeriod } = formatToLocalTime(program.startTime);
          const { formattedTime: endTime, period: endPeriod } = formatToLocalTime(program.endTime);

          return (
            <div
              key={program.honoreeProgramId}
              className="relative pl-16 mb-8 last:mb-0 group"
            >
              <div className="absolute left-0 top-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-medium">
                {programResponse.data.indexOf(program) + 1}
              </div>

              <div className="bg-primary-hover_light p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border-l-4 border-primary">
              <h3 className="text-xl font-semibold text-gray-800">
                    {program.title}
                  </h3>
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-sm font-light text-gray-700">
                    {startTime} {startPeriod} - {endTime} {endPeriod}
                  </span>
                
                </div>
               

                <p className="text-gray-600 pl-2 border-l-2 border-gray-200 ml-4">
                  <span className="block mb-2">
                    {program.description}
                  </span>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MemorialProgram;
