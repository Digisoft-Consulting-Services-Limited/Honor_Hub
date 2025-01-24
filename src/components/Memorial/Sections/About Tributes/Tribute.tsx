import { TributeData } from "../../../../data/MemorialSectionData/Tribute";

const Tribute: React.FC = () => {
  return (
    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 p-6">
      {TributeData.map((tribute, index) => (
        <div
          key={index}
          className="bg-primary-light p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          {/* Header Section */}
          <div className="mb-6 border-b pb-4">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
              {tribute.name}
            </h2>
            <p className="text-gray-500 text-sm mt-2">{tribute.date}</p>
          </div>

          {/* Message Content */}
          <div className="space-y-4 text-gray-700">
            {tribute.message.map((item, msgIndex) => (
              <p
                key={msgIndex}
                className="leading-relaxed text-justify text-sm md:text-base"
              >
                {item}
              </p>
            ))}
          </div>

          {/* Share Button */}
          <div className="mt-8 flex justify-end">
            <button className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                />
              </svg>
              <span className="text-sm font-medium">Share</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Tribute;
