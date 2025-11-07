import React, { useState, useEffect } from "react";
import { t, getIdioma, setIdioma as cambiarIdiomaGlobal } from "../i18n";
import type { Usuario } from "../types/types";

interface NavbarProps {
  toggleSidebar: () => void;
  collapsed: boolean;
  usuario: Usuario;
}

const banderaBO =
  "https://upload.wikimedia.org/wikipedia/commons/4/48/Flag_of_Bolivia.svg";
const banderaUS =
  "https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg";
const iconoLupa =
  "https://cdn-icons-png.flaticon.com/512/2811/2811806.png";

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar, collapsed, usuario }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [idioma, setIdioma] = useState(getIdioma());
  const [searchOpen, setSearchOpen] = useState(false);
  const [filters, setFilters] = useState({
    especie: "",
    estado: "",
    sexo: "",
    tamano: "",
    ubicacion: "lapaz",
  });

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleCambiarIdioma = () => {
    const nuevoIdioma = idioma === "es" ? "en" : "es";
    cambiarIdiomaGlobal(nuevoIdioma);
    setIdioma(nuevoIdioma);
  };

  const handleFilterChange = (field: string, value: string) => {
    setFilters({ ...filters, [field]: value });
  };

  const handleSearch = () => {
    console.log("Buscar con filtros:", filters);
    setSearchOpen(false);
  };

  const sidebarWidth = collapsed ? 70 : 220;
  const headerStyle: React.CSSProperties = isMobile
    ? { left: 0, width: "100%" }
    : { left: sidebarWidth, right: 0 };

  const getIniciales = (nombre: string) => {
    const nombres = nombre.trim().split(" ");
    if (nombres.length === 1) return nombres[0].charAt(0).toUpperCase();
    return nombres[0].charAt(0).toUpperCase() + nombres[1].charAt(0).toUpperCase();
  };

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        height: 70,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "linear-gradient(135deg, #FFA726, #FFD54F, #F48FB1)",
        padding: "0 1rem",
        boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
        zIndex: 300,
        transition: "left 0.3s ease, right 0.3s ease",
        flexWrap: "wrap",
        ...headerStyle,
        color: "#fff",
      }}
    >
      {/* Botón Sidebar + Título */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          marginLeft: collapsed ? 10 : 20,
          flex: "1 1 auto",
        }}
      >
        <button
          onClick={toggleSidebar}
          aria-label="toggle sidebar"
          style={{
            fontSize: 20,
            background: "#fff",
            color: "#000000ff",
            border: "none",
            borderRadius: 8,
            padding: "6px 10px",
            cursor: "pointer",
            transition: "0.25s",
          }}
        >
          ☰
        </button>

        <h1
          style={{
            margin: 0,
            fontWeight: "bold",
            fontSize: 20,
            color: "#fff",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {t("huellitas")}
        </h1>
      </div>

      {/* Parte derecha */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          flex: "1 1 auto",
          justifyContent: isMobile ? "flex-end" : "flex-end",
          marginTop: isMobile ? 8 : 0,
        }}
      >
        {/* Avatar iniciales */}
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: "#000000ff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontWeight: "bold",
            color: "#fff",
            fontSize: 14,
          }}
        >
          {usuario.nombre ? getIniciales(usuario.nombre) : "U"}
        </div>

        <small
          style={{
            fontSize: 11,
            color: "#fff",
            fontWeight: 600,
            whiteSpace: "nowrap",
          }}
        >
          {usuario.nombre || t("usuario")}
        </small>

        {/* Bandera idioma */}
        <img
          src={idioma === "es" ? banderaBO : banderaUS}
          alt="idioma"
          onClick={handleCambiarIdioma}
          width={32}
          style={{
            cursor: "pointer",
            borderRadius: 6,
            border: "2px solid #fff",
            transition: "0.25s",
          }}
          title={idioma === "es" ? t("cambiar_ingles") : t("cambiar_espanol")}
        />

        {/* Lupa */}
        <div
          onClick={() => setSearchOpen(!searchOpen)}
          style={{
            width: 32,
            height: 32,
            background: "#fff",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
            transition: "0.3s",
          }}
        >
          <img src={iconoLupa} alt="buscar" width={18} height={18} />
        </div>
      </div>

      {/* Panel búsqueda */}
      {searchOpen && (
        <div
          style={{
            position: "absolute",
            top: 70,
            right: isMobile ? 5 : 10,
            width: isMobile ? "95%" : 360,
            background: "#fff",
            padding: 15,
            borderRadius: 12,
            boxShadow: "0 4px 15px rgba(0,0,0,0.25)",
            zIndex: 400,
            color: "#000",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {["especie", "estado", "sexo", "tamano", "ubicacion"].map((field) => (
              <label key={field} style={{ fontWeight: 600 }}>
                {t(field)}:
                <select
                  value={(filters as any)[field]}
                  onChange={(e) => handleFilterChange(field, e.target.value)}
                  style={{
                    width: "100%",
                    padding: 6,
                    borderRadius: 6,
                    marginTop: 3,
                  }}
                >
                  <option value="">{t("todos")}</option>
                  {field === "especie" &&
                    ["perro", "gato", "conejo", "hamster"].map((opt) => (
                      <option key={opt} value={opt}>
                        {t(opt)}
                      </option>
                    ))}
                  {field === "estado" &&
                    ["disponible", "urgente", "invisible"].map((opt) => (
                      <option key={opt} value={opt}>
                        {t(opt)}
                      </option>
                    ))}
                  {field === "sexo" &&
                    ["macho", "hembra"].map((opt) => (
                      <option key={opt} value={opt}>
                        {t(opt)}
                      </option>
                    ))}
                  {field === "tamano" &&
                    ["mini", "pequeno", "mediano", "grande", "gigante"].map((opt) => (
                      <option key={opt} value={opt}>
                        {t(opt)}
                      </option>
                    ))}
                  {field === "ubicacion" && (
                    <option value="lapaz">{t("lapaz")}</option>
                  )}
                </select>
              </label>
            ))}

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12 }}>
              <button
                onClick={() => setSearchOpen(false)}
                style={{
                  padding: "8px 14px",
                  borderRadius: 6,
                  border: "none",
                  background: "#ff4f4f",
                  color: "#fff",
                  fontWeight: 600,
                  cursor: "pointer",
                  boxShadow: "0 0 6px #ff4f4fAA",
                }}
              >
                {t("cerrar")}
              </button>

              <button
                onClick={handleSearch}
                style={{
                  padding: "8px 14px",
                  borderRadius: 6,
                  border: "none",
                  background: "#f49003ff",
                  color: "#fff",
                  fontWeight: 600,
                  cursor: "pointer",
                  boxShadow: "0 0 6px #f3e7aeaa",
                }}
              >
                {t("buscar")}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;