import React from "react";
import "../index.css";

interface SidebarProps {
  collapsed: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, toggleSidebar }) => {
  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <button className="menu-toggle" onClick={toggleSidebar}>
        ☰
      </button>
      <nav className="sidebar-buttons">
        <button>Inicio</button>
        <button>Mascotas</button>
        <button>Usuarios</button>
        <button>Adopciones</button>
        <button>Donaciones</button>
        <button>Reportes</button>
        <button>Configuración</button>
      </nav>
    </div>
  );
};

export default Sidebar;