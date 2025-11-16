import React, { useState, useEffect, type CSSProperties } from "react";
import type { Usuario } from "../types/types";

type UsuarioModal = Omit<Usuario, "avatarUrl"> & { id?: number; contrasena?: string };

interface ModalProps {
  usuario: Usuario | null;
  usuarioLogueado: Usuario | null;
  onClose: () => void;
  onSave: (usuario: UsuarioModal) => void;
}

const ModalUsuario: React.FC<ModalProps> = ({ usuario, usuarioLogueado, onClose, onSave }) => {
  const soyAdmin = usuarioLogueado?.rol === "administrador";

  const [nombre, setNombre] = useState("");
  const [apellidoPaterno, setApellidoPaterno] = useState("");
  const [apellidoMaterno, setApellidoMaterno] = useState("");
  const [cedulaIdentidad, setCedulaIdentidad] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correoElectronico, setCorreoElectronico] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [rol, setRol] = useState<"usuario" | "administrador">("usuario");
  const [genero, setGenero] = useState<"M" | "F" | "O">("O");
  const [estado, setEstado] = useState<"Activo" | "Inactivo">("Activo");

  useEffect(() => {
    if (usuario) {
      setNombre(usuario.nombre ?? "");
      setApellidoPaterno(usuario.apellido_paterno ?? "");
      setApellidoMaterno(usuario.apellido_materno ?? "");
      setCedulaIdentidad(usuario.cedula_identidad ?? "");
      setTelefono(usuario.telefono ?? "");
      setCorreoElectronico(usuario.correo_electronico ?? "");
      setContrasena("");
      setRol((usuario.rol ?? "usuario") as "usuario" | "administrador");
      setGenero((usuario.genero ?? "O") as "M" | "F" | "O");
      setEstado((usuario.estado ?? "Activo") as "Activo" | "Inactivo");
    } else {
      setNombre("");
      setApellidoPaterno("");
      setApellidoMaterno("");
      setCedulaIdentidad("");
      setTelefono("");
      setCorreoElectronico("");
      setContrasena("");
      setRol("usuario");
      setGenero("O");
      setEstado("Activo");
    }
  }, [usuario]);

  const handleSubmit = () => {
    if (!soyAdmin) return; 
    if (!nombre || !apellidoPaterno || !apellidoMaterno || !correoElectronico) {
      alert("Por favor, completa todos los campos obligatorios.");
      return;
    }

    const usuarioAGuardar: UsuarioModal = {
      id: usuario?.id,
      nombre,
      apellido_paterno: apellidoPaterno,
      apellido_materno: apellidoMaterno,
      cedula_identidad: cedulaIdentidad,
      telefono,
      correo_electronico: correoElectronico,
      email: correoElectronico,
      correo: correoElectronico,
      rol,
      genero,
      estado,
    };

    if (contrasena) {
      usuarioAGuardar.contrasena = contrasena;
    }

    onSave(usuarioAGuardar);
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 500,
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "20px",
          padding: "30px 40px",
          width: "100%",
          maxWidth: "500px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
        }}
      >
        <h2
          style={{
            marginBottom: 20,
            fontSize: 24,
            fontWeight: "bold",
            background: "linear-gradient(90deg, #137497, #f59e0b)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {usuario ? "Editar Usuario" : "Crear Usuario"}
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <input type="text" placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} style={inputStyle} disabled={!soyAdmin} />
          <input type="text" placeholder="Apellido Paterno" value={apellidoPaterno} onChange={e => setApellidoPaterno(e.target.value)} style={inputStyle} disabled={!soyAdmin} />
          <input type="text" placeholder="Apellido Materno" value={apellidoMaterno} onChange={e => setApellidoMaterno(e.target.value)} style={inputStyle} disabled={!soyAdmin} />
          <input type="text" placeholder="Cédula de Identidad" value={cedulaIdentidad} onChange={e => setCedulaIdentidad(e.target.value)} style={inputStyle} disabled={!soyAdmin} />
          <input type="text" placeholder="Teléfono" value={telefono} onChange={e => setTelefono(e.target.value)} style={inputStyle} disabled={!soyAdmin} />
          <input type="email" placeholder="Correo Electrónico" value={correoElectronico} onChange={e => setCorreoElectronico(e.target.value)} style={inputStyle} disabled={!soyAdmin} />
          <input type="password" placeholder={usuario ? "Nueva Contraseña (opcional)" : "Contraseña"} value={contrasena} onChange={e => setContrasena(e.target.value)} style={inputStyle} disabled={!soyAdmin} />
          <select value={rol} onChange={e => setRol(e.target.value as "usuario" | "administrador")} style={selectStyle} disabled={!soyAdmin}>
            <option value="usuario">Usuario</option>
            <option value="administrador">Administrador</option>
          </select>
          <select value={genero} onChange={e => setGenero(e.target.value as "M" | "F" | "O")} style={selectStyle} disabled={!soyAdmin}>
            <option value="M">Masculino</option>
            <option value="F">Femenino</option>
            <option value="O">Otro</option>
          </select>
          <select value={estado} onChange={e => setEstado(e.target.value as "Activo" | "Inactivo")} style={selectStyle} disabled={!soyAdmin}>
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
          </select>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20, gap: 12 }}>
          {soyAdmin && <button onClick={handleSubmit} style={buttonGuardar}>Guardar</button>}
          <button onClick={onClose} style={buttonCancelar}>Cerrar</button>
        </div>
      </div>
    </div>
  );
};

const inputStyle: CSSProperties = { padding: "10px 12px", borderRadius: 10, border: "1px solid #ccc", outline: "none", fontSize: 14, width: "100%" };
const selectStyle: CSSProperties = { ...inputStyle, appearance: "none" };
const buttonGuardar: CSSProperties = { padding: "10px 20px", borderRadius: 10, border: "none", background: "linear-gradient(90deg, #137497, #f59e0b)", color: "#fff", fontWeight: "bold", cursor: "pointer" };
const buttonCancelar: CSSProperties = { padding: "10px 20px", borderRadius: 10, border: "1px solid #ccc", background: "#fff", color: "#333", fontWeight: "bold", cursor: "pointer" };

export default ModalUsuario;