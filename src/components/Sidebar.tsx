import React, { useState, useEffect } from "react";
import {
  FaHome,
  FaDog,
  FaCat,
  FaHeart,
  FaPaw,
  FaUsers,
  FaChartBar,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { useIdioma } from "../components/context/IdiomaContext";
import { t } from "../i18n";

interface SidebarProps {
  collapsed: boolean;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
  setPantalla: (pant: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  collapsed,
  mobileOpen,
  setMobileOpen,
  setPantalla,
}) => {
  useIdioma(); 
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const links = [
    { icon: <FaHome />, label: "inicio" },
    { icon: <FaUsers />, label: "usuarios" },
    { icon: <FaDog />, label: "perros" },
    { icon: <FaPaw />, label: "animales"},
    { icon: <FaCat />, label: "gatos" },
    { icon: <FaHeart />, label: "adopciones" },
    { icon: <FaUsers />, label: "voluntarios" },
    { icon: <FaChartBar />, label: "reportes" },
    { icon: <FaCog />, label: "configuracion" },
    { icon: <FaSignOutAlt />, label: "salir", color: "#e74c3c" },
  ];

  const handleLinkClick = (label: string) => {
    setPantalla(label);
    setMobileOpen(false);
  };

  return (
    <>
      <aside
        style={{
          width: collapsed && isDesktop ? 70 : 220,
          position: "fixed",
          top: 0,
          left: isDesktop ? 0 : mobileOpen ? 0 : -220,
          height: "100vh",
          background: "linear-gradient(180deg, #f6d365, #fda085)",
          color: "#fff",
          paddingTop: 70,
          transition: "width 0.3s ease, left 0.3s ease",
          zIndex: 200,
          boxShadow: "2px 0 15px rgba(0,0,0,0.2)",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: collapsed && isDesktop ? "center" : "flex-start",
        }}
      >
        <nav
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            padding: "10px",
            width: "100%",
          }}
        >
          {links.map(({ icon, label, color }) => (
            <a
              key={label}
              href="#"
              onClick={() => handleLinkClick(label)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: collapsed && isDesktop ? "center" : "flex-start",
                gap: "12px",
                textDecoration: "none",
                color: color || "#fff",
                fontWeight: 600,
                fontSize: 16,
                padding: collapsed && isDesktop ? "8px 0" : "8px 16px",
                borderRadius: 12,
                cursor: "pointer",
                width: "100%",
                transition: "all 0.3s ease",
              }}
            >
              <span
                style={{
                  fontSize: 18,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 35,
                  height: 35,
                  borderRadius: "50%",
                  backgroundColor: "rgba(255,255,255,0.2)",
                  transition: "all 0.3s ease",
                }}
                className="sidebar-icon"
              >
                {icon}
              </span>
              {/* Etiqueta traducida usando t() */}
              {(!collapsed || !isDesktop) && <span>{t(label)}</span>}
            </a>
          ))}
        </nav>
      </aside>

      {/*  para móvil */}
      {!isDesktop && mobileOpen && (
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

      {/* Estilos hover */}
      <style>
        {`
          .sidebar-icon:hover {
            background-color: rgba(255,255,255,0.35);
            transform: scale(1.3);
          }
          a:hover span + span {
            color: #fff;
          }
        `}
      </style>
    </>
  );
};

export default Sidebar;