import "./PersonalInfo.css";

const PersonalInfo = () => {
  return (
    <div className="personal-info">

      <h2>Personal Information</h2>

      <div className="info-grid">

        <div className="input-group">
          <label>Full Name</label>
          <input type="text" defaultValue="Parth Verma" />
        </div>

        <div className="input-group">
          <label>Email</label>
          <input type="email" defaultValue="parth.verma@ongc.co.in" />
        </div>

        <div className="input-group">
          <label>Phone</label>
          <input type="text" defaultValue="+91 9876543210" />
        </div>

        <div className="input-group">
          <label>Department</label>
          <input type="text" defaultValue="GEOPIC" />
        </div>

        <div className="input-group">
          <label>Designation</label>
          <input type="text" defaultValue="Software Intern" />
        </div>

        <div className="input-group">
          <label>Employee ID</label>
          <input type="text" defaultValue="ONGC001" />
        </div>

      </div>

      <button className="save-profile-btn">
        Save Changes
      </button>

    </div>
  );
};

export default PersonalInfo;