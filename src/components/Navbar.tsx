import React, { useState } from "react";
import { FaUserCircle, FaBell, FaQuestionCircle } from "react-icons/fa";
import { HiOutlineMenu } from "react-icons/hi";
import { IoMdGlobe } from "react-icons/io";
import type { Usuario } from "../types/types";

interface NavbarProps {
  usuario?: Usuario;
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ usuario, toggleSidebar }) => {
  const [idioma, setIdioma] = useState<"es" | "en">("es");

  // Traducciones simples
  const textos = {
    es: {
      appName: "HUELLITAS",
      roleAdmin: "Administrador",
      roleUser: "Usuario",
    },
    en: {
      appName: "HUELLITAS",
      roleAdmin: "Administrator",
      roleUser: "User",
    },
  };

  const toggleIdioma = () => setIdioma(idioma === "es" ? "en" : "es");

  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        background: "linear-gradient(90deg, #936e09ff, #d6e40ee3)",
        height: 60,
        padding: "0 16px",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 300,
        boxSizing: "border-box",
        color: "#000",
      }}
    >
      {/* Botón de menú */}
      <button
        onClick={toggleSidebar}
        style={{
          fontSize: 25,
          cursor: "pointer",
          background: "rgba(255,255,255,0.2)",
          border: "none",
          borderRadius: 8,
          padding: "6px 8px",
          color: "#f8f8f8ff",
          transition: "all 0.3s ease",
        }}
      >
        <HiOutlineMenu />
      </button>

      {/* Título */}
      <div
        style={{
          flex: 1,
          textAlign: "center",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          padding: "0 10px",
        }}
      >
        <h1
          style={{
            margin: 0,
            fontWeight: "bold",
            fontSize: 35,
            color: "#000",
          }}
        >
          {textos[idioma].appName}
        </h1>
      </div>

      {/* Información del usuario y íconos */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          flexShrink: 0,
          maxWidth: 250,
        }}
      >
        {/* Rol del usuario */}
        {usuario && (
          <span
            style={{
              fontSize: 12,
              fontWeight: 500,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              padding: "10px 12px",
              borderRadius: 90,
              background: usuario.rol === "administrador" ? "#98dc06ff" : "rgba(0, 255, 145, 1)",
              color: "#000",
              transition: "all 0.3s ease",
            }}
            title={usuario.rol === "administrador" ? textos[idioma].roleAdmin : textos[idioma].roleUser}
          >
            {usuario.nombre} {usuario.apellido_paterno}
          </span>
        )}

        {/* Íconos */}
        {[FaQuestionCircle, FaBell, FaUserCircle].map((Icon, idx) => (
          <Icon
            key={idx}
            size={28}
            style={{
              cursor: "pointer",
              padding: 4,
              borderRadius: 6,
              color: "#000000ff",
              transition: "all 0.50s ease",
            }}
          />
        ))}

        {/* Selector de idioma */}
        <button
          onClick={toggleIdioma}
          style={{
            cursor: "pointer",
            background: "rgba(255,255,255,0.2)",
            border: "none",
            borderRadius: 6,
            padding: "6px 8px",
            display: "flex",
            alignItems: "center",
            gap: 4,
            color: "#000",
            transition: "all 0.3s ease",
          }}
          title={idioma === "es" ? "Cambiar a Inglés" : "Switch to Spanish"}
        >
          <IoMdGlobe size={22} />
          {idioma.toUpperCase()}
        </button>
      </div>
    </header>
  );
};

export default Navbar;