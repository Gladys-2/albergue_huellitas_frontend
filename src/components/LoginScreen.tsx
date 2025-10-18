import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF, FaApple, FaEnvelope, FaLock } from "react-icons/fa";

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
    <div style={containerStyle}>
      <h2 style={titleStyle}>Inicio de sesión</h2>
      <p style={subtitleStyle}>Bienvenido de nuevo</p>

      <form onSubmit={handleLogin} style={formStyle}>
        <InputIcon icon={<FaEnvelope />} placeholder="Correo electrónico" value={correo} onChange={setCorreo} type="email" />
        <InputIcon icon={<FaLock />} placeholder="Contraseña" value={contrasena} onChange={setContrasena} type="password" />
        <button type="submit" style={buttonStyle}>Ingresar</button>
      </form>

      <p style={socialTextStyle}>O inicia sesión con</p>
      <div style={socialContainerStyle}>
        <a href="https://accounts.google.com/signin" target="_blank" rel="noopener noreferrer">
          <FcGoogle style={{ fontSize: 28 }} />
        </a>
        <a href="https://www.facebook.com/login/" target="_blank" rel="noopener noreferrer" style={{ color: "#4267B2" }}>
          <FaFacebookF style={{ fontSize: 28 }} />
        </a>
        <a href="https://appleid.apple.com/sign-in" target="_blank" rel="noopener noreferrer" style={{ color: "#000" }}>
          <FaApple style={{ fontSize: 28 }} />
        </a>
      </div>

      <p style={footerTextStyle}>
        ¿No tienes cuenta?{" "}
        <button onClick={mostrarRegistro} style={linkStyle}>
          Crear cuenta
        </button>
      </p>
    </div>
  );
};

const InputIcon: React.FC<{ icon: React.ReactNode, placeholder: string, value: string, onChange: (val:string)=>void, type?:string }> = ({ icon, placeholder, value, onChange, type="text" }) => (
  <div style={inputGroup}>
    {icon}
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={e => onChange(e.target.value)}
      style={inputStyle}
      required
    />
  </div>
);

// === Estilos Responsivos ===
const containerStyle: React.CSSProperties = {
  maxWidth: 400,
  width: "150%",
  margin: "90px auto",
  padding: 20,
  borderRadius: 50,
  boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
  backgroundColor: "#fff",
  fontFamily: "Arial, sans-serif"
};
const titleStyle: React.CSSProperties = { textAlign: "center", marginBottom: 10, color: "#333", fontSize: 24 };
const subtitleStyle: React.CSSProperties = { textAlign: "center", marginBottom: 20, color: "#555", fontSize: 16 };
const formStyle: React.CSSProperties = { display: "flex", flexDirection: "column", gap: 12 };
const inputStyle: React.CSSProperties = { width: "100%", padding: 12, borderRadius: 8, border: "1px solid #ccc", fontSize: 14, outline: "none" };
const inputGroup: React.CSSProperties = { display: "flex", alignItems: "center", gap: 8 };
const buttonStyle: React.CSSProperties = {
  padding: 10,
  borderRadius: 7,
  border: "none",
  backgroundColor: "#f39c12",
  color: "#fff",
  fontWeight: "bold",
  cursor: "pointer",
  transition: "0.3s",
  fontSize:15
};
const socialTextStyle: React.CSSProperties = { textAlign: "center", margin: "15px 0", color: "#666" };
const socialContainerStyle: React.CSSProperties = { display: "flex", justifyContent: "center", gap: 20, marginBottom: 20 };
const footerTextStyle: React.CSSProperties = { textAlign: "center", color: "#666", fontSize: 14 };
const linkStyle: React.CSSProperties = { background: "none", border: "none", color: "#f39c12", cursor: "pointer", fontWeight: "bold" };

export default LoginScreen;