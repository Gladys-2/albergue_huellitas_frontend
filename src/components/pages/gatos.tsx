import React, { useEffect, useState } from "react";

type Animal = {
  nombre: string;
  edad: string;
  raza: string;
  sexo: string;
  peso: string;
  descripcion: string;
  url: string;
  likes: number;
};

const razas = ["Siames", "Persa", "Maine Coon", "Bengala", "Sphynx",
               "Ragdoll", "Siberiano", "British Shorthair", "Abisinio", "Oriental"];

const Gatos: React.FC = () => {
  const [gatos, setGatos] = useState<Animal[]>([]);

  useEffect(() => {
    const fetchGatos = async () => {
      try {
        const res = await fetch("https://api.thecatapi.com/v1/images/search?limit=50");
        const data = await res.json();

        const nuevosGatos: Animal[] = data.map((item: any, i: number) => {
          const nombre = `Gato${i + 1}`;
          const raza = razas[Math.floor(Math.random() * razas.length)];
          const sexo = Math.random() > 0.5 ? "Macho" : "Hembra";
          const años = Math.floor(Math.random() * 10);
          const meses = Math.floor(Math.random() * 12);
          const edad = años === 0 ? `${meses} meses` : (meses === 0 ? `${años} años` : `${años} años y ${meses} meses`);
          const peso = `${(Math.random() * 5 + 2).toFixed(1)} kg`;
          const descripcion = `Gato ${sexo.toLowerCase()} de raza ${raza}, juguetón y cariñoso.`;
          const likes = Math.floor(Math.random() * 100);
          return { nombre, edad, raza, sexo, peso, descripcion, url: item.url, likes };
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
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      gap: 20px;
      padding: 20px;
    }
    .animal-card {
      background-color: #fff8f0;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      transition: transform 0.3s;
      cursor: pointer;
      position: relative;
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
      color: #b8860b; /* dorado */
    }
    .animal-info p {
      margin: 2px 0;
      font-size: 0.9rem;
      color: #7f8c8d;
    }
    .animal-actions {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 5px 10px 10px 10px;
    }
    .like {
      display: flex;
      align-items: center;
      font-size: 0.9rem;
      color: #e74c3c;
    }
    .like i {
      margin-right: 5px;
    }
    .adoptar-btn {
      background-color: #b8860b;
      color: white;
      border: none;
      padding: 5px 10px;
      border-radius: 8px;
      cursor: pointer;
      font-size: 0.9rem;
      transition: background 0.3s;
    }
    .adoptar-btn:hover {
      background-color: #a4740a;
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
              <h3>{gato.nombre} ({gato.sexo})</h3>
              <p>Raza: {gato.raza}</p>
              <p>Edad: {gato.edad}</p>
              <p>Peso: {gato.peso}</p>
              <p>{gato.descripcion}</p>
            </div>
            <div className="animal-actions">
              <div className="like"><i>❤️</i>{gato.likes}</div>
              <button className="adoptar-btn">Adoptar</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Gatos;