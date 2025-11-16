import React, { useState, useEffect, type CSSProperties } from "react";
import type { Usuario } from "../types/types";
import { useIdioma } from "./context/IdiomaContext";
import { t } from "../i18n";

interface NavbarProps {
  toggleSidebar: () => void;
  collapsed: boolean;
  usuario: Usuario;
}

const banderaBO = "https://upload.wikimedia.org/wikipedia/commons/4/48/Flag_of_Bolivia.svg";
const banderaUS = "https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg";
const iconoLupa = "https://cdn-icons-png.flaticon.com/512/2811/2811806.png";

const coloresIniciales: Record<string, string> = {
  A: "#FF4500",
  B: "#FF6347",
  C: "#FF7F50",
  D: "#FF8C00",
  E: "#FFA500",
  F: "#FFB347",
  G: "#FF8C69",
  H: "#FF6F61",
  I: "#FF7256",
  J: "#FF4500",
  K: "#FF6347",
  L: "#FF7F50",
  M: "#FF8C00",
  N: "#FFA500",
  O: "#FFB347",
  P: "#FF8C69",
  Q: "#FF6F61",
  R: "#FF7256",
  S: "#FF4500",
  T: "#FF6347",
  U: "#FF7F50",
  V: "#FF8C00",
  W: "#FFA500",
  X: "#FFB347",
  Y: "#FF8C69",
  Z: "#FF6F61",
};

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar, collapsed, usuario }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { idioma, cambiarIdioma } = useIdioma(); 
  const [searchOpen, setSearchOpen] = useState(false);
  const [filtros, setFiltros] = useState({
    especie: "",
    estado: "",
    sexo: "",
    tamano: "",
    ubicacion: "",
  });

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 768;
  const sidebarWidth = collapsed ? 70 : 220;

  const handleFiltroChange = (campo: string, valor: string) => {
    setFiltros({ ...filtros, [campo]: valor });
  };

  const headerStyle: CSSProperties = { left: isMobile ? 0 : sidebarWidth, right: 0 };

  const getIniciales = (usuario?: Usuario) => {
    if (!usuario || !usuario.nombre) return "U";
    const nombre = usuario.nombre.trim();
    const apellido = usuario.apellido_paterno?.trim() ?? "";
    return nombre.charAt(0).toUpperCase() + (apellido ? apellido.charAt(0).toUpperCase() : "");
  };

  const obtenerColorInicial = (letra: string) => {
    return coloresIniciales[letra.toUpperCase()] || "#FF4500";
  };

  const iniciales = getIniciales(usuario);
  const color1 = obtenerColorInicial(iniciales.charAt(0));
  const color2 = obtenerColorInicial(iniciales.charAt(1) || iniciales.charAt(0));

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        height: 70,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "linear-gradient(90deg, #f6d365, #fda085)",
        padding: "0 1rem",
        boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
        zIndex: 300,
        transition: "left 0.3s ease, right 0.3s ease",
        flexWrap: "wrap",
        ...headerStyle,
        color: "#fff",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", flex: "1 1 auto" }}>
        <button
          onClick={toggleSidebar}
          style={{
            fontSize: 20,
            background: "#fff",
            color: "#000",
            border: "none",
            borderRadius: 8,
            padding: "6px 10px",
            cursor: "pointer",
            transition: "0.25s",
          }}
        >
          ☰
        </button>
        <h1 style={{ margin: 0, fontWeight: "bold", fontSize: 20, color: "#fff" }}>
          {t("huellitas")}
        </h1>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          flex: "1 1 auto",
          justifyContent: "flex-end",
          flexWrap: "wrap",
          position: "relative",
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${color1}, ${color2})`,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontWeight: "bold",
            color: "#fff",
            fontSize: 14,
          }}
        >
          {iniciales}
        </div>
        <small style={{ fontSize: 11, color: "#fff", fontWeight: 600, whiteSpace: "nowrap" }}>
          {usuario.nombre || t("usuario")}
        </small>

        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <img
            src={banderaBO}
            alt="Español"
            onClick={() => cambiarIdioma("es")}
            width={32}
            style={{
              cursor: "pointer",
              borderRadius: 6,
              border: idioma === "es" ? "2px solid #080808ff" : "2px solid #fff",
              transition: "all 0.25s",
              transform: idioma === "es" ? "scale(1.1)" : "scale(1)",
            }}
            title={t("cambiar_espanol")}
          />
          <img
            src={banderaUS}
            alt="English"
            onClick={() => cambiarIdioma("en")}
            width={32}
            style={{
              cursor: "pointer",
              borderRadius: 5,
              border: idioma === "en" ? "3px solid #e62caeff" : "2px solid #fff",
              transition: "all 0.35s",
              transform: idioma === "en" ? "scale(1.1)" : "scale(1)",
            }}
            title={t("cambiar_ingles")}
          />
        </div>

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
            boxShadow: "0 3px 6px rgba(0,0,0,0.25)",
            transition: "0.3s",
          }}
        >
          <img src={iconoLupa} alt="buscar" width={18} height={18} />
        </div>

        {searchOpen && (
          <div
            style={{
              position: "absolute",
              top: 45,
              right: 0,
              background: "linear-gradient(90deg, #f6d365, #fda085)",
              color: "#fff",
              padding: "1rem",
              borderRadius: 8,
              boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
              zIndex: 400,
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              minWidth: 220,
            }}
          >
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button
                onClick={() => setSearchOpen(false)}
                style={{
                  background: "rgba(255,255,255,0.2)",
                  border: "none",
                  color: "#fff",
                  fontWeight: "bold",
                  borderRadius: 6,
                  cursor: "pointer",
                  padding: "2px 6px",
                  fontSize: 14,
                }}
              >
                X
              </button>
            </div>

            <select onChange={(e) => handleFiltroChange("especie", e.target.value)} value={filtros.especie} style={{ padding: "6px", borderRadius: 6, border: "none" }}>
              <option value="">{t("especie")}</option>
              <option value="perro">{t("perro")}</option>
              <option value="gato">{t("gato")}</option>
              <option value="conejo">{t("conejo")}</option>
              <option value="hamster">{t("hamster")}</option>
            </select>

            <select onChange={(e) => handleFiltroChange("estado", e.target.value)} value={filtros.estado} style={{ padding: "6px", borderRadius: 6, border: "none" }}>
              <option value="">{t("estado")}</option>
              <option value="disponible">{t("disponible")}</option>
              <option value="urgente">{t("urgente")}</option>
              <option value="invisible">{t("invisible")}</option>
            </select>

            <select onChange={(e) => handleFiltroChange("sexo", e.target.value)} value={filtros.sexo} style={{ padding: "6px", borderRadius: 6, border: "none" }}>
              <option value="">{t("sexo")}</option>
              <option value="macho">{t("macho")}</option>
              <option value="hembra">{t("hembra")}</option>
            </select>

            <select onChange={(e) => handleFiltroChange("tamano", e.target.value)} value={filtros.tamano} style={{ padding: "6px", borderRadius: 6, border: "none" }}>
              <option value="">{t("tamano")}</option>
              <option value="mini">{t("mini")}</option>
              <option value="pequeno">{t("pequeno")}</option>
              <option value="mediano">{t("mediano")}</option>
              <option value="grande">{t("grande")}</option>
              <option value="gigante">{t("gigante")}</option>
            </select>

            <select onChange={(e) => handleFiltroChange("ubicacion", e.target.value)} value={filtros.ubicacion} style={{ padding: "6px", borderRadius: 6, border: "none" }}>
              <option value="">{t("ubicacion")}</option>
              <option value="lapaz">{t("lapaz")}</option>
            </select>

            <button
              onClick={() => console.log(filtros)}
              style={{
                marginTop: "0.5rem",
                background: "#fff",
                color: "#f6d365",
                border: "none",
                padding: "8px",
                borderRadius: 6,
                cursor: "pointer",
                fontWeight: "bold",
                boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                transition: "0.25s",
              }}
            >
              {t("buscar")}
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;