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
    if (cedulaIdentidad.length !== 8) {
      alert("La cédula de identidad debe tener 8 números.");
      return;
    }
    if (telefono.length !== 8) {
      alert("El teléfono debe tener 8 números.");
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
        headers: { "Content-Type": "application/json" },
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
        `Error al registrar usuario: ${error?.message || "Revise los datos ingresados"}`
      );
    }
  };

  return (
    <div style={wrapperStyle}>
      <style>
        {`
          .input-placeholder::placeholder {
            color: #ffffffff; 
            opacity: 1;     
          }
          @media (max-width: 768px) {
            .fila {
              flex-direction: column !important;
              align-items: stretch !important;
            }
          }
        `}
      </style>

      <div style={glassContainer}>
        <h2 style={titleStyle}>
          <FaUserShield style={{ marginRight: 8 }} />
          Registro de Usuario
        </h2>
        <p style={subtitleStyle}>Bienvenido a Huellitas</p>

        <form onSubmit={handleRegistro} style={formStyle}>
          <div style={filaStyle} className="fila">
            <InputIcon
              icon={<FaUser />}
              placeholder="Nombre"
              value={nombre}
              onChange={(val) => {
                if (/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]*$/.test(val)) setNombre(val);
              }}
            />
            <InputIcon
              icon={<FaUser />}
              placeholder="Apellido Paterno"
              value={apellidoPaterno}
              onChange={(val) => {
                if (/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]*$/.test(val)) setApellidoPaterno(val);
              }}
            />
            <InputIcon
              icon={<FaUser />}
              placeholder="Apellido Materno"
              value={apellidoMaterno}
              onChange={(val) => {
                if (/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]*$/.test(val)) setApellidoMaterno(val);
              }}
            />
          </div>

          <div style={filaStyle} className="fila">
            <InputIcon
              icon={<FaIdCard />}
              placeholder="Cédula de Identidad"
              value={cedulaIdentidad}
              onChange={(val) => {
                if (/^\d{0,8}$/.test(val)) setCedulaIdentidad(val);
              }}
            />
            <div style={{ ...phoneGroupStyle, flex: 1 }}>
              <button type="button" style={prefixButton}>
                +591
              </button>
              <MdPhoneIphone style={{ fontSize: 20, color: "#000000ff" }} />
              <input
                type="text"
                placeholder="Número (8 dígitos)"
                value={telefono}
                onChange={(e) => {
                  const valor = e.target.value;
                  if (/^\d{0,8}$/.test(valor)) setTelefono(valor);
                }}
                style={phoneInput}
                className="input-placeholder"
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

          <div style={filaStyle} className="fila">
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

        <p style={socialTextStyle}>O regístrate con</p>
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

        <p style={footerTextStyle}>
          ¿Ya tienes cuenta?{" "}
          <button onClick={mostrarLogin} style={linkStyle}>
            Inicia sesión
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
      className="input-placeholder"
      required
    />
  </div>
);

const wrapperStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  width: "100vw",
  fontFamily: "Poppins, sans-serif",
  backgroundImage: `url("src/assets/LOGIN.jpeg")`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  margin: 0,
  overflow: "hidden",
};

const glassContainer: React.CSSProperties = {
  background: "rgba(92, 90, 107, 0.25)",
  borderRadius: 10,
  padding: "9px 15px",
  boxShadow: "0 5px 15px rgba(0,0,0,0.25)",
  border: "2px solid rgba(240,240,240,0.3)",
  color: "#ffffffff",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  maxWidth: 900,
};

const titleStyle: React.CSSProperties = {
  fontSize: "1.5rem",
  fontWeight: 578,
  marginBottom: 0,
  color: "#fff",
  textAlign: "center",
};

const subtitleStyle: React.CSSProperties = {
  fontSize: "1rem",
  marginBottom: 16,
  color: "#fff",
  textAlign: "center",
};

const formStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 6,
  width: "100%",
};

const filaStyle: React.CSSProperties = {
  display: "flex",
  gap: 5.50,
  flexWrap: "wrap",
  justifyContent: "center",
  alignItems: "flex-start",
};

const inputGroup: React.CSSProperties = {
  flex: 1,
  display: "flex",
  alignItems: "center",
  gap: 10,
  padding: "8px 10px",
  borderRadius: 10,
  border: "1px solid white",
  backgroundColor: "transparent",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  minWidth: 150,
  border: "none",
  outline: "none",
  background: "transparent",
  color: "#000000ff",
  fontSize: "1rem",
  padding: "5px",
};

const selectStyle: React.CSSProperties = {
  padding: "12px 12px",
  borderRadius: 12,
  border: "1px solid white",
  backgroundColor: "transparent",
  color: "black",
  outline: "none",
  flex: 1,
  minWidth: 150,
  appearance: "none",
};

const buttonStyle: React.CSSProperties = {
  padding: "11px 0",
  borderRadius: 12,
  border: "none",
  background: "linear-gradient(90deg, #222, #b49217ff)",
  color: "#fff",
  fontWeight:  500,
  fontSize: "1rem",
  cursor: "pointer",
  transition: "all 0.3s ease",
};

const socialTextStyle: React.CSSProperties = {
  color: "#fff",
  margin: "13px 0 0px",
  fontSize: 14,
  textAlign: "center",
};

const socialContainerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  gap: 18,
  marginBottom: 0,
  flexWrap: "wrap",
};

const footerTextStyle: React.CSSProperties = {
  color: "#fff",
  fontSize: 17,
  textAlign: "center",
};

const linkStyle: React.CSSProperties = {
  background: "none",
  border: "none",
  color: "#0a0a0aff",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: 15,
};

const phoneGroupStyle: React.CSSProperties = {
  flex: 1,
  display: "flex",
  alignItems: "center",
  backgroundColor: "transparent",
  borderRadius: 10,
  border: "1px solid white",
  padding: "10px 5px",
  gap: 5,
};

const prefixButton: React.CSSProperties = {
  backgroundColor: "#c5c026",
  color: "#000",
  border: "none",
  borderRadius: 8,
  padding: "0px 8px",
  fontSize: 13,
  fontWeight: "bold",
};

const phoneInput: React.CSSProperties = {
  flex: 1,
  border: "none",
  outline: "none",
  background: "transparent",
  fontSize: 14,
  color: "black",
};

export default Registro;