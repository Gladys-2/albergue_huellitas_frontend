import React from "react";

type Animal = {
  nombre: string;
  raza: string;
  sexo: "Macho" | "Hembra";
  edad: string;
  peso: string;
  url: string;
  likes: number;
};

const nombres = ["Firulais", "Rocky", "Luna", "Milo", "Bolt", "Max", "Toby", "Simba", "Rocko", "Chispa", "Nina", "Bruno", "Kira", "Oreo", "Lola"];
const razas = ["Labrador", "Dálmata", "Pastor Alemán", "Beagle", "Husky Siberiano", "Golden Retriever", "Bulldog", "Shih Tzu", "Boxer", "Chihuahua"];
const sexos: ("Macho" | "Hembra")[] = ["Macho", "Hembra"];

const animales: Animal[] = Array.from({ length: 50 }, (_, i) => {
  const nombre = nombres[Math.floor(Math.random() * nombres.length)] + (i + 1);
  const raza = razas[Math.floor(Math.random() * razas.length)];
  const sexo = sexos[Math.floor(Math.random() * sexos.length)];
  const años = Math.floor(Math.random() * 10);
  const meses = Math.floor(Math.random() * 12);
  const edad = años === 0 ? `${meses} meses` : (meses === 0 ? `${años} años` : `${años} años y ${meses} meses`);
  const peso = (Math.floor(Math.random() * 30) + 3) + " kg"; 
  const likes = Math.floor(Math.random() * 100);
  const url = `https://placedog.net/300/300?id=${i + 1}`;
  return { nombre, raza, sexo, edad, peso, url, likes };
});

const Animales: React.FC = () => {
  const styles = `
    .animales-container {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      gap: 20px;
      padding: 20px;
    }
    .animal-card {
      background-color: #fff;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      transition: transform 0.3s;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
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
    .animal-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 10px 10px;
    }
    .likes {
      display: flex;
      align-items: center;
      color: #e74c3c;
      font-weight: bold;
    }
    .likes span {
      margin-left: 5px;
    }
    .adoptar-btn {
      background-color: #f39c12;
      color: white;
      border: none;
      border-radius: 8px;
      padding: 5px 10px;
      font-size: 0.9rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 5px;
      transition: background 0.3s;
    }
    .adoptar-btn:hover {
      background-color: #d35400;
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
              <p>Raza: {animal.raza}</p>
              <p>Sexo: {animal.sexo}</p>
              <p>Edad: {animal.edad}</p>
              <p>Peso: {animal.peso}</p>
            </div>
            <div className="animal-footer">
              <div className="likes">❤️ <span>{animal.likes}</span></div>
              <button className="adoptar-btn">Adoptar</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Animales;