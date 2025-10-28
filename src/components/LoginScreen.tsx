import React, { useState } from "react";
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
    <div style={wrapperStyle}>
      {/* el lado izquierdo es la imagen */}
      <div style={leftSideStyle}></div>

      {/* el lado derecho es el login*/}
      <div style={rightSideStyle}>
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
            <a href="https://www.facebook.com/login/" target="_blank" rel="noopener noreferrer" style={{ color: "#3967c1ff" }}>
              <FaFacebookF style={{ fontSize: 28 }} />
            </a>
            <a href="https://appleid.apple.com/sign-in" target="_blank" rel="noopener noreferrer" style={{ color: "#000" }}>
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

{/*Estilos */}
const wrapperStyle: React.CSSProperties = {
  display: "flex",
  height: "95vh",
  fontFamily: "Poppins, sans-serif",
  background: "linear-gradient(135deg, #151414ff, #000000ff, #121111ff)",
};

const leftSideStyle: React.CSSProperties = {
  flex: 1,
  backgroundImage: `url("src/assets/login-image.jpeg")`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  display: "none",
};

const rightSideStyle: React.CSSProperties = {
  flex: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backdropFilter: "blur(10px)",
};

const glassContainer: React.CSSProperties = {
  width: "90%",
  maxWidth: 399,
  textAlign: "center",
  background: "rgba(237, 239, 240, 0.2)",
  borderRadius: 30,
  padding: "35px 30px",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.25)",
  border: "1px solid rgba(27, 199, 185, 0.96)",
  color: "#0ca4a1ff",
};

const titleStyle: React.CSSProperties = {
  fontSize: 28,
  fontWeight: 700,
  marginBottom: 8,
  letterSpacing: 0.8,
  color: "#0e9fa4ff",
};

const subtitleStyle: React.CSSProperties = {
  fontSize: 15,
  color: "#e0e0e0ff",
  marginBottom: 25,
};

const formStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 15,
};

const inputGroup: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 9,
  border: "1px solid rgba(255, 255, 255, 0.96)",
  padding: "10px 12px",
  borderRadius: 10,
  backgroundColor: "rgba(255, 255, 255, 0.69)",
  transition: "0.3s",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  border: "none",
  outline: "none",
  background: "transparent",
  fontSize: 14,
  color: "#101111ff",
};

const buttonStyle: React.CSSProperties = {
  padding: "11px 0",
  borderRadius: 10,
  border: "none",
  background: "linear-gradient(90deg, #161616ff, #187ca0ff)",
  color: "#ffffffff",
  fontWeight: 600,
  fontSize: 16,
  cursor: "pointer",
  marginTop: 10,
  transition: "all 0.3s ease",
  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.4)",
};

const socialTextStyle: React.CSSProperties = {
  color: "#79a4dfff",
  margin: "15px 0 10px",
  fontSize: 14,
};

const socialContainerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  gap: 35,
  marginBottom: 20,
};

const footerTextStyle: React.CSSProperties = {
  color: "#70afe9ff",
  fontSize: 14,
};

const linkStyle: React.CSSProperties = {
  background: "none",
  border: "none",
  color: "#f7f9ffff",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: 14,
  transition: "0.3s ease",
};

const style = document.createElement("style");
style.innerHTML = `
@media (min-width: 768px) {
  div[style*="background-image"] {
    display: block !important;
  }
}
button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(28, 26, 26, 0.5);
}
input:focus {
  border-color: #74ffceff !important;
}
`;
document.head.appendChild(style);

export default LoginScreen;