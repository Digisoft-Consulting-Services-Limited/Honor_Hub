
const InviteFriendsCard: React.FC = () => {
  return (
    <div className="p-4 bg-white shadow rounded mb-4">
      <h3 className="text-lg font-semibold text-primary mb-2">Invite Friends</h3>
      <p className="text-gray-700">Invite friends to share their tributes.</p>
      <button className="mt-2 px-4 py-2 bg-primary text-white rounded hover:bg-primary-hover transition">
        Invite
      </button>
    </div>
  );
};

export default InviteFriendsCard;
