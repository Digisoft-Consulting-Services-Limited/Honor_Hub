
const RecentUpdatesCard: React.FC = () => {
  return (
    <div className="p-4 bg-white shadow rounded mb-4">
      <h3 className="text-lg font-semibold text-primary mb-2">Recent Updates</h3>
      <ul className="list-disc list-inside text-gray-700">
        <li>John added a tribute.</li>
        <li>Jane added a photo.</li>
      </ul>
    </div>
  );
};

export default RecentUpdatesCard;
