import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Salir: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/login");
  }, [navigate]);

  return (
    <div style={container}>
      <h1 style={title}>Saliendo...</h1>
      <p style={subtitle}>Se cerró tu sesión y estás siendo redirigido al inicio de sesión.</p>
    </div>
  );
};

const container: React.CSSProperties = { padding: "30px", backgroundColor: "#f9faff", minHeight: "100vh" };
const title: React.CSSProperties = { fontSize: "32px", fontWeight: 700, color: "#137497", marginBottom: "10px" };
const subtitle: React.CSSProperties = { fontSize: "16px", color: "#555" };

export default Salir;