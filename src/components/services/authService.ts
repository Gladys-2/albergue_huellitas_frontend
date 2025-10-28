import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

export const loginUsuario = async (correo_electronico: string, contrasena: string) => {
  return axios.post(`${API_URL}/login`, { correo_electronico, contrasena });
};

export const registrarUsuario = async (usuario: any) => {
  return axios.post(`${API_URL}/crear-usuario`, usuario);
};