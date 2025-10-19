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
  const [sidebarOpen, setSidebarOpen] = useState(false); // Mejor para móvil
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [usuarioActual, setUsuarioActual] = useState<Usuario | null>(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [usuarioEditar, setUsuarioEditar] = useState<Usuario | null>(null);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const irLogin = () => setPantalla("login");
  const irRegistro = () => setPantalla("registro");
  const irDashboard = () => setPantalla("dashboard");

  const cargarUsuarios = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/usuarios");
      setUsuarios(res.data);
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
    }
  };

  useEffect(() => {
    if (pantalla === "dashboard") cargarUsuarios();
  }, [pantalla]);

  const handleLogin = async (correo: string, contrasena: string) => {
    try {
      const res = await axios.post("http://localhost:5000/api/usuarios/login", {
        correo_electronico: correo,
        contrasena,
      });
      setUsuarioActual(res.data.usuario);
      irDashboard();
    } catch {
      alert("Usuario o contraseña incorrecta");
    }
  };

  const handleRegister = async (usuario: Omit<Usuario, "id">) => {
    try {
      await axios.post("http://localhost:5000/api/usuarios/crear-usuario", usuario);
      alert("Usuario registrado. Por favor inicia sesión.");
      irLogin();
    } catch (error: any) {
      alert(error.response?.data?.message || "Error al registrar usuario");
    }
  };

  const handleGuardar = async (usuario: Omit<Usuario, "id">) => {
    try {
      if (usuarioEditar) {
        await axios.put(`http://localhost:5000/api/usuarios/${usuarioEditar.id}`, usuario);
      } else {
        await axios.post("http://localhost:5000/api/usuarios/crear-usuario", usuario);
      }
      setMostrarModal(false);
      setUsuarioEditar(null);
      cargarUsuarios();
    } catch (error) {
      console.error(error);
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

  return (
    <div className="flex min-h-screen font-sans bg-gray-50">
      {pantalla === "login" && <LoginScreen onLogin={handleLogin} mostrarRegistro={irRegistro} />}
      {pantalla === "registro" && <Registro onRegister={handleRegister} mostrarLogin={irRegistro} />}

      {pantalla === "dashboard" && usuarioActual && (
        <>
          <Sidebar collapsed={!sidebarOpen} toggleSidebar={toggleSidebar} />
          <div
            className={`flex flex-col flex-1 transition-all duration-300 ${
              sidebarOpen ? "ml-56" : "ml-0"
            }`}
          >
            <Navbar toggleSidebar={toggleSidebar} usuario={usuarioActual} />
            <main className="flex-1 p-4 md:p-6 bg-gray-100 overflow-auto">
              <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 max-w-full mx-auto">
                <div className="flex justify-between items-center mb-4">
                  <h1 className="text-xl md:text-2xl font-bold text-gray-800 text-center flex-1">
                    🐾 Registro de Usuarios
                  </h1>
                  <button
                    className="bg-orange-500 hover:bg-orange-600 text-white font-semibold p-2 rounded-lg flex items-center justify-center"
                    onClick={() => setMostrarModal(true)}
                    title="Crear Usuario"
                  >
                    <span className="text-lg font-bold">+</span>
                  </button>
                </div>

                <BandejaUsuarios
                  usuarios={usuarios}
                  onEdit={handleEditar}
                  onEliminar={handleEliminar}
                  sidebarWidth={sidebarOpen ? 220 : 0}
                />
              </div>
            </main>
          </div>

          {mostrarModal && (
            <ModalUsuario
              usuario={usuarioEditar}
              onClose={() => {
                setMostrarModal(false);
                setUsuarioEditar(null);
              }}
              onSave={handleGuardar}
            />
          )}
        </>
      )}
    </div>
  );
};

export default App;