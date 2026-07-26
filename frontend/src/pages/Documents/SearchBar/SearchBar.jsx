import "./SearchBar.css";
import { FiSearch, FiGrid, FiList } from "react-icons/fi";
import { useState } from "react";

const SearchBar = () => {
  const [view, setView] = useState("grid");

  return (
    <div className="documents-search">

      <div className="search-box">
        <FiSearch />
        <input
          type="text"
          placeholder="Search documents..."
        />
      </div>

      <select>
        <option>All Basins</option>
        <option>Krishna-Godavari</option>
        <option>Cambay</option>
        <option>Mumbai Offshore</option>
      </select>

      <select>
        <option>All Years</option>
        <option>2026</option>
        <option>2025</option>
        <option>2024</option>
      </select>

      <select>
        <option>All Types</option>
        <option>Seismic</option>
        <option>Well Log</option>
        <option>Reservoir</option>
      </select>

      <div className="view-toggle">

        <button
          className={view === "grid" ? "active" : ""}
          onClick={() => setView("grid")}
        >
          <FiGrid />
        </button>

        <button
          className={view === "list" ? "active" : ""}
          onClick={() => setView("list")}
        >
          <FiList />
        </button>

      </div>

    </div>
  );
};

export default SearchBar;