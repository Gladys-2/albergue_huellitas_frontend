import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF, FaApple, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { t } from "../i18n";
import { useIdioma } from "./context/IdiomaContext";
import axios from "axios";

interface LoginScreenProps {
  mostrarRegistro: () => void;
  onLoginExitoso: (usuario: any) => void;
}

const API_URL = "http://localhost:5000/api/auth";

const LoginScreen: React.FC<LoginScreenProps> = ({ mostrarRegistro, onLoginExitoso }) => {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [mostrarContrasena, setMostrarContrasena] = useState(false);

  useIdioma();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/login`, {
        correo_electronico: correo,
        contrasena,
      });

      if (response.data.usuario) {
        onLoginExitoso(response.data.usuario);
      } else {
        setError(response.data.message || "Usuario o contraseña incorrecta");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Usuario o contraseña incorrecta");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={wrapperStyle}>
      <div style={glassContainer}>
        <h2 style={titleStyle}>{t("Bienvenido a Huellitas")}</h2>
        <p style={subtitleStyle}>{t("Inicia sesión para continuar")}</p>

        <form onSubmit={handleLogin} style={formStyle}>
          <div style={inputGroup}>
            <FaEnvelope style={{ color: "#000" }} />
            <input
              type="email"
              placeholder={t("Correo Electrónico")}
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              style={inputStyle}
              required
            />
          </div>

          <div style={{ ...inputGroup, position: "relative" }}>
            <FaLock style={{ color: "#000" }} />
            <input
              type={mostrarContrasena ? "text" : "password"}
              placeholder={t("Contraseña")}
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              style={{ ...inputStyle, paddingRight: "2rem" }}
              required
            />
            <span
              style={eyeIconStyle}
              onClick={() => setMostrarContrasena(!mostrarContrasena)}
            >
              {mostrarContrasena ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {error && <p style={{ color: "red", marginTop: 10 }}>{error}</p>}

          <button type="submit" style={buttonStyle} disabled={loading}>
            {loading ? "Cargando..." : t("Iniciar Sesión")}
          </button>
        </form>

        <p style={socialTextStyle}>{t("O inicia sesión con")}</p>
        <div style={socialContainerStyle}>
          <a href="https://accounts.google.com/signin" target="_blank" rel="noopener noreferrer">
            <FcGoogle style={{ fontSize: 30 }} />
          </a>
          <a href="https://www.facebook.com/login/" target="_blank" rel="noopener noreferrer" style={{ color: "#3967c1ff" }}>
            <FaFacebookF style={{ fontSize: 28 }} />
          </a>
          <a href="https://appleid.apple.com/sign-in" target="_blank" rel="noopener noreferrer" style={{ color: "#000" }}>
            <FaApple style={{ fontSize: 30 }} />
          </a>
        </div>

        <p style={footerTextStyle}>
          {t("¿No tienes cuenta?")}{" "}
          <button onClick={mostrarRegistro} style={linkStyle}>{t("Crear cuenta")}</button>
        </p>
      </div>
    </div>
  );
};

const wrapperStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "100vh",
  overflow: "hidden", 
  fontFamily: "Poppins, sans-serif",
  backgroundImage: 'url("src/assets/LG.jpeg")',
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
};

const glassContainer: React.CSSProperties = {
  width: "90%",
  maxWidth: 370,
  maxHeight: "95vh", // evita scroll vertical externo
  overflowY: "auto", // scroll interno si hace falta
  textAlign: "center",
  background: "rgba(255, 255, 255, 0.1)",
  borderRadius: "1.25rem",
  padding: "2rem 1rem",
  backdropFilter: "blur(5px)",
  color: "#000",
  boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
};

const titleStyle: React.CSSProperties = { fontSize: "2rem", fontWeight: 600, marginBottom: 10, color: "#090808ff" };
const subtitleStyle: React.CSSProperties = { fontSize: "1rem", marginBottom: 15, color: "#393838ff" };
const formStyle: React.CSSProperties = { display: "flex", flexDirection: "column", gap: 14 };
const inputGroup: React.CSSProperties = { display: "flex", alignItems: "center", gap: "0.6rem", padding: "0.5rem 0.8rem", borderRadius: "0.625rem", backgroundColor: "rgba(255,255,255,0.2)" };
const inputStyle: React.CSSProperties = { width: "100%", border: "none", outline: "none", background: "transparent", color: "#000", fontSize: "1rem" };
const eyeIconStyle: React.CSSProperties = { position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", cursor: "pointer", color: "#fdfdfd1e" };
const buttonStyle: React.CSSProperties = { padding: "12px 0", borderRadius: 10, border: "none", background: "linear-gradient(90deg, #5f5757ff, #c59526ff)", color: "#fff", fontWeight: 600, fontSize: "1rem", cursor: "pointer", transition: "all 0.3s ease",  } ;
const socialTextStyle: React.CSSProperties = { color: "#000", margin: "15px 0 10px", fontSize: 15 };
const socialContainerStyle: React.CSSProperties = { display: "flex", justifyContent: "center", gap: 25, marginBottom: 20 };
const footerTextStyle: React.CSSProperties = { color: "#0b0b0b", fontSize: 14 };
const linkStyle: React.CSSProperties = { background: "none", border: "none", color: "#000", cursor: "pointer", fontWeight: "bold", fontSize: 14 };

export default LoginScreen;