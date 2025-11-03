import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF, FaApple, FaEnvelope, FaLock } from "react-icons/fa";

const globalStyles = document.createElement("style");
globalStyles.innerHTML = `
  html, body {
    margin: 0;
    padding: 0;
    overflow: hidden; 
    width: 100%;
    height: 100%;
  }
`;
document.head.appendChild(globalStyles);

interface LoginScreenProps {
  onLogin: (correo: string, contrasena: string) => void;
  mostrarRegistro: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, mostrarRegistro }) => {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(correo, contrasena);
  };

  return (
    <div style={wrapperStyle}>
      <div style={glassContainer}>
        <h2 style={titleStyle}>Bienvenido a Huellitas</h2>
        <p style={subtitleStyle}>Inicia sesión para continuar</p>

        <form onSubmit={handleLogin} style={formStyle}>
          <InputIcon
            icon={<FaEnvelope />}
            placeholder="Correo Electrónico"
            value={correo}
            onChange={setCorreo}
            type="email"
          />
          <InputIcon
            icon={<FaLock />}
            placeholder="Contraseña"
            value={contrasena}
            onChange={setContrasena}
            type="password"
          />
          <button type="submit" style={buttonStyle}>
            Iniciar Sesión
          </button>
        </form>

        <p style={socialTextStyle}>O inicia sesión con</p>

        <div style={socialContainerStyle}>
          <a href="https://accounts.google.com/signin" target="_blank" rel="noopener noreferrer">
            <FcGoogle style={{ fontSize: 30 }} />
          </a>
          <a
            href="https://www.facebook.com/login/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#3967c1ff" }}
          >
            <FaFacebookF style={{ fontSize: 28 }} />
          </a>
          <a
            href="https://appleid.apple.com/sign-in"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#000" }}
          >
            <FaApple style={{ fontSize: 30 }} />
          </a>
        </div>

        <p style={footerTextStyle}>
          ¿No tienes cuenta?{" "}
          <button onClick={mostrarRegistro} style={linkStyle}>
            Crear cuenta
          </button>
        </p>
      </div>
    </div>
  );
};

const InputIcon: React.FC<{
  icon: React.ReactNode;
  placeholder: string;
  value: string;
  onChange: (val: string) => void;
  type?: string;
}> = ({ icon, placeholder, value, onChange, type = "text" }) => (
  <div style={inputGroup}>
    {icon}
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={inputStyle}
      required
    />
  </div>
);

{/* Estilos */}
const wrapperStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100vw",
  height: "100vh",
  fontFamily: "Poppins, sans-serif",
  backgroundImage: `url("src/assets/LG.jpeg")`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
};

const glassContainer: React.CSSProperties = {
  width: "90%",
  maxWidth: 400,
  textAlign: "center",
  background: "rgba(255, 255, 255, 0.1)", 
  borderRadius: "1.25rem",
  padding: "3rem 2rem",
  backdropFilter: "blur(12px)",
  color: "#ffffffff",
  boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
};

const titleStyle: React.CSSProperties = {
  fontSize: "2rem",
  fontWeight: 700,
  marginBottom: 10,
  color: "#090808ff",
};

const subtitleStyle: React.CSSProperties = {
  fontSize: "1rem",
  marginBottom: 25,
  color: "#393838ff",
};

const formStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 15,
};

const inputGroup: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "0.6rem",
  padding: "0.6rem 0.8rem",
  borderRadius: "0.625rem",
  backgroundColor: "rgba(255,255,255,0.2)",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  border: "none",
  outline: "none",
  background: "transparent",
  color: "#fff",
  fontSize: "1rem",
};

const buttonStyle: React.CSSProperties = {
  padding: "12px 0",
  borderRadius: 10,
  border: "none",
  background: "linear-gradient(90deg, #5f5757ff, #c59526ff)",
  color: "#fff",
  fontWeight: 600,
  fontSize: "1rem",
  cursor: "pointer",
  transition: "all 0.3s ease",
};

const socialTextStyle: React.CSSProperties = {
  color: "#fffbfbff",
  margin: "15px 0 10px",
  fontSize: 14,
};

const socialContainerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  gap: 25,
  marginBottom: 20,
};

const footerTextStyle: React.CSSProperties = {
  color: "#0b0b0bff",
  fontSize: 14,
};

const linkStyle: React.CSSProperties = {
  background: "none",
  border: "none",
  color: "#000000ff",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: 14,
};

{/* Media queries para responsiveness */}
const mediaQuery = `
@media (max-width: 1024px) {
  div[style*="backdrop-filter"] {
    width: 85%;
    padding: 2.5rem 1.5rem;
  }
  input { font-size: 0.95rem; }
  button { font-size: 0.95rem; }
}
@media (max-width: 768px) {
  div[style*="backdrop-filter"] {
    width: 90%;
    padding: 2rem 1rem;
  }
  input { font-size: 0.9rem; }
  button { font-size: 0.9rem; }
}
@media (max-width: 480px) {
  div[style*="backdrop-filter"] {
    width: 95%;
    padding: 1.5rem 1rem;
  }
  input { font-size: 0.85rem; }
  button { font-size: 0.85rem; }
}
`;
const style = document.createElement("style");
style.innerHTML = mediaQuery;
document.head.appendChild(style);

export default LoginScreen;