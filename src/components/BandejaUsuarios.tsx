import React from "react";
import { FaEye, FaEdit, FaTrash, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import type { Usuario } from "../types";

interface BandejaUsuariosProps {
  usuarios: Usuario[];
  onEdit: (usuario: Usuario) => void;
  onDelete: (usuario: Usuario) => void;
  onView: (usuario: Usuario) => void;
  sidebarWidth?: number; // opcional, por defecto 220
}

const BandejaUsuarios: React.FC<BandejaUsuariosProps> = ({
  usuarios,
  onEdit,
  onDelete,
  onView,
  sidebarWidth = 220,
}) => {
  return (
    <div
      style={{
        padding: "100px 20px",
        overflowX: "auto",
        width: `calc(100% - ${sidebarWidth}px)`,
        marginLeft: sidebarWidth,
      }}
    >
      <h2
        style={{
          marginBottom: "20px",
          fontSize: "25px",
          color: "#116888",
          fontWeight: "bold",
        }}
      >
        Usuarios Registrados
      </h2>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          boxShadow: "0 2px 16px rgba(0,0,0,0.1)",
        }}
      >
        <thead>
          <tr
            style={{
              backgroundColor: "#116888",
              color: "#ffffff",
              textAlign: "center",
              height: "50px",
            }}
          >
            <th style={thStyle}>Nombre</th>
            <th style={thStyle}>Apellido Paterno</th>
            <th style={thStyle}>Apellido Materno</th>
            <th style={thStyle}>Correo Electrónico</th>
            <th style={thStyle}>Teléfono</th>
            <th style={thStyle}>Rol</th>
            <th style={thStyle}>Estado</th>
            <th style={thStyle}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u, index) => (
            <tr
              key={index} // 🔹 usar índice en vez de id
              style={{
                backgroundColor: index % 2 === 0 ? "#e6f0fa" : "#ffffff",
                textAlign: "center",
                height: "60px",
              }}
            >
              <td style={tdStyle}>{u.nombre}</td>
              <td style={tdStyle}>{u.apellido_paterno}</td>
              <td style={tdStyle}>{u.apellido_materno}</td>
              <td style={tdStyle}>{u.correo_electronico}</td>
              <td style={tdStyle}>{u.telefono}</td>
              <td style={tdStyle}>{u.rol}</td>
              <td style={tdStyle}>
                {u.estado === "Activo" ? (
                  <FaCheckCircle
                    style={{ color: "#2e86c1", fontSize: 24 }}
                    title="Activo"
                  />
                ) : (
                  <FaTimesCircle
                    style={{ color: "#2e86c1", fontSize: 24 }}
                    title="Inactivo"
                  />
                )}
              </td>
              <td
                style={{
                  ...tdStyle,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "15px",
                  padding: "0",
                  height: "60px",
                }}
              >
                <FaEye
                  style={{ color: "#137497", cursor: "pointer", fontSize: 24 }}
                  onClick={() => onView(u)}
                  title="Ver"
                />
                <FaEdit
                  style={{ color: "#018a43", cursor: "pointer", fontSize: 24 }}
                  onClick={() => onEdit(u)}
                  title="Editar"
                />
                <FaTrash
                  style={{ color: "#de140d", cursor: "pointer", fontSize: 24 }}
                  onClick={() => onDelete(u)}
                  title="Eliminar"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const thStyle: React.CSSProperties = {
  padding: "12px",
  border: "1px solid #0f6473",
  fontWeight: "bold",
  textAlign: "center",
  verticalAlign: "middle",
  backgroundColor: "#116888",
  color: "#ffffff",
};

const tdStyle: React.CSSProperties = {
  padding: "10px",
  border: "1px solid #0f6473",
  textAlign: "center",
  verticalAlign: "middle",
};

export default BandejaUsuarios;