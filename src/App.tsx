import React, { useState, useEffect, type CSSProperties } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import BandejaUsuarios from "./components/BandejaUsuarios";
import ModalUsuario from "./components/ModalUsuario";
import LoginScreen from "./components/LoginScreen";
import Registro from "./components/Registro";
import type { Usuario } from "./types/types";
import Inicio from "./components/pages/Inicio";
import Perros from "./components/pages/perros";
import Gatos from "./components/pages/gatos";
import Adopciones from "./components/pages/Adopciones";
import Voluntarios from "./components/pages/Voluntarios";
import Reportes from "./components/pages/Reportes";
import Configuracion from "./components/pages/Configuracion";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

type Pantalla = 
  | "login"
  | "registro"
  | "dashboard"
  | "inicio"
  | "usuarios"
  | "perros"
  | "gatos"
  | "adopciones"
  | "voluntarios"
  | "reportes"
  | "configuracion"
  | "salir";

const App: React.FC = () => {
  const [pantalla, setPantalla] = useState<Pantalla>("login");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [usuarioActual, setUsuarioActual] = useState<Usuario | null>(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [usuarioEditar, setUsuarioEditar] = useState<Usuario | null>(null);
  const [buscar, setBuscar] = useState("");
  const [mostrar, setMostrar] = useState<number>(10);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const irLogin = () => setPantalla("login");
  const irRegistro = () => setPantalla("registro");
  const irDashboard = () => setPantalla("dashboard");
  const irInicio = () => setPantalla("inicio");
  const irUsuarios = () => setPantalla("usuarios");
  const irPerros = () => setPantalla("perros");
  const irGatos = () => setPantalla("gatos");
  const irAdopciones = () => setPantalla("adopciones");
  const irVoluntarios = () => setPantalla("voluntarios");
  const irReportes = () => setPantalla("reportes");
  const irConfiguracion = () => setPantalla("configuracion");

  const cargarUsuarios = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/usuarios");
      setUsuarios(res.data);
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
    }
  };

  useEffect(() => {
    if (pantalla === "usuarios") cargarUsuarios();
  }, [pantalla]);

  const handleLogin = async (correo: string, contrasena: string) => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        correo_electronico: correo,
        contrasena,
      });
      setUsuarioActual(res.data.usuario);
      irDashboard();
    } catch (error: any) {
      if (error.response) {
        alert(error.response.data.message || "Usuario o contraseña incorrecta");
      } else {
        alert("Error de conexión con el servidor");
      }
    }
  };

  
  const handleGuardar = async (usuario: Usuario) => {
    try {
      if (usuario.id) {
        
        await axios.put(`http://localhost:5000/api/usuarios/${usuario.id}`, usuario);
      } else {
        
        if (!usuario.contrasena) {
          alert("La contraseña es obligatoria al crear un usuario.");
          return;
        }
        await axios.post("http://localhost:5000/api/usuarios/crear-usuario", usuario);
      }

      setMostrarModal(false);
      setUsuarioEditar(null);
      cargarUsuarios();
    } catch (error) {
      console.error(error);
      alert("Error al guardar el usuario");
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
      alert("Error al eliminar el usuario");
    }
  };

  
  const exportCSV = () => {
    const csv = [
      ["Nombre", "Apellido Paterno", "Apellido Materno", "Cédula", "Correo", "Rol", "Estado"],
      ...usuarios.map((u) => [
        u.nombre ?? "",
        u.apellido_paterno ?? "",
        u.apellido_materno ?? "",
        u.cedula_identidad ?? "",
        u.correo_electronico ?? "",
        u.rol ?? "usuario",
        u.estado ?? "Activo",
      ]),
    ]
      .map((e) => e.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "usuarios.csv";
    link.click();
  };

  
  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(
      usuarios.map((u) => ({
        Nombre: u.nombre ?? "",
        "Apellido Paterno": u.apellido_paterno ?? "",
        "Apellido Materno": u.apellido_materno ?? "",
        Cédula: u.cedula_identidad ?? "",
        Correo: u.correo_electronico ?? "",
        Rol: u.rol ?? "usuario",
        Estado: u.estado ?? "Activo",
      }))
    );
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Usuarios");
    XLSX.writeFile(wb, "usuarios.xlsx");
  };

  
  const exportPDF = () => {
    const doc = new jsPDF();
    const head = [["Nombre", "Apellido Paterno", "Apellido Materno", "Cédula", "Correo", "Rol", "Estado"]];
    const body = usuarios.map((u) => [
      u.nombre ?? "",
      u.apellido_paterno ?? "",
      u.apellido_materno ?? "",
      u.cedula_identidad ?? "",
      u.correo_electronico ?? "",
      u.rol ?? "usuario",
      u.estado ?? "Activo",
    ]);

    autoTable(doc, {
      head,
      body,
      startY: 20,
      headStyles: { fillColor: [255, 0, 0], textColor: 255 },
      bodyStyles: { textColor: 0 },
    });

    doc.save("usuarios.pdf");
  };

  const usuariosFiltrados = usuarios
    .filter((u) => {
      const textoBuscar = buscar.toLowerCase().trim();
      const nombre = (u.nombre ?? "").toLowerCase();
      const apellidoP = (u.apellido_paterno ?? "").toLowerCase();
      const apellidoM = (u.apellido_materno ?? "").toLowerCase();
      const correo = (u.correo_electronico ?? "").toLowerCase();
      return (
        nombre.startsWith(textoBuscar) ||
        apellidoP.startsWith(textoBuscar) ||
        apellidoM.startsWith(textoBuscar) ||
        correo.startsWith(textoBuscar)
      );
    })
    .slice(0, mostrar > 0 ? mostrar : usuarios.length);
    
  const styles: { [key: string]: CSSProperties } = {
    dashboardWrapper: { display: "flex", minHeight: "100vh", background: "linear-gradient(to right, #ffffff, #ffffff)" },
    mainSection: { flex: 1, transition: "padding-left 0.3s" },
    content: { padding: "1rem", overflowY: "auto" },
    bandejaContainer: { background: "white", borderRadius: "1rem", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", padding: "1.5rem", margin: "0 auto" },
    bandejaHeader: { display: "flex", flexDirection: "column", gap: "1rem" },
    titulo: { fontSize: "2rem", color: "#897511ff", textAlign: "center", fontWeight: "bold" },
    accionesHeader: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.5rem" },
    accionesIzquierda: { display: "flex", alignItems: "center", gap: "0.5rem" },
    accionesDerecha: { display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "0.5rem" },
    selectMostrar: { marginLeft: "0.25rem", padding: "0.25rem", borderRadius: "0.25rem" },
    btnCSV: { backgroundColor: "#63b3ed", color: "white", padding: "0.4rem 0.8rem", border: "none", borderRadius: "0.5rem", cursor: "pointer" },
    btnExcel: { backgroundColor: "#38a169", color: "white", padding: "0.4rem 0.8rem", border: "none", borderRadius: "0.5rem", cursor: "pointer" },
    btnPDF: { backgroundColor: "#e53e3e", color: "white", padding: "0.4rem 0.8rem", border: "none", borderRadius: "0.5rem", cursor: "pointer" },
    inputBuscar: { padding: "0.4rem 0.6rem", border: "1px solid #ccc", borderRadius: "0.25rem" },
    btnCrear: { backgroundColor: "#319795", color: "white", width: "50px", height: "50px", fontSize: "1.5rem", fontWeight: "bold", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", border: "none", cursor: "pointer" },
  };
  useEffect(() => {
    if (pantalla === "salir") {
      setUsuarioActual(null);
      irLogin();
    }
  }, [pantalla]);
  return (
    <div>
      {pantalla === "login" && <LoginScreen onLogin={handleLogin} mostrarRegistro={irRegistro} />}
      {pantalla === "registro" && <Registro mostrarLogin={irLogin} />}

      {pantalla !== "login" && pantalla !== "registro" && usuarioActual && (
        <div style={styles.dashboardWrapper}>
          <Sidebar
            collapsed={!sidebarOpen}
            toggleSidebar={toggleSidebar}
            setPantalla={(pant) => {
              switch (pant.toLowerCase()) {
                case "inicio": irInicio(); break;
                case "dashboard": irDashboard(); break;
                case "usuarios": irUsuarios(); break;
                case "perros": irPerros(); break;
                case "gatos": irGatos(); break;
                case "adopciones": irAdopciones(); break;
                case "voluntarios": irVoluntarios(); break;
                case "reportes": irReportes(); break;
                case "configuracion": irConfiguracion(); break;
                case "salir": setPantalla("salir"); break;
              }
            }}
          />
          <div style={{ ...styles.mainSection, paddingLeft: sidebarOpen ? "220px" : "1cm" }}>
            <Navbar toggleSidebar={toggleSidebar} usuario={usuarioActual} />
            <main style={styles.content}>
              {pantalla === "inicio" && <Inicio />}
              {pantalla === "usuarios" && (
                <div style={styles.bandejaContainer}>
                  <div style={styles.bandejaHeader}>
                    <h1 style={styles.titulo}>Registro de Usuarios</h1>
                    <div style={styles.accionesHeader}>
                      <div style={styles.accionesIzquierda}>
                        <button style={styles.btnCSV} onClick={exportCSV}>CSV</button>
                        <button style={styles.btnExcel} onClick={exportExcel}>Excel</button>
                        <button style={styles.btnPDF} onClick={exportPDF}>Pdf</button>
                        <label>
                          Mostrar:
                          <select
                            style={styles.selectMostrar}
                            value={mostrar}
                            onChange={(e) => setMostrar(Number(e.target.value))}
                          >
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={25}>25</option>
                            <option value={50}>50</option>
                            <option value={-1}>Todos</option>
                          </select>
                        </label>
                      </div>
                      <div style={styles.accionesDerecha}>
                        <input
                          type="text"
                          style={styles.inputBuscar}
                          placeholder="Buscar..."
                          value={buscar}
                          onChange={(e) => setBuscar(e.target.value)}
                        />
                        {usuarioActual.rol === "administrador" && (
                          <button style={styles.btnCrear} onClick={() => { setUsuarioEditar(null); setMostrarModal(true); }}>＋</button>
                        )}
                      </div>
                    </div>
                    <BandejaUsuarios
                      usuarios={usuariosFiltrados}
                      onEdit={handleEditar}
                      onEliminar={handleEliminar}
                      sidebarWidth={sidebarOpen ? 0 : 0}
                      rolActual={(usuarioActual?.rol as "usuario" | "administrador") ?? "usuario"}
                    />
                  </div>
                </div>
              )}
              {pantalla === "perros" && <Perros />}
              {pantalla === "gatos" && <Gatos />}
              {pantalla === "adopciones" && <Adopciones />}
              {pantalla === "voluntarios" && <Voluntarios />}
              {pantalla === "reportes" && <Reportes />}
              {pantalla === "configuracion" && <Configuracion />}
            </main>

            {mostrarModal && usuarioActual.rol === "administrador" && (
              <ModalUsuario
                usuario={usuarioEditar}
                onClose={() => { setMostrarModal(false); setUsuarioEditar(null); }}
                onSave={handleGuardar}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;