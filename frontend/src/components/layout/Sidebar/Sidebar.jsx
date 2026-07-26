import "./Sidebar.css";
import { NavLink ,useNavigate} from "react-router-dom";
import {
  FiHome,
  FiFileText,
  FiMessageSquare,
  FiSearch,
  FiGlobe,
  FiBarChart2,
  FiUser,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";

import ongcLogo from "../../../assets/logo/ongc-logo.png";

const Sidebar = () => {
  const navigate =useNavigate();
  const menuItems = [
    { title: "Dashboard", icon: <FiHome />, path: "/dashboard" },
    { title: "Documents", icon: <FiFileText />, path: "/documents" },
    { title: "AI Assistant", icon: <FiMessageSquare />, path: "/assistant" },
    { title: "Semantic Search", icon: <FiSearch />, path: "/semantic-search" },
    { title: "Basin Intelligence", icon: <FiGlobe />, path: "/basin-intelligence" },
    { title: "Report Generator", icon: <FiBarChart2 />, path: "/report-generator" },
    { title: "Profile", icon: <FiUser />, path: "/profile" },
    { title: "Settings", icon: <FiSettings />, path: "/settings" },
  ];
  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate("/");
};

  return (
    <aside className="sidebar">

      <div className="sidebar-top">

        <div className="sidebar-logo">
          <img src={ongcLogo} alt="ONGC" />

          <div>
            <h2>ExploreAI</h2>
            <p>Knowledge Assistant</p>
          </div>
        </div>

        <nav className="sidebar-menu">
          {menuItems.map((item) => (
            <NavLink
              key={item.title}
              to={item.path}
              className={({ isActive }) =>
                isActive ? "menu-item active" : "menu-item"
              }
            >
              <span>{item.icon}</span>
              <p>{item.title}</p>
            </NavLink>
          ))}
        </nav>

      </div>

      <button className="logout-btn" onClick={handleLogout}>
        <FiLogOut />
        <span>Logout</span>
      </button>

    </aside>
  );
};

export default Sidebar;