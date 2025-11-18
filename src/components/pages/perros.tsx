import { useState, useEffect } from "react";
import type { Animal } from "../../types/types";

const AnimalesPorCategoria = () => {
  const [animales, setAnimales] = useState<Animal[]>([]);
  const [cargando, setCargando] = useState(true);

  const cargarAnimales = async () => {
    const res = await fetch("http://localhost:5000/api/animales");
    const data: Animal[] = await res.json();
    setAnimales(data);
    setCargando(false);
  };

  useEffect(() => {
    cargarAnimales();
  }, []);

  if (cargando) return <p>Cargando animales...</p>;

  // Agrupar por especie
  const categorias = Array.from(new Set(animales.map(a => a.especie?.toLowerCase() || "Otros")));

  return (
    <div>
      <h2 style={{ textAlign: "center", margin: "1rem 0" }}>
        Albergue Patitas Felices – Animales Disponibles
      </h2>

      {categorias.map(cat => (
        <div key={cat} style={{ marginBottom: "2rem" }}>
          <h3 style={{ color: "#2c5282", marginBottom: "1rem", textTransform: "capitalize" }}>
            {cat}s
          </h3>
          <div className="animales-container">
            {animales
              .filter(a => (a.especie?.toLowerCase() || "otros") === cat)
              .map(a => (
                <div className="animal-card" key={a.id}>
                  <img
                    src={a.foto?.startsWith("http") ? a.foto : `http://localhost:5000/${a.foto}`}
                    alt={a.nombre}
                  />
                  <div className="animal-info">
                    <h4>{a.nombre}</h4>
                    <p>Raza: {a.raza}</p>
                    <p>Edad: {a.edad} años</p>
                    <p>Estado: {a.estado}</p>
                  </div>
                  <div className="animal-footer">
                    <button className="adoptar-btn">Adoptar</button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnimalesPorCategoria;