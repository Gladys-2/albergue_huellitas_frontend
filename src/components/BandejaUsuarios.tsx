import React from "react";
import { FaEdit, FaToggleOn, FaToggleOff } from "react-icons/fa";
import type { Usuario } from "../types/types";

interface BandejaUsuariosProps {
  usuarios: Usuario[];
  onEdit: (usuario: Usuario) => void;
  onToggle: (usuario: Usuario) => void;
  sidebarWidth?: number;
  rolActual: "usuario" | "administrador";
}

const roleColors: { [key in "usuario" | "administrador"]?: string } = {
  administrador: "#020c0fff",
  usuario: "#f39c12",
};

const BandejaUsuarios: React.FC<BandejaUsuariosProps> = ({
  usuarios,
  onEdit,
  onToggle,
  sidebarWidth = 0,
  rolActual,
}) => {
  const esAdmin = rolActual === "administrador";

  return (
    <div
      style={{
        position: "relative",
        padding: "20px",
        width: `calc(100% - ${sidebarWidth}px)`,
        marginLeft: sidebarWidth,
        marginTop: 60,
        height: `calc(100vh - 60px)`,
        overflowX: "hidden",
        overflowY: "auto",
        boxSizing: "border-box",
        transition: "all 0.3s ease",
      }}
    >
      <table style={tableStyle}>
        <thead>
          <tr style={theadTrStyle}>
            <th style={thStyle}>Nombre</th>
            <th style={thStyle}>Apellido</th>
            <th style={thStyle}>Correo</th>
            <th style={thStyle}>Rol</th>
            <th style={thStyle}>Estado</th>
            {esAdmin && <th style={thStyle}>Acciones</th>}
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u, idx) => {
            const rolUsuario = u.rol ?? "usuario";
            const estadoUsuario = u.estado ?? "Activo";

            return (
              <tr key={u.id} style={idx % 2 === 0 ? trEvenStyle : trOddStyle}>
                <td style={tdStyle}>{u.nombre}</td>
                <td style={tdStyle}>{u.apellido_paterno}</td>
                <td style={tdStyle}>{u.correo_electronico}</td>
                <td
                  style={{
                    ...tdStyle,
                    color: roleColors[rolUsuario] || "#333",
                    fontWeight: "bold",
                  }}
                >
                  {rolUsuario}
                </td>
                <td style={tdStyle}>{estadoUsuario}</td>
                {esAdmin && (
                  <td style={tdActionsStyle}>
                    <FaEdit
                      style={iconStyle("#0c8343ff")}
                      title="Editar"
                      onClick={() => onEdit(u)}
                    />
                    <span
                      onClick={() => onToggle(u)}
                      style={{ cursor: "pointer" }}
                      title={estadoUsuario === "Activo" ? "Desactivar" : "Activar"}
                    >
                      {estadoUsuario === "Activo" ? (
                        <FaToggleOn style={toggleStyle("#1bcc65ff")} />
                      ) : (
                        <FaToggleOff style={toggleStyle("#e74c3c")} />
                      )}
                    </span>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const tableStyle: React.CSSProperties = {
  width: "95%",
  margin: "0 auto",
  borderCollapse: "separate",
  borderSpacing: 0,
  boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
  borderRadius: 12,
  backgroundColor: "#fff",
};
const theadTrStyle: React.CSSProperties = {
  backgroundColor: "#d59f2cff",
  color: "#fff",
  textAlign: "center",
  height: 50,
};
const thStyle: React.CSSProperties = {
  padding: "12px",
  borderBottom: "2px solid #73610fff",
  fontWeight: "bold",
  textAlign: "center",
};
const tdStyle: React.CSSProperties = { padding: "12px", textAlign: "center", verticalAlign: "middle" };
const tdActionsStyle: React.CSSProperties = { ...tdStyle, display: "flex", justifyContent: "center", gap: 12 };
const trEvenStyle: React.CSSProperties = { backgroundColor: "#f9f9f9" };
const trOddStyle: React.CSSProperties = { backgroundColor: "#e6f0fa" };
const iconStyle = (color: string): React.CSSProperties => ({
  cursor: "pointer",
  fontSize: 20,
  color,
  padding: 6,
  borderRadius: 8,
  transition: "all 0.3s ease",
});
const toggleStyle = (color: string): React.CSSProperties => ({
  fontSize: 28,
  color,
  transition: "all 0.3s ease",
});

export default BandejaUsuarios;