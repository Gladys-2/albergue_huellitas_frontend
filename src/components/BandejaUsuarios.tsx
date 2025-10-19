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
        overflowX: "auto", // permite scroll horizontal en pantallas pequeñas
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
            <th style={thStyle}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u, idx) => (
            <tr key={u.id} style={idx % 2 === 0 ? trEvenStyle : trOddStyle}>
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
                  <FaCheckCircle style={{ color: "#2ecc71", fontSize: 18 }} title="Activo" />
                ) : (
                  <FaTimesCircle style={{ color: "#e74c3c", fontSize: 18 }} title="Inactivo" />
                )}
              </td>
              <td style={tdActionsStyle}>
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
      {/* CSS para responsividad */}
      <style>{`
        @media (max-width: 768px) {
          table {
            min-width: 600px; /* fuerza scroll horizontal en móviles */
          }
          th, td {
            padding: 8px;
            font-size: 13px;
          }
          tdActionsStyle svg {
            font-size: 16px;
            padding: 4px;
          }
        }
      `}</style>
    </div>
  );
};

/* ==== ESTILOS ==== */
const tableStyle: React.CSSProperties = {
  width: "100%",
  minWidth: 900,
  borderCollapse: "separate",
  borderSpacing: 0,
  boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
  borderRadius: 12,
  overflow: "hidden",
  backgroundColor: "#fff",
};

const theadTrStyle: React.CSSProperties = {
  backgroundColor: "#116888",
  color: "#fff",
  textAlign: "center",
  height: 50,
};

const thStyle: React.CSSProperties = {
  padding: "12px",
  borderBottom: "2px solid #0f6473",
  fontWeight: "bold",
  textAlign: "center",
};

const tdStyle: React.CSSProperties = {
  padding: "12px",
  textAlign: "center",
  verticalAlign: "middle",
};

const tdActionsStyle: React.CSSProperties = {
  ...tdStyle,
  display: "flex",
  justifyContent: "center",
  gap: 10,
};

const trEvenStyle: React.CSSProperties = {
  backgroundColor: "#f9f9f9",
  transition: "all 0.3s ease",
};

const trOddStyle: React.CSSProperties = {
  backgroundColor: "#e6f0fa",
  transition: "all 0.3s ease",
};

const iconStyle = (color: string): React.CSSProperties => ({
  cursor: "pointer",
  fontSize: 18,
  color,
  padding: 6,
  borderRadius: 8,
  transition: "all 0.3s ease",
  backgroundColor: "#f5f5f5",
  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
});

export default BandejaUsuarios;