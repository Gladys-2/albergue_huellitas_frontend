import React, { useEffect, useState } from "react";
import axios from "axios";
import type { Refugio } from "../types/types";

const Refugios: React.FC = () => {
  const [refugios, setRefugios] = useState<Refugio[]>([]);

  const cargarRefugios = async () => {
    try {
      const res = await axios.get<Refugio[]>("http://localhost:5000/api/refugios");
      setRefugios(res.data);
    } catch (error) {
      console.error("Error al cargar refugios:", error);
    }
  };

  useEffect(() => {
    cargarRefugios();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Refugios</h2>
      <ul>
        {refugios.map((r) => (
          <li key={r.id} className="mb-2">
            <strong>{r.nombre}</strong> - {r.direccion} {r.telefono && `- ${r.telefono}`} {r.correo && `- ${r.correo}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Refugios;