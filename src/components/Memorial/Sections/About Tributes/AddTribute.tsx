import { useMemorial } from '@/context/memorial/MemorialContext';
import { useState } from 'react';
import { useCreateTribute } from "@/hooks/memorialHooks/useCreateTribute";


interface AddTributeEditorProps {
  isOpen: boolean;
  onClose: () => void;
}


const AddTributeEditor: React.FC<AddTributeEditorProps> = ({
  isOpen,
  onClose,


}) => {
  const { currentMemorial } = useMemorial();
  const honoreeId = currentMemorial?.honoreeId;

  const [content, setContent] = useState<string>("");
  const [tributeBy, setTributeBy] = useState<string>("");
  // const [ createdBy, setCreatedBy ] = useState<string>("");
  const { mutate: createTribute } = useCreateTribute();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!honoreeId) {
      console.error("No honoree ID available");
      return;
    }

    createTribute({

      honoreeId,
      partnerId: "31613064951889920",
      content: content,
      tributeBy: tributeBy,
      createdBy: "guest",
      modifiedBy: "salome",
    },
      {
        onSuccess: () => {
          onClose();

          setContent("");
          setTributeBy("");

          console.log("Tribute created successfully");
        },
        onError: (error) => {
          console.error("Error creating tribute:", error);
        },
      },
    )

  }



if (!isOpen) return null;

return (
  <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
    <div className="bg-primary-light_yellow p-8 rounded-lg shadow-lg w-11/12 md:w-96">
      <h2 className="text-xl font-semibold mb-4">🕊️ Create a Tribute</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-primary-text_black">Tribute By</label>
          <input
            type="text"
            value={tributeBy}
            onChange={(e) => setTributeBy(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#a1887f] transition-all"
            placeholder="Enter your name"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-primary-text_black">Content</label>
          <textarea
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#a1887f] transition-all"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your tribute here..."
            required
            rows={4}
          ></textarea>
        </div>
        {/* <div className="mb-4">
            <label className="block text-sm font-medium text-primary-text_black">Add Media</label>
            <input
              type="file"
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-primary-text_black hover:file:bg-primary-hover_light"
            />
          </div> */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onClose}
            className="bg-red-400 text-white py-2 px-4  hover:text-primary-text_black rounded-md transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-hover_light hover:text-primary-text_black transition-colors"
          >
          </button>
        </div>
      </form>
    </div>
  </div>
);
};

export default AddTributeEditor;