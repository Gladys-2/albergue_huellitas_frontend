import React from "react";
import { FaEdit, FaTrash, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import type { Usuario } from "../types/types";

interface BandejaUsuariosProps {
  usuarios: Usuario[];
  onEdit: (usuario: Usuario) => void;
  onEliminar: (id: number) => void;
  sidebarWidth?: number;
  rolActual: "usuario" | "administrador"; 
}

const roleColors: { [key in "usuario" | "administrador" | "voluntario" | "adoptante" | "donante"]?: string } = {
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
        marginTop: 70,
        height: `calc(100vh - 70px)`,
        overflowX: "auto",
        overflowY: "auto",
      }}
    >
      <table style={tableStyle}>
        <thead>
          <tr style={theadTrStyle}>
            <th style={thStyle}>Nombre</th>
            <th style={thStyle}>Apellido</th>
            <th style={thStyle}>Cédula</th>
            <th style={thStyle}>Teléfono</th>
            <th style={thStyle}>Correo</th>
            <th style={thStyle}>Rol</th>
            <th style={thStyle}>Estado</th>
            {esAdmin && <th style={thStyle}>Acciones</th>}
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u, idx) => {
            // Forzamos valores por defecto y tipos correctos
            const idUsuario: number = u.id as number;
            const rolUsuario: "usuario" | "administrador" = (u.rol ?? "usuario") as "usuario" | "administrador";
            const estadoUsuario: "Activo" | "Inactivo" = (u.estado ?? "Activo") as "Activo" | "Inactivo";

            return (
              <tr key={idUsuario} style={idx % 2 === 0 ? trEvenStyle : trOddStyle}>
                <td style={tdStyle}>{u.nombre}</td>
                <td style={tdStyle}>{u.apellido_paterno}</td>
                <td style={tdStyle}>{u.cedula_identidad ?? "N/A"}</td>
                <td style={tdStyle}>{u.telefono ?? "N/A"}</td>
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
                <td style={tdStyle}>
                  {estadoUsuario === "Activo" ? (
                    <FaCheckCircle style={{ color: "#1bcc65ff", fontSize: 18 }} title="Activo" />
                  ) : (
                    <FaTimesCircle style={{ color: "#e74c3c", fontSize: 18 }} title="Inactivo" />
                  )}
                </td>
                {esAdmin && (
                  <td style={tdActionsStyle}>
                    <FaEdit
                      style={iconStyle("#0c8343ff")}
                      title="Editar"
                      onClick={() => onEdit(u)}
                    />
                    <FaTrash
                      style={iconStyle("#e74c3c")}
                      title="Eliminar"
                      onClick={() => onEliminar(idUsuario)}
                    />
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

// estilos
const tableStyle: React.CSSProperties = { width: "100%", minWidth: 900, borderCollapse: "separate", borderSpacing: 0, boxShadow: "0 6px 20px rgba(0,0,0,0.1)", borderRadius: 12, backgroundColor: "#fff" };
const theadTrStyle: React.CSSProperties = { backgroundColor: "#116888", color: "#fff", textAlign: "center", height: 50 };
const thStyle: React.CSSProperties = { padding: "12px", borderBottom: "2px solid #0f6473", fontWeight: "bold", textAlign: "center" };
const tdStyle: React.CSSProperties = { padding: "12px", textAlign: "center", verticalAlign: "middle" };
const tdActionsStyle: React.CSSProperties = { ...tdStyle, display: "flex", justifyContent: "center", gap: 10 };
const trEvenStyle: React.CSSProperties = { backgroundColor: "#f9f9f9" };
const trOddStyle: React.CSSProperties = { backgroundColor: "#e6f0fa" };
const iconStyle = (color: string): React.CSSProperties => ({ cursor: "pointer", fontSize: 18, color, padding: 6, borderRadius: 8, transition: "all 0.3s ease", backgroundColor: "#f5f5f5", boxShadow: "0 2px 5px rgba(0,0,0,0.1)" });

export default BandejaUsuarios;