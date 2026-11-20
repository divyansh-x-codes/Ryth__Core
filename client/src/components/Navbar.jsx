
import { useState } from "react";
import "../styles/Navbar.css";

function Navbar({ onNavigate, onOpenWrite, onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchTerm(val);
    if (onSearch) onSearch(val);
  };

  return (
    <nav className="navbar">
      {/* 1. LOGO */}
      <div
        className="navbar-logo"
        onClick={() => onNavigate && onNavigate("HOME")}
        style={{ cursor: "pointer" }}
        title="Go to Home"
      >
        <div className="logo-icon">R</div>
        <h2>
          Ryth<span>Core</span>
        </h2>
      </div>

      {/* 2. SEARCH BAR */}
      <div className="navbar-search">
        <span>⌕</span>
        <input
          type="text"
          placeholder="Search stories, topics, or writers..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <kbd>⌘ K</kbd>
      </div>

      {/* 3. EDITORIAL NETWORK BADGE */}
      <div
        className="navbar-editorial"
        onClick={() => onNavigate && onNavigate("STORIES")}
        style={{ cursor: "pointer" }}
        title="View Editorial Network"
      >
        <div className="editorial-icon">✧</div>
        <div>
          <strong>Ryth Editorial</strong>
          <small>Perspective Network</small>
        </div>
      </div>

      {/* 4. WRITE STORY BUTTON */}
      <button className="navbar-write" onClick={onOpenWrite}>
        <span>✎</span>
        Write
      </button>

      {/* 5. USER PROFILE BUTTON */}
      <div
        className="navbar-profile"
        onClick={() => onNavigate && onNavigate("PROFILE")}
        style={{ cursor: "pointer" }}
        title="View User Profile"
      >
        <div className="profile-avatar">S</div>
        <strong>Simply</strong>
        <span>⌄</span>
      </div>
    </nav>
  );
}

export default Navbar;