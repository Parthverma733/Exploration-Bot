import "./Security.css";
import { FiLock } from "react-icons/fi";

const Security = () => {
  return (
    <div className="security-section">

      <h2>Security</h2>

      <div className="security-grid">

        <div className="security-input">
          <label>Current Password</label>
          <input
            type="password"
            placeholder="Enter current password"
          />
        </div>

        <div className="security-input">
          <label>New Password</label>
          <input
            type="password"
            placeholder="Enter new password"
          />
        </div>

        <div className="security-input full-width">
          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm new password"
          />
        </div>

      </div>

      <button className="change-password-btn">
        <FiLock />
        Change Password
      </button>

    </div>
  );
};

export default Security;