import React from "react";
import {
  FaHome,
  FaUsers,
  FaPaw,
  FaChartBar,
  FaShoppingCart,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

interface SidebarProps {
  collapsed: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
  return (
    <aside
      style={{
        width: collapsed ? "70px" : "220px",
        backgroundColor: "#fff",
        borderRight: "1px solid #e0e0e0",
        height: "100vh",
        padding: "20px 10px",
        transition: "0.3s",
        position: "fixed",
        top: 0,
        left: 0,
        overflow: "hidden",
      }}
    >
      <nav style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
        <a href="#" style={linkStyle}>
          <FaHome /> {!collapsed && <span>Inicio</span>}
        </a>
        <a href="#" style={linkStyle}>
          <FaUsers /> {!collapsed && <span>Usuarios</span>}
        </a>
        <a href="#" style={linkStyle}>
          <FaPaw /> {!collapsed && <span>Mascotas</span>}
        </a>
        <a href="#" style={linkStyle}>
          <FaShoppingCart /> {!collapsed && <span>Adopciones</span>}
        </a>
        <a href="#" style={linkStyle}>
          <FaChartBar /> {!collapsed && <span>Reportes</span>}
        </a>
        <a href="#" style={linkStyle}>
          <FaCog /> {!collapsed && <span>Configuración</span>}
        </a>
        <a href="#" style={{ ...linkStyle, marginTop: "auto", color: "#e74c3c" }}>
          <FaSignOutAlt /> {!collapsed && <span>Salir</span>}
        </a>
      </nav>
    </aside>
  );
};

const linkStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  textDecoration: "none",
  color: "#2c3e50",
  fontWeight: 500,
  padding: "10px",
  borderRadius: "10px",
  transition: "0.3s",
};

export default Sidebar;