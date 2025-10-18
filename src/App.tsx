import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import BandejaUsuarios from "./components/BandejaUsuarios";
import ModalUsuario from "./components/ModalUsuario";
import LoginScreen from "./components/LoginScreen";
import Registro from "./components/Registro";
import type { Usuario } from "./types";

type Pantalla = "login" | "registro" | "dashboard";

const App: React.FC = () => {
  const [pantalla, setPantalla] = useState<Pantalla>("login");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [usuarioActual, setUsuarioActual] = useState<Usuario | null>(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [usuarioEditar, setUsuarioEditar] = useState<Usuario | null>(null);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const irLogin = () => setPantalla("login");
  const irRegistro = () => setPantalla("registro");
  const irDashboard = () => setPantalla("dashboard");

  // Cargar usuarios desde backend
  const cargarUsuarios = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/usuarios");
      setUsuarios(response.data);
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
    }
  };

  useEffect(() => {
    if (pantalla === "dashboard") {
      cargarUsuarios();
    }
  }, [pantalla]);

  // LOGIN
  const handleLogin = async (correo: string, contrasena: string) => {
    try {
      const res = await axios.post("http://localhost:5000/api/usuarios/login", {
        correo_electronico: correo,
        contrasena,
      });
      setUsuarioActual(res.data.usuario);
      irDashboard();
    } catch (error) {
      alert("Usuario o contraseña incorrecta");
    }
  };

  // REGISTRO
  const handleRegister = async (usuario: Omit<Usuario, "id">) => {
    try {
      await axios.post("http://localhost:5000/api/usuarios/crear-usuario", usuario);
      alert("Usuario registrado. Por favor inicia sesión.");
      irLogin();
    } catch (error: any) {
      alert(error.response?.data?.message || "Error al registrar usuario");
    }
  };

  // GUARDAR / EDITAR
  const handleGuardar = async (usuario: Omit<Usuario, "id">) => {
    if (usuarioEditar) {
      try {
        await axios.put(`http://localhost:5000/api/usuarios/${usuarioEditar.id}`, usuario);
        setUsuarioEditar(null);
        setMostrarModal(false);
        cargarUsuarios();
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        await axios.post("http://localhost:5000/api/usuarios/crear-usuario", usuario);
        setMostrarModal(false);
        cargarUsuarios();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleEditar = (usuario: Usuario) => {
    setUsuarioEditar(usuario);
    setMostrarModal(true);
  };

  const handleEliminar = async (id: number) => {
    if (!window.confirm("¿Deseas eliminar este usuario?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/usuarios/${id}`);
      cargarUsuarios();
    } catch (error) {
      console.error(error);
    }
  };

  // ---- INTERFAZ VISUAL ----
  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">
      {pantalla === "login" && (
        <LoginScreen onLogin={handleLogin} mostrarRegistro={irRegistro} />
      )}

      {pantalla === "registro" && (
        <Registro onRegister={handleRegister} mostrarLogin={irLogin} />
      )}

      {pantalla === "dashboard" && usuarioActual && (
        <div className="flex w-full">
          {/* Sidebar fijo */}
          <Sidebar collapsed={!sidebarOpen} toggleSidebar={toggleSidebar} />

          {/* Contenedor principal */}
          <div
            className={`flex flex-col flex-1 transition-all duration-300 ${
              sidebarOpen ? "ml-56" : "ml-16"
            }`}
          >
            {/* Navbar arriba */}
            <Navbar toggleSidebar={toggleSidebar} usuario={usuarioActual} />

            {/* Contenido central */}
            <main className="flex-1 p-8 bg-gray-100 overflow-x-auto">
              <div className="bg-white rounded-2xl shadow-lg p-8 max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                  🐾 Registro de Usuario
                </h1>

                <div className="flex justify-end mb-4">
                  <button
                    onClick={() => setMostrarModal(true)}
                    className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5 py-2 rounded-lg transition-colors"
                  >
                    + Crear Usuario
                  </button>
                </div>

                <BandejaUsuarios
                  usuarios={usuarios}
                  onEditar={handleEditar}
                  onEliminar={handleEliminar}
                  onSave={() => {}}
                />
              </div>
            </main>
          </div>

          {/* Modal usuario */}
          {mostrarModal && (
            <ModalUsuario
              usuario={usuarioEditar}
              onClose={() => {
                setUsuarioEditar(null);
                setMostrarModal(false);
              }}
              onSave={handleGuardar}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default App;