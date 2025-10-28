import React from "react";

type Animal = {
  nombre: string;
  edad: string;
  raza: string;
  url: string;
};

// Generamos 100 perros con nombres, edades, razas y fotos reales
const razas = ["Labrador", "Dálmata", "Pastor Alemán", "Beagle", "Husky Siberiano",
               "Golden Retriever", "Bulldog", "Shih Tzu", "Boxer", "Chihuahua"];

const animales: Animal[] = Array.from({ length: 100 }, (_, i) => {
  const nombre = `Perro${i + 1}`;
  const raza = razas[Math.floor(Math.random() * razas.length)];
  const años = Math.floor(Math.random() * 10);
  const meses = Math.floor(Math.random() * 12);
  const edad = años === 0 ? `${meses} meses` : (meses === 0 ? `${años} años` : `${años} años y ${meses} meses`);
  const url = `https://placedog.net/300/300?id=${i + 1}`;
  return { nombre, edad, raza, url };
});

const Animales: React.FC = () => {
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
        {animales.map((animal, index) => (
          <div key={index} className="animal-card">
            <img src={animal.url} alt={animal.nombre} />
            <div className="animal-info">
              <h3>{animal.nombre}</h3>
              <p>{animal.raza}</p>
              <p>{animal.edad}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Animales;