import "./Topbar.css";

import { FiSearch, FiBell, FiChevronDown } from "react-icons/fi";

const Topbar = () => {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <div className="topbar-search">
          <FiSearch />
          <input type="text" placeholder="Search documents..." />
        </div>
      </div>

      <div className="topbar-right">
        <button className="notification-btn">
          <FiBell />
        </button>

        <div className="user-profile">
          <div className="user-avatar">P</div>

          <div className="user-info">
            <h4>Parth</h4>
            <p>Administrator</p>
          </div>

          <FiChevronDown />
        </div>
      </div>
    </header>
  );
};

export default Topbar;
