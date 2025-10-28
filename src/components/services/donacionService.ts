import axios from "axios";
import type { Donacion } from "../../types/types";

const API_URL = "http://localhost:5000/api/donaciones";

export const obtenerDonaciones = async () => {
  const res = await axios.get(API_URL);
  return res.data as Donacion[];
};

export const crearDonacion = async (donacion: Omit<Donacion, "id">) => {
  const res = await axios.post(API_URL, donacion);
  return res.data as Donacion;
};