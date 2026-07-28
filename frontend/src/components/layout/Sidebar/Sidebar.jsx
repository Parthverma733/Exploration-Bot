import { NavLink, useNavigate } from "react-router-dom";
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

const Sidebar = ({ open, onNavigate }) => {
  const navigate = useNavigate();
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

  const linkClass = ({ isActive }) =>
    [
      "flex items-center gap-4 rounded-[10px] px-4 py-3.5 no-underline transition-colors duration-200",
      isActive
        ? "bg-primary text-white"
        : "text-[#D5DFEC] hover:bg-white/10 hover:text-white",
    ].join(" ");

  return (
    <aside
      className={[
        "fixed z-[1000] flex h-screen w-[250px] flex-col justify-between bg-sidebar px-[18px] py-6 text-white transition-transform duration-300",
        open ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
      ].join(" ")}
    >
      <div className="flex flex-col">
        <div className="mb-10 flex items-center gap-4">
          <img
            src={ongcLogo}
            alt="ONGC"
            className="h-[55px] w-[55px] object-contain"
          />

          <div>
            <h2 className="text-xl font-bold">ExploreAI</h2>
            <p className="mt-1 text-[13px] text-[#BFC9D9]">Knowledge Assistant</p>
          </div>
        </div>

        <nav className="flex flex-col gap-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.title}
              to={item.path}
              className={linkClass}
              onClick={onNavigate}
            >
              <span className="flex text-xl">{item.icon}</span>
              <p className="text-[15px] font-medium">{item.title}</p>
            </NavLink>
          ))}
        </nav>
      </div>

      <button
        type="button"
        className="flex w-full items-center gap-4 rounded-[10px] border-0 bg-transparent px-4 py-3.5 text-[15px] text-[#D5DFEC] transition-colors duration-200 hover:bg-white/10 hover:text-white"
        onClick={handleLogout}
      >
        <FiLogOut className="text-xl" />
        <span>Logout</span>
      </button>
    </aside>
  );
};

export default Sidebar;
