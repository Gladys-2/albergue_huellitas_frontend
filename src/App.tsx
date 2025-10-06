import React, { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import BandejaUsuarios from "./components/BandejaUsuarios";
import ModalUsuario from "./components/ModalUsuario";
import type { Usuario } from "./types";
import LoginScreen from "./components/LoginScreen";
import RegistroScreen from "./components/Registro";
import OtpScreen from "./components/OtpScreen";

type Pantalla = "login" | "registro" | "otp" | "dashboard";

const App: React.FC = () => {
  const [pantalla, setPantalla] = useState<Pantalla>("login");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [usuarios, setUsuarios] = useState<Usuario[]>([
    { id: 1, nombre: "Charly Limachi", correo: "Charly@gmail.com", contraseña: "1234" },
    { id: 2, nombre: "Ana Pérez", correo: "Ana@gmail.com", contraseña: "abcd" },
  ]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [usuarioEditar, setUsuarioEditar] = useState<Usuario | null>(null);
  const [usuarioActual, setUsuarioActual] = useState<Usuario | null>(null);

  const toggleSidebar = () => setSidebarCollapsed(!sidebarCollapsed);
  const irLogin = () => setPantalla("login");
  const irRegistro = () => setPantalla("registro");
  const irOtp = () => setPantalla("otp");
  const irDashboard = () => setPantalla("dashboard");

  // Guardar usuario (crear o editar)
  const handleGuardar = (usuario: Omit<Usuario, "id">) => {
    if (usuarioEditar) {
      setUsuarios(prev =>
        prev.map(u => (u.id === usuarioEditar.id ? { ...u, ...usuario } : u))
      );
    } else {
      // Generar id secuencial
      const nuevoId = usuarios.length > 0 ? Math.max(...usuarios.map(u => u.id)) + 1 : 1;
      const nuevoUsuario: Usuario = { id: nuevoId, ...usuario };
      setUsuarios(prev => [...prev, nuevoUsuario]);
    }
    setMostrarModal(false);
    setUsuarioEditar(null);
  };

  const handleEditar = (usuario: Usuario) => {
    setUsuarioEditar(usuario);
    setMostrarModal(true);
  };

  const handleEliminar = (id: number) => {
    setUsuarios(prev => prev.filter(u => u.id !== id));
  };

  return (
    <div className="app">
      {pantalla === "login" && (
        <LoginScreen
          onLogin={(correo, contraseña) => {
            const user = usuarios.find(
              u => u.correo === correo && u.contraseña === contraseña
            );
            if (user) {
              setUsuarioActual(user);
              irOtp();
            } else {
              alert("Usuario o contraseña incorrecta");
            }
          }}
          mostrarRegistro={irRegistro}
        />
      )}

      {pantalla === "registro" && (
        <RegistroScreen
          onRegister={(usuario: Omit<Usuario, "id">) => {
            const nuevoId = usuarios.length > 0 ? Math.max(...usuarios.map(u => u.id)) + 1 : 1;
            const nuevoUsuario: Usuario = { id: nuevoId, ...usuario };
            setUsuarios(prev => [...prev, nuevoUsuario]);
            alert("Usuario registrado. Por favor inicia sesión.");
            irLogin();
          }}
          mostrarLogin={irLogin}
        />
      )}

      {pantalla === "otp" && usuarioActual && (
        <OtpScreen
          verificarOtp={() => irDashboard()}
          regresarLogin={irLogin}
        />
      )}

      {pantalla === "dashboard" && usuarioActual && (
        <>
          <Navbar toggleSidebar={toggleSidebar} />
          <Sidebar collapsed={sidebarCollapsed} toggleSidebar={function (): void {
            throw new Error("Function not implemented.");
          } } />

          <main className={`main ${sidebarCollapsed ? "collapsed" : ""}`}>
            <div className="usuarios-header">
              <h1>Usuarios Registrados</h1>
              <button
                className="btn-crear"
                onClick={() => setMostrarModal(true)}
              >
                Crear Usuario
              </button>
            </div>

            <BandejaUsuarios
              usuarios={usuarios}
              onEditar={handleEditar}
              onEliminar={handleEliminar}
              onSave={handleGuardar}
            />
          </main>

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
        </>
      )}
    </div>
  );
};

export default App;