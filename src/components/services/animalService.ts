import axios from "axios";
import type { Animal } from "../../types/types";

const API_URL = "http://localhost:5000/api/animales";

export const obtenerAnimales = async () => {
  const res = await axios.get(API_URL);
  return res.data as Animal[];
};

export const crearAnimal = async (animal: Omit<Animal, "id">) => {
  const res = await axios.post(API_URL, animal);
  return res.data as Animal;
};