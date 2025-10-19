import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF, FaApple, FaUserShield, FaEnvelope, FaLock, FaPhone, FaIdCard, FaUser } from "react-icons/fa";

interface RegistroProps {
  onRegister: (usuario: any) => void;
  mostrarLogin: () => void;
}

const Registro: React.FC<RegistroProps> = ({ onRegister, mostrarLogin }) => {
  const [nombre, setNombre] = useState("");
  const [apellidoPaterno, setApellidoPaterno] = useState("");
  const [apellidoMaterno, setApellidoMaterno] = useState("");
  const [cedulaIdentidad, setCedulaIdentidad] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correoElectronico, setCorreoElectronico] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [confirmarContrasena, setConfirmarContrasena] = useState("");
  const [genero, setGenero] = useState("");
  const rol = "usuario";

  const handleRegistro = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!/^\d+$/.test(cedulaIdentidad)) {
      alert("Cédula solo puede contener números.");
      return;
    }
    if (!/^\+?\d{6,15}$/.test(telefono)) {
      alert("Teléfono inválido.");
      return;
    }
    if (contrasena !== confirmarContrasena) {
      alert("Las contraseñas no coinciden.");
      return;
    }
    if (!genero) {
      alert("Selecciona un género.");
      return;
    }

    const generoBackend = genero === "Masculino" ? "M" : genero === "Femenino" ? "F" : "O";

    const nuevoUsuario = {
      nombre,
      apellido_paterno: apellidoPaterno,
      apellido_materno: apellidoMaterno,
      cedula_identidad: cedulaIdentidad,
      telefono,
      correo_electronico: correoElectronico,
      contrasena,
      rol,
      genero: generoBackend,
    };

    try {
      const respuesta = await fetch("http://localhost:5000/api/usuarios/crear-usuario", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoUsuario),
      });

      const data = await respuesta.json();

      if (respuesta.ok) {
        alert("Usuario registrado correctamente");
        onRegister(nuevoUsuario);
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error(error);
      alert("Error de conexión con el servidor.");
    }
  };

  return (
    <div style={wrapperStyle}>
      <div style={rightSideStyle}>
        <div style={glassContainer}>
          <h2 style={titleStyle}>
            <FaUserShield style={{ marginRight: 8 }} />
            Registro de Usuario
          </h2>
          <p style={subtitleStyle}>Bienvenido a Huellitas</p>

          <form onSubmit={handleRegistro} style={formStyle}>
            {/* Fila 1 */}
            <div style={filaStyle}>
              <InputIcon icon={<FaUser />} placeholder="Nombre" value={nombre} onChange={setNombre} />
              <InputIcon icon={<FaUser />} placeholder="Apellido Paterno" value={apellidoPaterno} onChange={setApellidoPaterno} />
              <InputIcon icon={<FaUser />} placeholder="Apellido Materno" value={apellidoMaterno} onChange={setApellidoMaterno} />
            </div>

            {/* Fila 2 */}
            <div style={filaStyle}>
              <InputIcon icon={<FaIdCard />} placeholder="Cédula de Identidad" value={cedulaIdentidad} onChange={setCedulaIdentidad} />
              <InputIcon icon={<FaPhone />} placeholder="Teléfono" value={telefono} onChange={setTelefono} />
              <InputIcon icon={<FaEnvelope />} placeholder="Correo Electrónico" value={correoElectronico} onChange={setCorreoElectronico} type="email" />
            </div>

            {/* Fila 3 */}
            <div style={filaStyle}>
              <InputIcon icon={<FaLock />} placeholder="Contraseña" value={contrasena} onChange={setContrasena} type="password" />
              <InputIcon icon={<FaLock />} placeholder="Confirmar Contraseña" value={confirmarContrasena} onChange={setConfirmarContrasena} type="password" />
              <select value={genero} onChange={(e) => setGenero(e.target.value)} style={selectStyle} required>
                <option value="">Selecciona género</option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
                <option value="Otro">Otro</option>
              </select>
            </div>

            <button type="submit" style={buttonStyle}>Crear cuenta</button>
          </form>

          <p style={socialTextStyle}>O regístrate con</p>
          <div style={socialContainerStyle}>
            <a href="https://accounts.google.com/signin" target="_blank" rel="noopener noreferrer"><FcGoogle style={{ fontSize: 28 }} /></a>
            <a href="https://www.facebook.com/login/" target="_blank" rel="noopener noreferrer" style={{ color: "#3967c1ff" }}><FaFacebookF style={{ fontSize: 28 }} /></a>
            <a href="https://appleid.apple.com/sign-in" target="_blank" rel="noopener noreferrer" style={{ color: "#000" }}><FaApple style={{ fontSize: 28 }} /></a>
          </div>

          <p style={footerTextStyle}>
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

const InputIcon: React.FC<{ icon: React.ReactNode; placeholder: string; value: string; onChange: (val: string) => void; type?: string }> = ({
  icon,
  placeholder,
  value,
  onChange,
  type = "text",
}) => (
  <div style={inputGroup}>
    {icon}
    <input type={type} placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} style={inputStyle} required />
  </div>
);

{/*Estilos*/}
const wrapperStyle: React.CSSProperties = {
  display: "flex",
  height: "90vh",
  fontFamily: "Poppins, sans-serif",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg, #151414ff, #000000ff, #121111ff)",
};

const rightSideStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px",
};

const glassContainer: React.CSSProperties = {
  width: "100%",
  maxWidth: 900, 
  textAlign: "center",
  background: "rgba(237, 239, 240, 0.2)",
  borderRadius: 30,
  padding: "30px 25px",
  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.25)",
  border: "1px solid rgba(27, 199, 185, 0.96)",
  color: "#0ca4a1ff",
};

const titleStyle: React.CSSProperties = {
  fontSize: 24,
  fontWeight: 700,
  marginBottom: 8,
  color: "#0e9fa4ff",
};

const subtitleStyle: React.CSSProperties = {
  fontSize: 15,
  color: "#d0d0d0",
  marginBottom: 20,
};

const formStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 15,
};

const filaStyle: React.CSSProperties = {
  display: "flex",
  gap: 10,
  flexWrap: "wrap",
};

const inputGroup: React.CSSProperties = {
  flex: 1,
  display: "flex",
  alignItems: "center",
  gap: 8,
  border: "1px solid rgba(255, 255, 255, 0.8)",
  padding: "10px 12px",
  borderRadius: 10,
  backgroundColor: "rgba(255, 255, 255, 0.7)",
  minWidth: 110, // para que no se achique demasiado
};

const inputStyle: React.CSSProperties = {
  width: "110%",
  border: "none",
  outline: "none",
  background: "transparent",
  fontSize: 14,
  color: "#101111ff",
};

const selectStyle: React.CSSProperties = {
  padding: "10px 12px",
  borderRadius: 10,
  border: "1px solid rgba(255, 255, 255, 0.9)",
  backgroundColor: "rgba(255, 255, 255, 0.7)",
  color: "#101111ff",
  outline: "none",
  flex: 1,
  minWidth: 150,
};

const buttonStyle: React.CSSProperties = {
  padding: "10px 0",
  borderRadius: 10,
  border: "none",
  background: "linear-gradient(90deg, #161616ff, #187ca0ff)",
  color: "#fff",
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

{/* Estilos adicionales para interacciones */}
const style = document.createElement("style");
style.innerHTML = `
button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(20, 20, 20, 0.2);
}
input:focus, select:focus {
  border-color: #74ffceff !important;
}
`;
document.head.appendChild(style);

export default Registro;