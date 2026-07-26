import "./ProfileCard.css";
import { FiCamera } from "react-icons/fi";
import profileImage from "../../../assets/logo/ongc-logo.png"; // Replace with your image
import { useState } from "react";
const ProfileCard = () => {
  return (
    <div className="profile-card">
      <div className="profile-avatar">
        <img src={profileImage} alt="Profile" />

        <button className="camera-btn">
          <FiCamera />
        </button>
      </div>

      <div className="profile-details">
        <h2>Parth Verma</h2>

        <p>parth.verma@ongc.co.in</p>

        <div className="profile-badges">
          <span>Software Intern</span>
          <span>GEOPIC</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
