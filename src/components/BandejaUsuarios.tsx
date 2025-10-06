import React from "react";
import type { Usuario } from "../types";
import '../App.css';

interface BandejaUsuariosProps {
  usuarios: Usuario[];
  onEditar: (usuario: Usuario) => void;
  onEliminar: (id: number) => void;
  onSave: (usuario: Omit<Usuario, "id">) => void;
}

const BandejaUsuarios: React.FC<BandejaUsuariosProps> = ({
  usuarios,
  onEditar,
  onEliminar,
}) => {
  return (
    <div className="bandeja-usuarios">
      <table className="tabla-usuarios">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Contraseña</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.nombre}</td>
              <td>{u.correo}</td>
              <td>{u.contraseña}</td>
              <td className="acciones">
                <button
                  className="btn-editar"
                  onClick={() => onEditar(u)}
                >
                  Editar
                </button>
                <button
                  className="btn-eliminar"
                  onClick={() => onEliminar(u.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BandejaUsuarios;