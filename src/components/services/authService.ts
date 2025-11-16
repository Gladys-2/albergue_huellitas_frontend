import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

export const registrarUsuario = async (usuario: any) => {
  try {
    const res = await axios.post(`${API_URL}/registro`, usuario);
    return res.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Error al procesar la respuesta del servidor");
  }
};

export const loginUsuario = async (correo_electronico: string, contrasena: string) => {
  try {
    const res = await axios.post(`${API_URL}/login`, { correo_electronico, contrasena });
    return res.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Error al procesar la respuesta del servidor");
  }
};