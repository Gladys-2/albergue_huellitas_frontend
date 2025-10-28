import axios from "axios";
import type { Adopcion } from "../../types/types";

const API_URL = "http://localhost:5000/api/adopciones";

export const obtenerAdopciones = async () => {
  const res = await axios.get(API_URL);
  return res.data as Adopcion[];
};

export const crearAdopcion = async (adopcion: Omit<Adopcion, "id">) => {
  const res = await axios.post(API_URL, adopcion);
  return res.data as Adopcion;
};