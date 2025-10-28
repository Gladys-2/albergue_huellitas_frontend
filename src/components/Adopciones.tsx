import React, { useEffect, useState } from "react";
import { obtenerAdopciones } from "./services/adopcionService";
import type { Adopcion } from "../types/types";

const Adopciones: React.FC = () => {
  const [adopciones, setAdopciones] = useState<Adopcion[]>([]);

  useEffect(() => {
    obtenerAdopciones().then(setAdopciones);
  }, []);

  return (
    <div>
      <h2>Adopciones</h2>
      <table>
        <thead>
          <tr>
            <th>Usuario ID</th>
            <th>Animal ID</th>
            <th>Fecha</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {adopciones.map((a) => (
            <tr key={a.id}>
              <td>{a.usuarioId}</td>
              <td>{a.animalId}</td>
              <td>{a.fecha}</td>
              <td>{a.estado}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Adopciones;
