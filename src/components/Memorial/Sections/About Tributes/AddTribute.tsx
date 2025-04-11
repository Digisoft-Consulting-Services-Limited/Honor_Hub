import { useMemorial } from '@/context/memorial/MemorialContext';
import { useState } from 'react';
import { useCreateTribute } from "@/hooks/memorialHooks/useCreateTribute";
import useSubmitWithToast from "@/hooks/notification/useSubmitWithToast";
import { useQueryClient } from "@tanstack/react-query";
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
  const { isSubmitting, handleSubmitTribute } = useSubmitWithToast();
  const [content, setContent] = useState<string>("");
  const [tributeBy, setTributeBy] = useState<string>("");
  const { mutateAsync: createTribute } = useCreateTribute();
  const queryClient = useQueryClient();

  const onSubmit = async () => {
    if (!honoreeId) throw new Error("No honoree ID available");

    await createTribute({
      honoreeId,
      partnerId: "31613064951889920",
      content,
      tributeBy,
      createdBy: "guest",
      modifiedBy: "salome",
    });
    
    queryClient.invalidateQueries({ queryKey: ['tributes', honoreeId] });

    setContent("");
    setTributeBy("");
    onClose();
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmitTribute(onSubmit);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-primary-light_yellow p-8 rounded-lg shadow-lg w-11/12 md:w-96">
        <h2 className="text-xl font-semibold mb-4">🕊️ Create a Tribute</h2>
        <form onSubmit={handleFormSubmit}>
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

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="bg-red-400 text-white py-2 px-4 rounded-md transition-colors hover:text-primary-text_black"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`py-2 px-4 rounded-md transition-colors text-white ${
                isSubmitting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-primary hover:bg-primary-hover_light hover:text-primary-text_black'
              }`}
            >
              {isSubmitting ? "Submitting..." : "Submit Tribute"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTributeEditor;
