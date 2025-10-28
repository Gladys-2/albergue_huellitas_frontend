import React, { useEffect, useState } from "react";
import { obtenerDonaciones } from "./services/donacionService";
import type { Donacion } from "../types/types";

const Donaciones: React.FC = () => {
  const [donaciones, setDonaciones] = useState<Donacion[]>([]);

  useEffect(() => {
    // Carga las donaciones desde el servicio
    obtenerDonaciones().then(setDonaciones).catch((err) => {
      console.error("Error al obtener donaciones:", err);
    });
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Donaciones</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 border">Usuario ID</th>
              <th className="px-4 py-2 border">Monto</th>
              <th className="px-4 py-2 border">Tipo</th>
              <th className="px-4 py-2 border">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {donaciones.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-4">
                  No hay donaciones disponibles
                </td>
              </tr>
            ) : (
              donaciones.map((d) => (
                <tr key={d.id}>
                  <td className="px-4 py-2 border">{d.usuarioId ?? "N/A"}</td>
                  <td className="px-4 py-2 border">{d.monto}</td>
                  <td className="px-4 py-2 border">{d.tipo ?? "N/A"}</td>
                  <td className="px-4 py-2 border">
                    {d.fecha ? new Date(d.fecha).toLocaleDateString() : "N/A"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Donaciones;
