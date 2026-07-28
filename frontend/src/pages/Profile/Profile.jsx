import ProfileCard from "./ProfileCard/ProfileCard";
import PersonalInfo from "./PersonalInfo/PersonalInfo";
import Security from "./Security/Security";
import Activity from "./Activity/Activity";

const Profile = () => {
  return (
    <div className="flex flex-col gap-6 p-4 md:p-6 lg:p-8">
      <ProfileCard />
      <PersonalInfo />
      <Security />
      <Activity />
    </div>
  );
};

export default Profile;
