import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const DefaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

const Reportes: React.FC = () => {
  const metrics = [
    { title: "Mascotas en Tránsito", value: 150, color: "#3498db" },
    { title: "Tasa de Adopción (Últ. Mes)", value: "53%", color: "#2ecc71" },
    { title: "Solicitudes Pendientes", value: 44, color: "#f1c40f" },
    { title: "Donaciones Recibidas (Bs)", value: "65k", color: "#9b59b6" },
  ];

  const puntosRescate: { name: string; coords: [number, number]; casos: number }[] = [
    { name: "Zona Sur, La Paz", coords: [-16.520, -68.150], casos: 15 },
    { name: "El Alto", coords: [-16.500, -68.200], casos: 12 },
    { name: "Centro, La Paz", coords: [-16.500, -68.150], casos: 8 },
  ];

  const laPazCoords: [number, number] = [-16.500, -68.150];

  return (
    <div style={container}>
      <h1 style={title}>Reportes y Estadísticas</h1>

      <div style={cards}>
        {metrics.map((m) => (
          <div key={m.title} style={{ ...card, backgroundColor: m.color }}>
            <h2 style={cardNumber}>{m.value}</h2>
            <p style={cardLabel}>{m.title}</p>
          </div>
        ))}
      </div>

      <div style={mapSection}>
        <h2 style={mapTitle}>Impacto Geográfico en La Paz</h2>
        <div style={mapWrapper}>
          <MapContainer center={laPazCoords} zoom={12} style={mapStyle}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />
            {puntosRescate.map((p) => (
              <Marker key={p.name} position={p.coords}>
                <Popup>
                  {p.name}: {p.casos} rescates
                </Popup>
              </Marker>
            ))}
          </MapContainer>

          <div style={mapInfo}>
            <h3>Zonas Clave</h3>
            <ul>
              {puntosRescate.map((p) => (
                <li key={p.name}>
                  {p.name}: {p.casos} rescates
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

// Estilos
const container: React.CSSProperties = {
  padding: "30px",
  minHeight: "100vh",
  backgroundColor: "#1e1e2f",
  color: "#fff",
};
const title: React.CSSProperties = { fontSize: "32px", fontWeight: 700, marginBottom: "20px" };
const cards: React.CSSProperties = { display: "flex", gap: "20px", flexWrap: "wrap", marginBottom: "30px" };
const card: React.CSSProperties = { padding: "20px", borderRadius: "15px", width: "220px", textAlign: "center", color: "#fff" };
const cardNumber: React.CSSProperties = { fontSize: "28px", fontWeight: 700, marginBottom: "5px" };
const cardLabel: React.CSSProperties = { fontSize: "16px" };

const mapSection: React.CSSProperties = { marginTop: "40px" };
const mapTitle: React.CSSProperties = { fontSize: "24px", marginBottom: "20px" };
const mapWrapper: React.CSSProperties = { display: "flex", gap: "20px", flexWrap: "wrap" };
const mapStyle: React.CSSProperties = { height: "400px", width: "100%", maxWidth: "600px", borderRadius: "10px" };
const mapInfo: React.CSSProperties = { flex: 1, minWidth: "200px" };

export default Reportes;