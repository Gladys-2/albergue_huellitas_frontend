import axios from "axios";
import type { Refugio } from "../../types/types";

const API = "http://localhost:5000/api/refugios";

export const obtenerRefugios = async (): Promise<Refugio[]> =>
  (await axios.get(API)).data;

export const crearRefugio = async (refugio: Refugio) =>
  (await axios.post(API, refugio)).data;

export const eliminarRefugio = async (id: number) =>
  (await axios.delete(`${API}/${id}`)).data;