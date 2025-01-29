import { useState } from 'react';
import { TributeData } from "../../../../data/MemorialSectionData/Tribute";
import AddTributeEditor from './AddTribute'; // Import the modal component

const Tribute: React.FC = () => {
  const [isEditorOpen, setEditorOpen] = useState(false);

  const openEditor = () => setEditorOpen(true);
  const closeEditor = () => setEditorOpen(false);

  return (
    <div className="relative">
      {/* Add Tribute Button for Large Screens */}
      <div className="hidden md:block  flex items-center justify-between bg-primary-light p-4 rounded-md">
  <p className="text-primary-text_black font-medium">
    Share a special moment from JUHUDI's life.
  </p>
  <button
    onClick={openEditor}
    className="flex items-center gap-2 border border-primary-text_black text-primary-text_black px-4 py-2 rounded-md hover:bg-primary-hover_light transition-colors"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 4v16m8-8H4"
      />
    </svg>
    Write a story
  </button>
</div>


      {/* List of Tributes */}
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
          </div>
        ))}
      </div>

      {/* Pencil Icon for Small Screens */}
      <div className="fixed bottom-4 right-4 md:hidden">
        <button
          onClick={openEditor}
          className="p-3 bg-primary text-primary-light rounded-full shadow-lg hover:bg-primary-hover_light transition-colors"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
        </button>
      </div>

      {/* Add Tribute Editor Modal */}
      <AddTributeEditor isOpen={isEditorOpen} onClose={closeEditor} />
    </div>
  );
};

export default Tribute;