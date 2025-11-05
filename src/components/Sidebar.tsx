import React, { useState, useEffect } from "react";
import { FaHome, FaDog, FaCat, FaHeart, FaUsers, FaChartBar, FaCog, FaSignOutAlt, FaBars } from "react-icons/fa";

interface SidebarProps {
  collapsed: boolean;
  toggleSidebar: () => void;
  setPantalla: (pantalla: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, toggleSidebar, setPantalla }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("inicio");

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleToggle = () => {
    if (isMobile) setMobileOpen(!mobileOpen);
    else toggleSidebar();
  };

  const handleLinkClick = (label: string) => {
    setActiveLink(label);
    setPantalla(label);
    if (isMobile) setMobileOpen(false);
  };

  const links = [
    { icon: <FaHome />, label: "inicio" },
    { icon: <FaUsers />, label: "Usuarios" },
    { icon: <FaDog />, label: "Perros" },
    { icon: <FaCat />, label: "Gatos" },
    { icon: <FaHeart />, label: "Adopciones" },
    { icon: <FaUsers />, label: "Voluntarios" },
    { icon: <FaChartBar />, label: "Reportes" },
    { icon: <FaCog />, label: "Configuración" },
    { icon: <FaSignOutAlt />, label: "Salir", color: "#e74c3c" },
  ];

  return (
    <>
      {isMobile && (
        <button
          onClick={handleToggle}
          style={{
            position: "fixed",
            top: 10,
            left: 10,
            zIndex: 300,
            fontSize: 24,
            background: "linear-gradient(135deg, #f6d365, #fda085)",
            border: "none",
            cursor: "pointer",
            borderRadius: 8,
            padding: 8,
            color: "#fff",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          }}
        >
          <FaBars />
        </button>
      )}

      <aside
        style={{
          width: collapsed ? 70 : 220,
          background: "linear-gradient(180deg, #f6d365, #fda085)",
          color: "#fff",
          height: "100vh",
          paddingTop: 70,
          position: "fixed",
          top: 0,
          left: isMobile ? (mobileOpen ? 0 : -220) : 0,
          transition: "all 0.3s ease",
          zIndex: 200,
          boxShadow: "2px 0 15px rgba(0,0,0,0.2)",
          overflow: "hidden",
        }}
      >
        <nav style={{ display: "flex", flexDirection: "column", gap: "12px", padding: "10px" }}>
          {links.map(({ icon, label, color }) => (
            <SidebarLink
              key={label}
              icon={icon}
              label={label}
              collapsed={collapsed}
              active={activeLink.toLowerCase() === label.toLowerCase()}
              color={color || "#fff"}
              onClick={() => handleLinkClick(label)}
            />
          ))}
        </nav>
      </aside>

      {isMobile && mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.35)",
            zIndex: 100,
          }}
        />
      )}
    </>
  );
};

interface SidebarLinkProps {
  icon: React.ReactNode;
  label: string;
  collapsed: boolean;
  active?: boolean;
  color?: string;
  onClick?: () => void;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ icon, label, collapsed, active = false, color = "#fff", onClick }) => (
  <a
    href="#"
    onClick={onClick}
    style={{
      display: "flex",
      alignItems: "center",
      gap: "12px",
      textDecoration: "none",
      color: active ? "#333" : color,
      fontWeight: 600,
      fontSize: 16,
      padding: "12px 14px",
      borderRadius: 12,
      transition: "all 0.2s ease",
      background: active ? "rgba(255,255,255,0.8)" : "transparent",
      cursor: "pointer",
    }}
  >
    <span style={{ fontSize: 20 }}>{icon}</span>
    {!collapsed && <span>{label}</span>}
  </a>
);

export default Sidebar;