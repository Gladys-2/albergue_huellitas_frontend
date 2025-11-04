import React from "react";

const Voluntarios: React.FC = () => {
  return (
    <div style={container}>
      <h1 style={title}>Gestión de Voluntarios</h1>
      <p style={subtitle}>
        Administra la información de los voluntarios, horarios y actividades del albergue.
      </p>

      <div style={list}>
        <div style={volunteerCard}>
          <h3 style={volunteerName}>Ana López</h3>
          <p style={volunteerInfo}>Encargada de cuidado de perros, disponible lunes a viernes.</p>
        </div>
        <div style={volunteerCard}>
          <h3 style={volunteerName}>Carlos Pérez</h3>
          <p style={volunteerInfo}>Encargado de limpieza y mantenimiento, disponible fines de semana.</p>
        </div>
      </div>
    </div>
  );
};

const container: React.CSSProperties = { padding: "30px", backgroundColor: "#f9faff", minHeight: "100vh" };
const title: React.CSSProperties = { fontSize: "32px", fontWeight: 700, color: "#137497", marginBottom: "10px" };
const subtitle: React.CSSProperties = { fontSize: "16px", color: "#555", marginBottom: "30px" };
const list: React.CSSProperties = { display: "flex", flexDirection: "column", gap: "15px" };
const volunteerCard: React.CSSProperties = { backgroundColor: "#fff", padding: "15px 20px", borderRadius: "12px", boxShadow: "0 4px 15px rgba(0,0,0,0.1)" };
const volunteerName: React.CSSProperties = { fontWeight: 600, fontSize: "18px", marginBottom: "5px" };
const volunteerInfo: React.CSSProperties = { fontSize: "14px", color: "#666" };

export default Voluntarios;