import React, { useState, useEffect } from "react";
import type { Usuario } from "../types";
import "../App.css";

interface ModalProps {
  usuario: Usuario | null;
  onClose: () => void;
  onSave: (usuario: Omit<Usuario, "id">) => void;
}

const ModalUsuario: React.FC<ModalProps> = ({ usuario, onClose, onSave }) => {
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
      setNombre(usuario.nombre || "");
      setApellidoPaterno(usuario.apellido_paterno || "");
      setApellidoMaterno(usuario.apellido_materno || "");
      setCedulaIdentidad(usuario.cedula_identidad || "");
      setTelefono(usuario.telefono || "");
      setCorreoElectronico(usuario.correo_electronico || "");
      setContrasena(usuario.contrasena || "");
      setRol(usuario.rol || "usuario");
      setGenero(usuario.genero || "O");
      setEstado(usuario.estado || "Activo");
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
    if (!nombre || !apellidoPaterno || !apellidoMaterno || !correoElectronico) {
      alert("Por favor, completa todos los campos obligatorios.");
      return;
    }

    onSave({
      nombre,
      apellido_paterno: apellidoPaterno,
      apellido_materno: apellidoMaterno,
      cedula_identidad: cedulaIdentidad,
      telefono,
      correo_electronico: correoElectronico,
      contrasena,
      rol,
      genero,
      estado,
    });
  };

  return (
    <div
      className="modal-usuario"
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
        animation: "fadeIn 0.3s ease-in-out",
      }}
    >
      <div
        className="modal-contenido"
        style={{
          backgroundColor: "#fff",
          borderRadius: "20px",
          padding: "30px 40px",
          width: "100%",
          maxWidth: "500px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
          transform: "translateY(0)",
          animation: "slideIn 0.3s ease-out",
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
          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            style={inputStyle}
          />
          <input
            type="text"
            placeholder="Apellido Paterno"
            value={apellidoPaterno}
            onChange={(e) => setApellidoPaterno(e.target.value)}
            style={inputStyle}
          />
          <input
            type="text"
            placeholder="Apellido Materno"
            value={apellidoMaterno}
            onChange={(e) => setApellidoMaterno(e.target.value)}
            style={inputStyle}
          />
          <input
            type="text"
            placeholder="Cédula de Identidad"
            value={cedulaIdentidad}
            onChange={(e) => setCedulaIdentidad(e.target.value)}
            style={inputStyle}
          />
          <input
            type="text"
            placeholder="Teléfono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            style={inputStyle}
          />
          <input
            type="email"
            placeholder="Correo Electrónico"
            value={correoElectronico}
            onChange={(e) => setCorreoElectronico(e.target.value)}
            style={inputStyle}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            style={inputStyle}
          />

          <select value={rol} onChange={(e) => setRol(e.target.value as "usuario" | "administrador")} style={selectStyle}>
            <option value="usuario">Usuario</option>
            <option value="administrador">Administrador</option>
          </select>

          <select value={genero} onChange={(e) => setGenero(e.target.value as "M" | "F" | "O")} style={selectStyle}>
            <option value="M">Masculino</option>
            <option value="F">Femenino</option>
            <option value="O">Otro</option>
          </select>

          <select value={estado} onChange={(e) => setEstado(e.target.value as "Activo" | "Inactivo")} style={selectStyle}>
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
          </select>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20, gap: 12 }}>
          <button onClick={handleSubmit} style={buttonGuardar}>Guardar</button>
          <button onClick={onClose} style={buttonCancelar}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

// Estilos reutilizables
const inputStyle: React.CSSProperties = {
  padding: "10px 12px",
  borderRadius: 10,
  border: "1px solid #ccc",
  outline: "none",
  transition: "0.2s",
  fontSize: 14,
  width: "100%",
};

const selectStyle: React.CSSProperties = {
  ...inputStyle,
  appearance: "none",
};

const buttonGuardar: React.CSSProperties = {
  padding: "10px 20px",
  borderRadius: 10,
  border: "none",
  background: "linear-gradient(90deg, #137497, #f59e0b)",
  color: "#fff",
  fontWeight: "bold",
  cursor: "pointer",
  transition: "0.3s",
};

const buttonCancelar: React.CSSProperties = {
  padding: "10px 20px",
  borderRadius: 10,
  border: "1px solid #ccc",
  background: "#fff",
  color: "#333",
  fontWeight: "bold",
  cursor: "pointer",
  transition: "0.3s",
};

export default ModalUsuario;