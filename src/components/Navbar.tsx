import React from "react";
import { FaUserCircle, FaBell, FaQuestionCircle } from "react-icons/fa";
import { HiOutlineMenu } from "react-icons/hi";
import type { Usuario } from "../types";

interface NavbarProps {
  usuario?: Usuario;
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ usuario, toggleSidebar }) => {
  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        backgroundColor: "#fff",
        height: 70,
        padding: "0 20px",
        position: "fixed",
        top: 0,
        left: 0,
        boxShadow: "0 2px 5px rgba(0,0,0,0.15)",
        zIndex: 100,
        boxSizing: "border-box",
      }}
    >
      {/* Botón de menú */}
      <button
        onClick={toggleSidebar}
        style={{
          fontSize: 26,
          cursor: "pointer",
          background: "none",
          border: "none",
          color: "#333",
          flexShrink: 0,
        }}
      >
        <HiOutlineMenu />
      </button>

      {/* Título centrado */}
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
        <h1 style={{ margin: 0, fontWeight: "bold", fontSize: 22, color: "#137497" }}>
          Panel de Usuarios
        </h1>
      </div>

      {/* Iconos y usuario */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 15,
          flexShrink: 0,
          maxWidth: 250,
        }}
      >
        {usuario && (
          <span
            style={{
              fontSize: 14,
              color: "#555",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {usuario.nombre} {usuario.apellidoPaterno}
          </span>
        )}

        <FaQuestionCircle size={22} style={{ cursor: "pointer", color: "#333" }} />
        <FaBell size={22} style={{ cursor: "pointer", color: "#333" }} />
        <FaUserCircle size={30} style={{ cursor: "pointer", color: "#137497" }} />
      </div>
    </header>
  );
};

export default Navbar;