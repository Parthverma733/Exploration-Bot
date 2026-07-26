import "./Profile.css";

import ProfileCard from "./ProfileCard/ProfileCard";
import PersonalInfo from "./PersonalInfo/PersonalInfo";
import Security from "./Security/Security";
import Activity from "./Activity/Activity";

const Profile = () => {
  return (
    <div className="profile-page">
      <ProfileCard />
      <PersonalInfo />
      <Security />
      <Activity />
    </div>
  );
};

export default Profile;
