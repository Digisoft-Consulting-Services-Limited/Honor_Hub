import { InviteFriendsCard,TributeAdminCard,AddPhotoCard,ViewsCard,RecentUpdate,ShareOnFacebookCard } from "../../index";

const SecondColumn: React.FC = () => {
    return (
      <div className="w-1/3 p-4">
        <InviteFriendsCard />
        <ShareOnFacebookCard />
        <AddPhotoCard />
        <RecentUpdate />
        <TributeAdminCard />
        <ViewsCard />
      </div>
    );
  };
  
  export default SecondColumn;