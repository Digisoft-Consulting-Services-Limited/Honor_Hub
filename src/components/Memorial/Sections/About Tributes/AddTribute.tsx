
interface AddTributeEditorProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddTributeEditor: React.FC<AddTributeEditorProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-primary-light_yellow p-6 rounded-lg shadow-lg w-11/12 md:w-96">
        <h2 className="text-xl font-semibold mb-4">Create a Tribute</h2>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium text-primary-text_black">Title</label>
            <input
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-primary-text_black">Message</label>
            <textarea
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              rows={4}
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-primary-text_black">Add Media</label>
            <input
              type="file"
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-primary-text_black hover:file:bg-primary-hover_light"
            />
          </div>
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
              Publish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTributeEditor;