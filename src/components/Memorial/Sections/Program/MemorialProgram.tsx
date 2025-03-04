// components/MemorialProgram.tsx
import { programData } from "@/data/MemorialSectionData/Program";  // Import your data

const MemorialProgram: React.FC = () => {
  return (
    <div className=" mx-auto px-4 py-8   bg-primary-light rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Memorial Program
      </h2>
      
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 top-0 w-1 h-full  bg-primary-light transform -translate-x-1/2"></div>

        {programData.map((event, index) => (  // Type is inferred from programData's type
          <div 
            key={index}
            className="relative pl-16 mb-8 last:mb-0 group"
          >
            {/* Timeline dot */}
            <div className="absolute left-0 top-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-medium">
              {index + 1}
            </div>

            {/* Event content */}
            <div className="bg-primary-hover_light  p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border-l-4 border-primary">
              <div className="flex items-center gap-4 mb-2">
                <span className="text-lg font-semibold text-gray-700">
                  {event.time}
                </span>
                <h3 className="text-xl font-semibold text-gray-800">
                  {event.title}
                </h3>
              </div>
              
              {event.description && (
                <p className="text-gray-600 pl-2 border-l-2 border-gray-200 ml-4">
                  {event.description.map((item, index) => (
                    <span key={index} className="block mb-2">
                      {item}
                    </span>
                  ))}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemorialProgram;