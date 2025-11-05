import React, { useState, useEffect } from "react";
import { t, getIdioma, setIdioma } from "../i18n";
import type { Usuario } from "../types/types";

interface NavbarProps {
  toggleSidebar: () => void;
  collapsed: boolean;
  usuario: Usuario;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar, collapsed }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [idioma, setIdiomaState] = useState(getIdioma());

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleCambiarIdioma = () => {
    const nuevoIdioma = idioma === "es" ? "en" : "es";
    setIdioma(nuevoIdioma);
    setIdiomaState(nuevoIdioma);
  };

  const links = [
    "inicio",
    "adopta",
    "apadrina_dona",
    "apoyanos",
    "hogares_tepa",
    "blog",
    "contactanos",
  ];

  // Ajuste dinámico del navbar según ancho del sidebar
  const sidebarWidth = collapsed ? 70 : 220;
  const headerStyle: React.CSSProperties = isMobile
    ? { left: 0, width: "100%" }
    : { left: sidebarWidth, right: 0 }; // evita overflow

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        height: 70,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "linear-gradient(90deg, #f8ce11, #f5d715)",
        padding: "0 1rem",
        boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
        zIndex: 300,
        transition: "left 0.3s ease, right 0.3s ease",
        ...headerStyle,
      }}
    >
      {/* Izquierda: botón sidebar + título */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          marginLeft: collapsed ? 20 : 40, // ajusta según quieras centrar más
        }}
      >
        <button
          onClick={toggleSidebar}
          aria-label="toggle sidebar"
          style={{
            fontSize: 20,
            background: "#333",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "6px 10px",
            cursor: "pointer",
          }}
        >
          ☰
        </button>
        <h1 style={{ margin: 0, fontWeight: "bold", fontSize: 22, color: "#333" }}>
          HUELLITAS
        </h1>
      </div>

      {/* Derecha: links + botón idioma */}
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          flex: 1,
          justifyContent: "flex-end",
          minWidth: 0,
        }}
      >
        {/* Links solo desktop */}
        <ul
          style={{
            display: isMobile ? "none" : "flex",
            gap: "0.75rem",
            listStyle: "none",
            margin: 0,
            padding: 0,
            alignItems: "center",
          }}
        >
          {links.map((link) => (
            <li
              key={link}
              style={{
                cursor: "pointer",
                fontWeight: 600,
                color: "#333",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                overflow: "hidden",
                maxWidth: 160,
              }}
              title={t(link)}
            >
              {t(link)}
            </li>
          ))}
        </ul>

        {/* Botón de idioma */}
        <button
          onClick={handleCambiarIdioma}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            fontSize: 16,
            fontWeight: 600,
            background: "#333",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            padding: "6px 10px",
            cursor: "pointer",
            flexShrink: 0,
            minWidth: 50,
          }}
          title="Cambiar idioma"
        >
          <span style={{ fontSize: 20 }}>{idioma === "es" ? "🇺🇸" : "🇪🇸"}</span>
        </button>
      </nav>

      {/* Menú móvil */}
      {menuOpen && isMobile && (
        <div
          style={{
            position: "absolute",
            top: 70,
            right: 0,
            left: 0,
            background: "#f8ce11",
            display: "flex",
            flexDirection: "column",
            padding: "0.75rem 1rem",
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
          }}
        >
          {links.map((link) => (
            <button
              key={link}
              onClick={() => setMenuOpen(false)}
              style={{
                border: "none",
                background: "transparent",
                padding: "10px 0",
                textAlign: "left",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              {t(link)}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};

export default Navbar;