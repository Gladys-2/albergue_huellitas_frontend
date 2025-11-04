import axios from "axios";
import type { Usuario } from "../../types/types";

const API_URL = "http://localhost:5000/api/usuarios";

export const obtenerUsuarios = async (): Promise<Usuario[]> => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const crearUsuario = async (usuario: Omit<Usuario, "id">): Promise<Usuario> => {
  const res = await axios.post(`${API_URL}/crear-usuario`, usuario);
  return res.data.usuario; 
};

export const actualizarUsuario = async (id: number, usuario: Omit<Usuario, "id">): Promise<Usuario> => {
  const res = await axios.put(`${API_URL}/${id}`, usuario);
  return res.data.usuario; 
};

export const eliminarUsuario = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};