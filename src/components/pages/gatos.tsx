import React, { useEffect, useState } from "react";

type Animal = {
  nombre: string;
  edad: string;
  raza: string;
  url: string;
};

const razas = ["Siames", "Persa", "Maine Coon", "Bengala", "Sphynx",
               "Ragdoll", "Siberiano", "British Shorthair", "Abisinio", "Oriental"];

const Gatos: React.FC = () => {
  const [gatos, setGatos] = useState<Animal[]>([]);

  useEffect(() => {
    const fetchGatos = async () => {
      try {
        // Traemos 50 gatos de una sola vez
        const res = await fetch("https://api.thecatapi.com/v1/images/search?limit=50");
        const data = await res.json();

        const nuevosGatos: Animal[] = data.map((item: any, i: number) => {
          const nombre = `Gato${i + 1}`;
          const raza = razas[Math.floor(Math.random() * razas.length)];
          const años = Math.floor(Math.random() * 10);
          const meses = Math.floor(Math.random() * 12);
          const edad = años === 0 ? `${meses} meses` : (meses === 0 ? `${años} años` : `${años} años y ${meses} meses`);
          return { nombre, edad, raza, url: item.url };
        });

        setGatos(nuevosGatos);
      } catch (error) {
        console.error("Error al cargar los gatos:", error);
      }
    };

    fetchGatos();
  }, []);

  const styles = `
    .animales-container {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 20px;
      padding: 20px;
    }
    .animal-card {
      background-color: #fff;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      transition: transform 0.3s;
      cursor: pointer;
    }
    .animal-card:hover {
      transform: translateY(-5px);
    }
    .animal-card img {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }
    .animal-info {
      padding: 10px;
      text-align: center;
    }
    .animal-info h3 {
      margin: 5px 0;
      color: #2c3e50;
    }
    .animal-info p {
      margin: 2px 0;
      font-size: 0.9rem;
      color: #7f8c8d;
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div className="animales-container">
        {gatos.map((gato, index) => (
          <div key={index} className="animal-card">
            <img src={gato.url} alt={gato.nombre} />
            <div className="animal-info">
              <h3>{gato.nombre}</h3>
              <p>{gato.raza}</p>
              <p>{gato.edad}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Gatos;