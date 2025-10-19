import React from "react";
import { FaEye, FaEdit, FaTrash, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import type { Usuario } from "../types";

interface BandejaUsuariosProps {
  usuarios: Usuario[];
  onEdit: (usuario: Usuario) => void;
  onEliminar: (id: number) => void;
  sidebarWidth?: number;
}

const roleColors: { [key: string]: string } = {
  administrador: "#116888",
  voluntario: "#2e86c1",
  adoptante: "#f39c12",
  donante: "#27ae60",
};

const BandejaUsuarios: React.FC<BandejaUsuariosProps> = ({
  usuarios,
  onEdit,
  onEliminar,
  sidebarWidth = 220,
}) => {
  return (
    <div
      style={{
        position: "relative",
        padding: "20px",
        width: `calc(100% - ${sidebarWidth}px)`,
        marginLeft: sidebarWidth,
        marginTop: 70, 
        height: `calc(100vh - 70px)`,
        overflowX: "auto",
        overflowY: "auto",
      }}
    >
      <table
        style={{
          width: "95%",
          minWidth: "900px",
          borderCollapse: "collapse",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          borderRadius: 12,
          overflow: "hidden",
          margin: "0 auto",
        }}
      >
        <thead>
          <tr
            style={{
              backgroundColor: "#116888",
              color: "#fff",
              textAlign: "center",
              height: "50px",
            }}
          >
            <th style={thStyle}>Nombre</th>
            <th style={thStyle}>Apellido</th>
            <th style={thStyle}>Cédula</th>
            <th style={thStyle}>Teléfono</th>
            <th style={thStyle}>Correo</th>
            <th style={thStyle}>Rol</th>
            <th style={thStyle}>Estado</th>
            <th style={thStyle}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u, idx) => (
            <tr
              key={idx}
              style={{
                backgroundColor: idx % 2 === 0 ? "#e6f0fa" : "#fdfdfd",
                textAlign: "center",
                height: "60px",
                transition: "all 0.3s ease",
              }}
            >
              <td style={tdStyle}>{u.nombre}</td>
              <td style={tdStyle}>{u.apellido_paterno}</td>
              <td style={tdStyle}>{u.cedula_identidad}</td>
              <td style={tdStyle}>{u.telefono}</td>
              <td style={tdStyle}>{u.correo_electronico}</td>
              <td style={{ ...tdStyle, color: roleColors[u.rol] || "#333", fontWeight: "bold" }}>
                {u.rol}
              </td>
              <td style={tdStyle}>
                {u.estado === "Activo" ? (
                  <FaCheckCircle style={{ color: "#2ecc71", fontSize: 20 }} title="Activo" />
                ) : (
                  <FaTimesCircle style={{ color: "#e74c3c", fontSize: 20 }} title="Inactivo" />
                )}
              </td>
              <td
                style={{
                  ...tdStyle,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "9px",
                  height: "100%",
                }}
              >
                <FaEye
                  style={iconStyle("#116888")}
                  title="Ver"
                  onClick={() => alert(`${u.nombre} ${u.apellido_paterno}`)}
                />
                <FaEdit
                  style={iconStyle("#f39c12")}
                  title="Editar"
                  onClick={() => onEdit(u)}
                />
                <FaTrash
                  style={iconStyle("#e74c3c")}
                  title="Eliminar"
                  onClick={() => onEliminar(u.id!)}
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
};

const tdStyle: React.CSSProperties = {
  padding: "10px",
  border: "1px solid #0f6473",
  textAlign: "center",
  verticalAlign: "middle",
};

const iconStyle = (color: string): React.CSSProperties => ({
  cursor: "pointer",
  fontSize: 18,
  color,
  padding: 6,
  borderRadius: 8,
  transition: "all 0.3s ease",
});

export default BandejaUsuarios;