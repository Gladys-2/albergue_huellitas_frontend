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
        background: "linear-gradient(90deg, #099c7cff, #00ffb7ff)",
        height: 70,
        padding: "0 16px",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 100,
        boxSizing: "border-box",
        color: "#000",
      }}
    >
      <button
        onClick={toggleSidebar}
        style={{
          fontSize: 25,
          cursor: "pointer",
          background: "rgba(255,255,255,0.2)",
          border: "none",
          borderRadius: 8,
          padding: "6px 8px",
          color: "#fff",
          transition: "all 0.3s ease",
        }}
      >
        <HiOutlineMenu />
      </button>

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
            fontSize: 20,
            color: "#000",
          }}
        >
          Huellitas 🐾
        </h1>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          flexShrink: 0,
          maxWidth: 200,
        }}
      >
        {usuario && (
          <span
            style={{
              fontSize: 12,
              fontWeight: 500,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              padding: "4px 6px",
              borderRadius: 6,
              background: usuario.rol === "administrador" ? "#5bf7d8ff" : "rgba(0, 255, 145, 0.99)",
              color: "#000",
              transition: "all 0.3s ease",
            }}
          >
            {usuario.nombre} {usuario.apellido_paterno}
          </span>
        )}

        {[FaQuestionCircle, FaBell, FaUserCircle].map((Icon, idx) => (
          <Icon
            key={idx}
            size={20}
            style={{
              cursor: "pointer",
              padding: 4,
              borderRadius: 6,
              color: "#fff",
              transition: "all 0.3s ease",
            }}
          />
        ))}
      </div>
    </header>
  );
};

export default Navbar;