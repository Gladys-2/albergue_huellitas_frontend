import React, { useState, useEffect } from "react";
import { FaHome, FaDog, FaCat, FaHeart, FaUsers, FaChartBar, FaCog, FaSignOutAlt, FaBars } from "react-icons/fa";

interface SidebarProps {
  collapsed: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, toggleSidebar }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("Inicio");

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
    if (isMobile) setMobileOpen(false);
  };

  const links = [
    { icon: <FaHome />, label: "Inicio" },
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
            left: 20,
            zIndex: 200,
            fontSize: 24,
            background: "linear-gradient(135deg, #137497, #1abc9c)",
            border: "none",
            cursor: "pointer",
            borderRadius: "8px",
            padding: "8px",
            color: "#fff",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          }}
        >
          <FaBars />
        </button>
      )}

      <aside
        style={{
          width: collapsed ? "70px" : "220px",
          backgroundColor: "#ffffff",
          borderRight: "1px solid #e0e0e0",
          height: "100vh",
          paddingTop: 70,
          transition: "all 0.3s ease",
          position: "fixed",
          top: 0,
          left: isMobile ? (mobileOpen ? "0" : "-220px") : 0,
          overflow: "hidden",
          boxShadow: "2px 0 15px rgba(0,0,0,0.15)",
          zIndex: 100,
        }}
      >
        <nav
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            padding: "10px",
          }}
        >
          {links.map(({ icon, label, color }) => (
            <SidebarLink
              key={label}
              icon={icon}
              label={label}
              collapsed={collapsed}
              active={activeLink === label}
              color={color || "#333"}
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
            zIndex: 50,
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

const SidebarLink: React.FC<SidebarLinkProps> = ({ icon, label, collapsed, active = false, color = "#333", onClick }) => (
  <a
    href="#"
    onClick={onClick}
    style={{
      display: "flex",
      alignItems: "center",
      gap: "12px",
      textDecoration: "none",
      color: active ? "#fff" : color,
      fontWeight: 600,
      fontSize: 16,
      padding: "12px 14px",
      borderRadius: "12px",
      transition: "all 0.3s ease",
      background: active ? "linear-gradient(90deg,#137497,#1abc9c)" : "transparent",
      boxShadow: active ? "0 4px 12px rgba(19,116,151,0.3)" : "none",
      cursor: "pointer",
    }}
    onMouseOver={(e) => {
      e.currentTarget.style.background = active ? "linear-gradient(90deg,#137497,#1abc9c)" : "rgba(19,116,151,0.08)";
      e.currentTarget.style.color = "#137497";
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.background = active ? "linear-gradient(90deg,#137497,#1abc9c)" : "transparent";
      e.currentTarget.style.color = active ? "#fff" : color;
    }}
  >
    <span style={{ fontSize: 20 }}>{icon}</span>
    {!collapsed && <span>{label}</span>}
  </a>
);

export default Sidebar;