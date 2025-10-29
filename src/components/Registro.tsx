import React, { useState } from "react";
import {
  FaFacebookF,
  FaApple,
  FaUserShield,
  FaEnvelope,
  FaLock,
  FaIdCard,
  FaUser,
} from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { MdPhoneIphone } from "react-icons/md";

interface RegistroProps {
  mostrarLogin: () => void;
}

const Registro: React.FC<RegistroProps> = ({ mostrarLogin }) => {
  const [nombre, setNombre] = useState("");
  const [apellidoPaterno, setApellidoPaterno] = useState("");
  const [apellidoMaterno, setApellidoMaterno] = useState("");
  const [cedulaIdentidad, setCedulaIdentidad] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correoElectronico, setCorreoElectronico] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [confirmarContrasena, setConfirmarContrasena] = useState("");
  const [genero, setGenero] = useState("");

  const handleRegistro = async (e: React.FormEvent) => {
    e.preventDefault();

    if (contrasena !== confirmarContrasena) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    if (!genero) {
      alert("Selecciona un género.");
      return;
    }

    const generoBackend =
      genero === "Masculino" ? "M" : genero === "Femenino" ? "F" : "O";

    const nuevoUsuario = {
      nombre,
      apellido_paterno: apellidoPaterno,
      apellido_materno: apellidoMaterno,
      cedula_identidad: cedulaIdentidad,
      telefono: `+591${telefono}`,
      correo_electronico: correoElectronico,
      contrasena,
      rol: "usuario",
      genero: generoBackend,
      estado: "Activo",
    };

    try {
      const respuesta = await fetch("http://localhost:5000/api/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoUsuario),
      });

      let data;
      try {
        data = await respuesta.json();
      } catch {
        data = { message: "Error al procesar la respuesta del servidor" };
      }

      if (respuesta.ok) {
        alert("Usuario registrado correctamente. Ahora inicia sesión.");
        mostrarLogin();
      } else {
        alert(`Error: ${data.message || "Revise los datos ingresados"}`);
      }
    } catch (error: any) {
      console.error(error);
      alert(
        `Error al registrar usuario: ${
          error?.message || "Revise los datos ingresados"
        }`
      );
    }
  };

  // Validaciones de inputs
  const handleNombreChange = (value: string) => {
    if (/^[A-ZÁÉÍÓÚÑa-záéíóúñ\s]{0,50}$/.test(value)) setNombre(value);
  };
  const handleApellidoPChange = (value: string) => {
    if (/^[A-ZÁÉÍÓÚÑa-záéíóúñ\s]{0,50}$/.test(value))
      setApellidoPaterno(value);
  };
  const handleApellidoMChange = (value: string) => {
    if (/^[A-ZÁÉÍÓÚÑa-záéíóúñ\s]{0,50}$/.test(value))
      setApellidoMaterno(value);
  };
  const handleCedulaChange = (value: string) => {
    if (/^\d{0,10}$/.test(value)) setCedulaIdentidad(value);
  };
  const handleTelefonoChange = (value: string) => {
    if (/^\d{0,8}$/.test(value)) setTelefono(value);
  };

  return (
    <div style={wrapperStyle}>
      <div style={rightSideStyle}>
        <div style={glassContainer}>
          <h2 style={{ ...titleStyle, textAlign: "center" }}>
            <FaUserShield style={{ marginRight: 9 }} />
            Registro de Usuario
          </h2>
          <p style={{ ...subtitleStyle, textAlign: "center" }}>
            Bienvenido a Huellitas
          </p>

          <form onSubmit={handleRegistro} style={formStyle}>
            <div style={filaStyle}>
              <InputIcon
                icon={<FaUser />}
                placeholder="Nombre"
                value={nombre}
                onChange={handleNombreChange}
              />
              <InputIcon
                icon={<FaUser />}
                placeholder="Apellido Paterno"
                value={apellidoPaterno}
                onChange={handleApellidoPChange}
              />
              <InputIcon
                icon={<FaUser />}
                placeholder="Apellido Materno"
                value={apellidoMaterno}
                onChange={handleApellidoMChange}
              />
            </div>

            <div style={filaStyle}>
              <InputIcon
                icon={<FaIdCard />}
                placeholder="Cédula de Identidad"
                value={cedulaIdentidad}
                onChange={handleCedulaChange}
              />
              <div style={phoneGroupStyle}>
                <button type="button" style={prefixButton}>
                  +591
                </button>
                <MdPhoneIphone style={{ fontSize: 20, color: "#000" }} />
                <input
                  type="text"
                  placeholder="Número (8 dígitos)"
                  value={telefono}
                  onChange={(e) => handleTelefonoChange(e.target.value)}
                  style={phoneInput}
                  required
                />
              </div>
              <InputIcon
                icon={<FaEnvelope />}
                placeholder="Correo Electrónico"
                value={correoElectronico}
                onChange={setCorreoElectronico}
                type="email"
              />
            </div>

            <div style={filaStyle}>
              <InputIcon
                icon={<FaLock />}
                placeholder="Contraseña"
                value={contrasena}
                onChange={setContrasena}
                type="password"
              />
              <InputIcon
                icon={<FaLock />}
                placeholder="Confirmar Contraseña"
                value={confirmarContrasena}
                onChange={setConfirmarContrasena}
                type="password"
              />
              <select
                value={genero}
                onChange={(e) => setGenero(e.target.value)}
                style={selectStyle}
                required
              >
                <option value="">Selecciona género</option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
                <option value="Otro">Otro</option>
              </select>
            </div>

            <button type="submit" style={buttonStyle}>
              Crear cuenta
            </button>
          </form>

          <p style={{ ...socialTextStyle, textAlign: "center" }}>
            O regístrate con
          </p>
          <div style={socialContainerStyle}>
            <a
              href="https://accounts.google.com/signin"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FcGoogle style={{ fontSize: 28 }} />
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
              <FaApple style={{ fontSize: 28 }} />
            </a>
          </div>

          <p style={{ ...footerTextStyle, textAlign: "center" }}>
            ¿Ya tienes cuenta?{" "}
            <button onClick={mostrarLogin} style={linkStyle}>
              Inicia sesión
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

const wrapperStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "90vh",
  background: "linear-gradient(135deg, #151414ff, #000000ff, #121111ff)",
  fontFamily: "Poppins, sans-serif",
  padding: "20px",
};
const rightSideStyle: React.CSSProperties = { width: "100%", maxWidth: 900 };
const glassContainer: React.CSSProperties = {
  background: "rgba(237, 239, 240, 0.2)",
  borderRadius: 30,
  padding: "30px 25px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
  border: "3px solid rgba(193, 172, 20, 0.96)",
  color: "#a4920cff",
};
const titleStyle: React.CSSProperties = {
  fontSize: 24,
  fontWeight: 900,
  marginBottom: 8,
  color: "#9ca40eff",
};
const subtitleStyle: React.CSSProperties = {
  fontSize: 15,
  color: "#d0d0d0",
  marginBottom: 20,
};
const formStyle: React.CSSProperties = { display: "flex", flexDirection: "column", gap: 15 };
const filaStyle: React.CSSProperties = {
  display: "flex",
  gap: 10,
  flexWrap: "wrap",
  justifyContent: "center",
};
const inputGroup: React.CSSProperties = {
  flex: 1,
  display: "flex",
  alignItems: "center",
  gap: 8,
  border: "1px solid rgba(255,255,255,0.8)",
  padding: "10px 12px",
  borderRadius: 10,
  backgroundColor: "rgba(255,255,255,0.7)",
  minWidth: 110,
};
const inputStyle: React.CSSProperties = {
  width: "100%",
  border: "none",
  outline: "none",
  background: "transparent",
  fontSize: 14,
  color: "#101111ff",
};
const selectStyle: React.CSSProperties = {
  padding: "10px 12px",
  borderRadius: 10,
  border: "1px solid rgba(255,255,255,0.9)",
  backgroundColor: "rgba(255,255,255,0.7)",
  color: "#101111ff",
  outline: "none",
  flex: 1,
  minWidth: 150,
};
const buttonStyle: React.CSSProperties = {
  padding: "10px 0",
  borderRadius: 10,
  border: "none",
  background: "linear-gradient(90deg, #161616ff, #b8c316c4)",
  color: "#fff",
  fontWeight: 600,
  fontSize: 16,
  cursor: "pointer",
  marginTop: 10,
  transition: "all 0.3s ease",
  boxShadow: "0 4px 15px rgba(0,0,0,0.4)",
};
const socialTextStyle: React.CSSProperties = {
  color: "#c1af0bff",
  margin: "15px 0 10px",
  fontSize: 14,
};
const socialContainerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  gap: 35,
  marginBottom: 20,
};
const footerTextStyle: React.CSSProperties = { color: "#e1e43cda", fontSize: 14 };
const linkStyle: React.CSSProperties = {
  background: "none",
  border: "none",
  color: "#f7f9ffff",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: 14,
  transition: "0.3s ease",
};
const phoneGroupStyle: React.CSSProperties = {
  flex: 1,
  display: "flex",
  alignItems: "center",
  backgroundColor: "rgba(255,255,255,0.7)",
  borderRadius: 10,
  border: "1px solid rgba(255,255,255,0.8)",
  padding: "5px 10px",
  gap: 5,
};
const prefixButton: React.CSSProperties = {
  backgroundColor: "#a5a510ff",
  color: "white",
  border: "none",
  borderRadius: 8,
  padding: "6px 10px",
  fontSize: 13,
  fontWeight: "bold",
};
const phoneInput: React.CSSProperties = {
  flex: 1,
  border: "none",
  outline: "none",
  background: "transparent",
  fontSize: 14,
};

export default Registro;