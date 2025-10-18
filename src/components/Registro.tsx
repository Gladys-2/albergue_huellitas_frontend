import { useState } from "react";
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

    if (!/^\d+$/.test(cedulaIdentidad)) { alert("Cédula solo puede contener números."); return; }
    if (!/^\+?\d{6,15}$/.test(telefono)) { alert("Teléfono inválido."); return; }
    if (contrasena !== confirmarContrasena) { alert("Las contraseñas no coinciden."); return; }
    if (!genero) { alert("Selecciona un género."); return; }

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
    <div style={pageStyle}>
      <div style={containerStyle}>
        <h2 style={titleStyle}><FaUserShield style={{ marginRight: 8 }} />Registro de Usuario</h2>
        <p style={subtitleStyle}>Crea tu cuenta para ingresar al sistema</p>
        <form onSubmit={handleRegistro} style={formStyle}>
          {/* Filas 3x3 */}
          <InputIcon icon={<FaIdCard />} placeholder="Cédula de Identidad" value={cedulaIdentidad} onChange={setCedulaIdentidad} />
          <InputIcon icon={<FaUser />} placeholder="Nombre" value={nombre} onChange={setNombre} />
          <InputIcon icon={<FaUser />} placeholder="Apellido Paterno" value={apellidoPaterno} onChange={setApellidoPaterno} />
          <InputIcon icon={<FaUser />} placeholder="Apellido Materno" value={apellidoMaterno} onChange={setApellidoMaterno} />
          <InputIcon icon={<FaPhone />} placeholder="Teléfono" value={telefono} onChange={setTelefono} />
          {/* Campos que ocupan toda la fila */}
          <InputIcon icon={<FaEnvelope />} placeholder="Correo electrónico" value={correoElectronico} onChange={setCorreoElectronico} type="email" style={{ gridColumn: "span 3" }} />
          <InputIcon icon={<FaLock />} placeholder="Contraseña" value={contrasena} onChange={setContrasena} type="password" style={{ gridColumn: "span 3" }} />
          <InputIcon icon={<FaLock />} placeholder="Confirmar contraseña" value={confirmarContrasena} onChange={setConfirmarContrasena} type="password" style={{ gridColumn: "span 3" }} />
          <select value={genero} onChange={(e) => setGenero(e.target.value)} style={{ ...selectStyle, gridColumn: "span 3" }} required>
            <option value="">Selecciona género</option>
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
            <option value="Otro">Otro</option>
          </select>
          <select value={rol} disabled style={{ ...selectStyle, gridColumn: "span 3" }}>
            <option value="usuario">Usuario</option>
          </select>
          <button type="submit" style={{ ...buttonStyle, gridColumn: "span 3" }}>Crear cuenta</button>
        </form>

        <p style={socialTextStyle}>O regístrate con</p>
        <div style={socialContainerStyle}>
          <a href="https://accounts.google.com/signin" target="_blank" rel="noopener noreferrer"><FcGoogle style={{ fontSize: 28 }} /></a>
          <a href="https://www.facebook.com/login/" target="_blank" rel="noopener noreferrer" style={{ color: "#4267B2" }}><FaFacebookF style={{ fontSize: 28 }} /></a>
          <a href="https://appleid.apple.com/sign-in" target="_blank" rel="noopener noreferrer" style={{ color: "#000" }}><FaApple style={{ fontSize: 28 }} /></a>
        </div>

        <p style={footerTextStyle}>
          ¿Ya tienes cuenta? <span onClick={mostrarLogin} style={linkStyle}>Inicia sesión</span>
        </p>
      </div>
    </div>
  );
};

const InputIcon: React.FC<{icon: React.ReactNode, placeholder: string, value: string, onChange: (val:string)=>void, type?:string, style?:React.CSSProperties}> = ({ icon, placeholder, value, onChange, type="text", style }) => (
  <div style={{ ...inputGroup, ...style }}>
    {icon}
    <input type={type} placeholder={placeholder} value={value} onChange={e=>onChange(e.target.value)} style={inputStyle} required />
  </div>
);

// === Estilos ===
const pageStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  backgroundColor: "#f0f2f5",
  padding: 20,
};

const containerStyle: React.CSSProperties = {
  width: "100%",
  maxWidth: 700,
  padding: 30,
  borderRadius: 12,
  boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
  backgroundColor: "#fff",
  fontFamily: "Arial, sans-serif",
};

const titleStyle: React.CSSProperties = { textAlign: "center", marginBottom: 10, color: "#333", fontSize: 24 };
const subtitleStyle: React.CSSProperties = { textAlign: "center", marginBottom: 20, color: "#555", fontSize: 16 };

const formStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  gap: 12,
};

const inputStyle: React.CSSProperties = { width: "100%", padding: 12, borderRadius: 8, border: "1px solid #ccc", fontSize: 14, outline: "none" };
const selectStyle: React.CSSProperties = { width: "100%", padding: 12, borderRadius: 8, border: "1px solid #ccc", fontSize: 14, marginTop: 6, outline: "none" };
const inputGroup: React.CSSProperties = { display: "flex", alignItems: "center", gap: 8 };

const buttonStyle: React.CSSProperties = { padding: 14, borderRadius: 8, border: "none", backgroundColor: "#f39c12", color: "#fff", fontWeight: "bold", cursor: "pointer", transition: "0.3s", fontSize: 16 };
const socialTextStyle: React.CSSProperties = { textAlign: "center", margin: "15px 0", color: "#666" };
const socialContainerStyle: React.CSSProperties = { display: "flex", justifyContent: "center", gap: 20, marginBottom: 20 };
const footerTextStyle: React.CSSProperties = { textAlign: "center", color: "#666", fontSize: 14 };
const linkStyle: React.CSSProperties = { cursor: "pointer", color: "#f39c12", fontWeight: "bold" };

export default Registro;