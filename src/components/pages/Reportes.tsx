import React from "react";

const Reportes: React.FC = () => {
  return (
    <div style={container}>
      <h1 style={title}>Reportes y Estadísticas</h1>
      <p style={subtitle}>
        Visualiza los datos de adopciones, animales disponibles, voluntarios y actividad del albergue.
      </p>

      <div style={cards}>
        <div style={card}>
          <h2 style={cardNumber}>25</h2>
          <p style={cardLabel}>Animales Adoptados</p>
        </div>
        <div style={card}>
          <h2 style={cardNumber}>40</h2>
          <p style={cardLabel}>Animales Disponibles</p>
        </div>
        <div style={card}>
          <h2 style={cardNumber}>12</h2>
          <p style={cardLabel}>Voluntarios Activos</p>
        </div>
      </div>
    </div>
  );
};

const container: React.CSSProperties = { padding: "30px", backgroundColor: "#f9faff", minHeight: "100vh" };
const title: React.CSSProperties = { fontSize: "32px", fontWeight: 700, color: "#137497", marginBottom: "10px" };
const subtitle: React.CSSProperties = { fontSize: "16px", color: "#555", marginBottom: "30px" };
const cards: React.CSSProperties = { display: "flex", gap: "20px", flexWrap: "wrap" };
const card: React.CSSProperties = { backgroundColor: "#fff", padding: "20px", borderRadius: "15px", width: "180px", boxShadow: "0 4px 15px rgba(0,0,0,0.1)", textAlign: "center" };
const cardNumber: React.CSSProperties = { fontSize: "28px", fontWeight: 700, color: "#137497", marginBottom: "5px" };
const cardLabel: React.CSSProperties = { fontSize: "14px", color: "#555" };

export default Reportes;