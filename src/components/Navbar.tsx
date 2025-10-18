import React from "react";
import { FaBell, FaQuestionCircle, FaUserCircle } from "react-icons/fa";
import { HiOutlineMenu } from "react-icons/hi";
import type { Usuario } from "../types";

interface NavbarProps {
  usuario?: Usuario;
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ usuario, toggleSidebar }) => {
  return (
    <header
      className="flex justify-between items-center bg-yellow-400 px-6 py-3 shadow-md sticky top-0 z-50 w-full"
      style={{
        flexWrap: "nowrap",
        position: "sticky",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
      }}
    >
      {/* Izquierda: menú + logo */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="text-2xl text-white hover:text-orange-200 transition-colors"
        >
          <HiOutlineMenu />
        </button>

        <h1 className="text-white font-bold text-xl">
          🐾 <span className="text-orange-500">Huellitas</span>
        </h1>

        <span className="text-white font-medium">
          {usuario ? usuario.nombre : "Administrador"}
        </span>
      </div>

      {/* Derecha: iconos */}
      <div className="flex items-center gap-6 text-white">
        <FaQuestionCircle size={18} className="cursor-pointer hover:text-orange-200 transition-colors" />
        <FaBell size={18} className="cursor-pointer hover:text-orange-200 transition-colors" />
        <FaUserCircle size={28} className="cursor-pointer text-orange-400 hover:text-orange-300 transition-colors" />
      </div>
    </header>
  );
};

export default Navbar;