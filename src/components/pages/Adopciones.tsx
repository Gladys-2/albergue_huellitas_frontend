import React from "react";

const Adopciones: React.FC = () => {
  return (
    <div style={container}>
      <h1 style={title}>Gestión de Adopciones</h1>
      <p style={subtitle}>
        Visualiza y administra las solicitudes de adopción de nuestros animales. Asegúrate de
        que cada mascota encuentre un hogar seguro y responsable.
      </p>

      <div style={cardContainer}>
        <div style={card}>
          <img
            src="https://place-puppy.com/200x200"
            alt="Perro en adopción"
            style={cardImage}
          />
          <h3 style={cardTitle}>Max</h3>
          <p style={cardText}>Perro macho, 3 años, vacunado y esterilizado.</p>
          <button style={button}>Ver Solicitudes</button>
        </div>

        <div style={card}>
          <img
            src="https://placekitten.com/200/200"
            alt="Gato en adopción"
            style={cardImage}
          />
          <h3 style={cardTitle}>Luna</h3>
          <p style={cardText}>Gata hembra, 2 años, vacunada y sociable con niños.</p>
          <button style={button}>Ver Solicitudes</button>
        </div>
      </div>
    </div>
  );
};

const container: React.CSSProperties = {
  padding: "30px",
  backgroundColor: "#f9faff",
  minHeight: "100vh",
};

const title: React.CSSProperties = {
  fontSize: "32px",
  fontWeight: 700,
  color: "#137497",
  marginBottom: "10px",
};

const subtitle: React.CSSProperties = {
  fontSize: "16px",
  color: "#555",
  marginBottom: "30px",
};

const cardContainer: React.CSSProperties = {
  display: "flex",
  gap: "20px",
  flexWrap: "wrap",
};

const card: React.CSSProperties = {
  backgroundColor: "#fff",
  borderRadius: "15px",
  padding: "20px",
  width: "220px",
  boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const cardImage: React.CSSProperties = {
  width: "100%",
  borderRadius: "12px",
  marginBottom: "15px",
};

const cardTitle: React.CSSProperties = {
  fontSize: "20px",
  fontWeight: 600,
  marginBottom: "5px",
};

const cardText: React.CSSProperties = {
  fontSize: "14px",
  textAlign: "center",
  color: "#666",
  marginBottom: "15px",
};

const button: React.CSSProperties = {
  padding: "8px 15px",
  borderRadius: "8px",
  border: "none",
  backgroundColor: "#137497",
  color: "#fff",
  cursor: "pointer",
  fontWeight: 600,
};

export default Adopciones;