
const ShareOnFacebookCard: React.FC = () => {
  return (
    <div className="p-4 bg-white shadow rounded mb-4">
      <h3 className="text-lg font-semibold text-primary mb-2">Share on Facebook</h3>
      <p className="text-gray-700">Let others know about this tribute page.</p>
      <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
        Share
      </button>
    </div>
  );
};

export default ShareOnFacebookCard;
