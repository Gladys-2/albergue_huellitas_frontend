import React from "react";
import "../index.css";
 
interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  return (
    <nav className="navbar">
      <button className="toggle-btn" onClick={toggleSidebar}>
        ☰
      </button>
      <h2 className="navbar-title">AlberGue</h2>
    </nav>
  );
};

export default Navbar;