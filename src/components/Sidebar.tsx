import React from "react";
import {
  FaHome,
  FaUsers,
  FaBook,
  FaChalkboardTeacher,
  FaChartBar,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

interface SidebarProps {
  collapsed: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
  return (
    <aside
      style={{
        width: collapsed ? "70px" : "220px",
        backgroundColor: "#ffffff",
        borderRight: "1px solid #e0e0e0",
        height: "100vh",
        paddingTop: 90, // espacio para el navbar
        transition: "width 0.3s ease",
        position: "fixed",
        top: 0,
        left: 0,
        overflow: "hidden",
        boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
        zIndex: 90,
      }}
    >
      <nav
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          padding: "0 10px",
        }}
      >
        {/* Sección de navegación */}
        <SidebarLink
          icon={<FaHome />}
          label="Inicio"
          collapsed={collapsed}
        />
        <SidebarLink
          icon={<FaUsers />}
          label="Usuarios"
          collapsed={collapsed}
          active
        />
        <SidebarLink
          icon={<FaBook />}
          label="Materias"
          collapsed={collapsed}
        />
        <SidebarLink
          icon={<FaChalkboardTeacher />}
          label="Docentes"
          collapsed={collapsed}
        />
        <SidebarLink
          icon={<FaChartBar />}
          label="Reportes"
          collapsed={collapsed}
        />
        <SidebarLink
          icon={<FaCog />}
          label="Configuración"
          collapsed={collapsed}
        />

        {/* Botón de salir */}
        <div style={{ marginTop: "auto" }}>
          <SidebarLink
            icon={<FaSignOutAlt />}
            label="Salir"
            collapsed={collapsed}
            color="#e74c3c"
          />
        </div>
      </nav>
    </aside>
  );
};

// 🔹 Componente de enlace del sidebar
interface SidebarLinkProps {
  icon: React.ReactNode;
  label: string;
  collapsed: boolean;
  active?: boolean;
  color?: string;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({
  icon,
  label,
  collapsed,
  active = false,
  color = "#333",
}) => {
  return (
    <a
      href="#"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        textDecoration: "none",
        color: color,
        fontWeight: 500,
        fontSize: 15,
        padding: "10px",
        borderRadius: "10px",
        transition: "0.3s ease",
        backgroundColor: active ? "rgba(19, 116, 151, 0.1)" : "transparent",
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.backgroundColor = "rgba(19,116,151,0.08)";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.backgroundColor = active
          ? "rgba(19,116,151,0.1)"
          : "transparent";
      }}
    >
      <span style={{ fontSize: 18 }}>{icon}</span>
      {!collapsed && <span>{label}</span>}
    </a>
  );
};

export default Sidebar;