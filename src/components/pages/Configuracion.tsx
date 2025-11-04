import React from "react";

const Configuracion: React.FC = () => {
  return (
    <div style={container}>
      <h1 style={title}>Configuración del Albergue</h1>
      <p style={subtitle}>
        Ajustes generales de la aplicación y administración del albergue.
      </p>

      <div style={card}>
        <h3 style={cardTitle}>Información del Albergue</h3>
        <p style={cardText}>Nombre, dirección, contacto y horarios de atención.</p>
        <button style={button}>Editar Información</button>
      </div>

      <div style={card}>
        <h3 style={cardTitle}>Preferencias de Sistema</h3>
        <p style={cardText}>Configuración de notificaciones, permisos y seguridad.</p>
        <button style={button}>Modificar Preferencias</button>
      </div>
    </div>
  );
};

const container: React.CSSProperties = { padding: "30px", backgroundColor: "#f9faff", minHeight: "100vh" };
const title: React.CSSProperties = { fontSize: "32px", fontWeight: 700, color: "#137497", marginBottom: "10px" };
const subtitle: React.CSSProperties = { fontSize: "16px", color: "#555", marginBottom: "30px" };
const card: React.CSSProperties = { backgroundColor: "#fff", padding: "20px", borderRadius: "15px", marginBottom: "20px", boxShadow: "0 6px 20px rgba(0,0,0,0.1)" };
const cardTitle: React.CSSProperties = { fontSize: "20px", fontWeight: 600, marginBottom: "8px" };
const cardText: React.CSSProperties = { fontSize: "14px", color: "#666", marginBottom: "12px" };
const button: React.CSSProperties = { padding: "8px 16px", borderRadius: "8px", border: "none", backgroundColor: "#137497", color: "#fff", cursor: "pointer", fontWeight: 600 };

export default Configuracion;