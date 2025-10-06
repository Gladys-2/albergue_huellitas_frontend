import React, { useState, useEffect } from "react";
import type { Usuario } from "../types";
import '../App.css';

interface ModalProps {
  usuario: Usuario | null;
  onClose: () => void;
  onSave: (usuario: Omit<Usuario, "id">) => void;
}

const ModalUsuario: React.FC<ModalProps> = ({ usuario, onClose, onSave }) => {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");

  useEffect(() => {
    if (usuario) {
      setNombre(usuario.nombre);
      setCorreo(usuario.correo);
      setContraseña(usuario.contraseña);
    } else {
      setNombre("");
      setCorreo("");
      setContraseña("");
    }
  }, [usuario]);

  const handleSubmit = () => {
    if (!nombre || !correo || !contraseña) {
      alert("Todos los campos son obligatorios");
      return;
    }
    onSave({ nombre, correo, contraseña });
  };

  return (
    <div className="modal-usuario">
      <div className="modal-contenido">
        <h2>{usuario ? "Editar Usuario" : "Crear Usuario"}</h2>
        <label>
          Nombre:
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </label>
        <label>
          Correo:
          <input
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />
        </label>
        <label>
          Contraseña:
          <input
            type="password"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
          />
        </label>
        <div className="modal-botones">
          <button className="btn-guardar" onClick={handleSubmit}>
            Guardar
          </button>
          <button className="btn-cancelar" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalUsuario;




