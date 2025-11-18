import React, { useState, useEffect, type CSSProperties } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import BandejaUsuarios from "./components/BandejaUsuarios";
import ModalUsuario from "./components/ModalUsuario";
import LoginScreen from "./components/LoginScreen";
import Registro from "./components/Registro";
import type { Usuario, Animal } from "./types/types";
import Inicio from "./components/pages/Inicio";
import Perros from "./components/pages/perros";
import BandejaAnimales from "./components/BandejaAnimal";
import Gatos from "./components/pages/gatos";
import Adopciones from "./components/pages/Adopciones";
import Voluntarios from "./components/pages/Voluntarios";
import Reportes from "./components/pages/Reportes";
import Configuracion from "./components/pages/Configuracion";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { IdiomaProvider } from "./components/context/IdiomaContext";
import ModalAnimal from "./components/ModalAnimal";


type UsuarioModal = Omit<Usuario, "avatarUrl"> & { id?: number; contrasena?: string };

type Pantalla =
  | "login"
  | "registro"
  | "dashboard"
  | "inicio"
  | "usuarios"
  | "animales"
  | "perros"
  | "gatos"
  | "adopciones"
  | "voluntarios"
  | "reportes"
  | "configuracion"
  | "salir";

const API_URL = import.meta.env.VITE_API_URL;

const App: React.FC = () => {
  //-----Estado de la pantalla ----//
  const [pantalla, setPantalla] = useState<Pantalla>("login");
  //----- Sidebar----//
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  //--Usuarios--//
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [usuarioActual, setUsuarioActual] = useState<Usuario | null>(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [usuarioEditar, setUsuarioEditar] = useState<Usuario | null>(null);
  const [buscar, setBuscar] = useState("");
  const [mostrar, setMostrar] = useState<number>(10);

  //---Animal--//
  const [animales, setAnimales] = useState<Animal[]>([]);
  const [animalEditar, setAnimalEditar] = useState<Animal | null>(null);

  //--tamaño reposivo de la pantalla  detectar con el hook--//
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setSidebarOpen(true);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  //--cambiar de pantalla--//
  const irLogin = () => setPantalla("login");
  const irRegistro = () => setPantalla("registro");
  const irDashboard = () => setPantalla("dashboard");
  const irInicio = () => setPantalla("inicio");
  const irUsuarios = () => setPantalla("usuarios");
  const irAnimales = () => setPantalla("animales");
  const irPerros = () => setPantalla("perros");
  const irGatos = () => setPantalla("gatos");
  const irAdopciones = () => setPantalla("adopciones");
  const irVoluntarios = () => setPantalla("voluntarios");
  const irReportes = () => setPantalla("reportes");
  const irConfiguracion = () => setPantalla("configuracion");

  //--Manejo de login exitoso--//
  const handleLoginExitoso = (usuario: Usuario) => {
    setUsuarioActual(usuario);
    irInicio();
  };
  //--Cargar usuarios desde backend--//
  const cargarUsuarios = async () => {
    try {
      const res = await axios.get(`${API_URL}/usuarios`);
      setUsuarios(res.data);
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
      alert("No se pudo cargar la lista de usuarios.");
    }
  };
  //--Ejecutar carga cuando se entra a la pantalla de usuarios--//
  useEffect(() => {
    if (pantalla === "usuarios") cargarUsuarios();
  }, [pantalla]);

  //--Guardar usuario (crear o actualizar)--//
  const handleGuardar = async (usuario: UsuarioModal) => {
    try {
      if (usuario.id) {
        const usuarioActualizar: Partial<UsuarioModal> = {
          nombre: usuario.nombre,
          apellido_paterno: usuario.apellido_paterno,
          apellido_materno: usuario.apellido_materno,
          cedula_identidad: usuario.cedula_identidad,
          telefono: usuario.telefono,
          correo_electronico: usuario.correo_electronico,
          rol: usuario.rol,
          genero: usuario.genero,
          estado: usuario.estado,
        };
        if (usuario.contrasena) usuarioActualizar.contrasena = usuario.contrasena;

        await axios.put(`${API_URL}/usuarios/actualizar-usuario/${usuario.id}`, usuarioActualizar);
      } else {
        if (!usuario.contrasena) {
          alert("La contraseña es obligatoria al crear un usuario.");
          return;
        }
        await axios.post(`${API_URL}/usuarios/crear-usuario`, usuario);
      }
      setMostrarModal(false);
      setUsuarioEditar(null);
      cargarUsuarios();
    } catch (error) {
      console.error(error);
      alert("Error al guardar el usuario");
    }
  };
  //--Editar usuario--//
  const handleEditar = (usuario: Usuario) => {
    setUsuarioEditar(usuario);
    setMostrarModal(true);
  };
  //--Estado a activo o inactivo
  const handleToggle = (usuario: Usuario) => {
    const nuevosUsuarios: Usuario[] = usuarios.map(u =>
      u.id === usuario.id
        ? { ...u, estado: u.estado === "Activo" ? "Inactivo" : "Activo" }
        : u
    );
    setUsuarios(nuevosUsuarios);
  };

  //--Filtrado de usuarios para la búsqueda--//
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

  //--Eportacion de Excel,csv y pdf--//
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

  //--Cargar animales desde backend --//
  const cargarAnimales = async () => {
    try {
      const res = await axios.get(`${API_URL}/animales`);
      setAnimales(res.data);
    } catch (error) {
      console.error("Error al cargar animales:", error);
      alert("No se pudo cargar la lista de animales.");
    }
  };

  //-- Ejecutar carga cuando se entra a la pantalla de animales--//
  useEffect(() => {
    if (pantalla === "animales") cargarAnimales();
  }, [pantalla]);

  //--Editar un animal--//
  const handleEditarAnimal = (animal: Animal) => {
    setAnimalEditar({ ...animal }); // copias para no mutar el estado
  };
  //--cambiar de estado disponible,adoptado,en cuidado--//
  const handleToggleAnimal = (animal: Animal) => {
    setAnimales((prev) =>
      prev.map((a) =>
        a.id === animal.id
          ? {
            ...a,
            estado_animal:
              a.estado_animal === "Disponible"
                ? "Adoptado"
                : a.estado_animal === "Adoptado"
                  ? "En cuidado"
                  : "Disponible",
          }
          : a
      )
    );
  };

  // Agregar nuevo animal
  const handleAgregarAnimalNuevo = () => {
    setAnimalEditar({
      nombre: "",
      especie: "",
      raza: "",
      sexo: "Macho",
      edad: 0,
      descripcion: "",
      estado_animal: "Disponible",
      foto: "",
      refugio_id: 1,
    } as Animal);
  };


  // Guardar o actualizar animal
  const guardarAnimal = async (animal: Animal) => {
    try {
      const url = animal.id
        ? `${API_URL}/animales/editar-animal/${animal.id}`  // ruta correcta PUT
        : `${API_URL}/animales/crear-animal`;               // ruta correcta POST
      const method = animal.id ? "PUT" : "POST";

      // Enviar los datos como JSON, no FormData
      const data = {
        nombre: animal.nombre,
        especie: animal.especie,
        raza: animal.raza,
        sexo: animal.sexo,
        edad: animal.edad,
        descripcion: animal.descripcion,
        estado_animal: animal.estado_animal,
        foto: animal.foto,
        refugio_id: animal.refugio_id,
      };

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Error al guardar el animal");

      const animalGuardado = await response.json();

      // Actualizar lista de animales en frontend
      setAnimales((prev) => {
        const index = prev.findIndex((a) => a.id === animalGuardado.id);
        if (index !== -1) {
          const copia = [...prev];
          copia[index] = animalGuardado;
          return copia;
        }
        return [...prev, animalGuardado]; // si es nuevo, agregar
      });

      // Cerrar modal
      setAnimalEditar(null);
    } catch (error) {
      console.error(error);
      alert("Error al guardar el animal");
    }
  };


  //--Pantalla salir--
  useEffect(() => {
    if (pantalla === "salir") {
      setUsuarioActual(null);
      irLogin();
    }
  }, [pantalla]);


  const styles: { [key: string]: CSSProperties } = {
    dashboardWrapper: { display: "flex", minHeight: "100vh", background: "linear-gradient(to right, #ffffffff, #ffffff)" },
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


  return (
    <IdiomaProvider>
      <div>
        {pantalla === "login" && <LoginScreen mostrarRegistro={irRegistro} onLoginExitoso={handleLoginExitoso} />}
        {pantalla === "registro" && <Registro mostrarLogin={irLogin} />}

        {pantalla !== "login" && pantalla !== "registro" && usuarioActual && (
          <div style={styles.dashboardWrapper}>
            <Sidebar
              collapsed={!sidebarOpen}
              mobileOpen={sidebarOpen}
              setMobileOpen={setSidebarOpen}
              setPantalla={(pant) => {
                switch (pant.toLowerCase()) {
                  case "inicio": irInicio(); break;
                  case "dashboard": irDashboard(); break;
                  case "usuarios": irUsuarios(); break;
                  case "animales": irAnimales(); break;
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

            <div
              style={{
                ...styles.mainSection,
                paddingLeft: !isMobile ? (sidebarOpen ? 220 : 70) : 0,
                transition: "padding-left 0.3s ease",
              }}
            >
              <Navbar toggleSidebar={toggleSidebar} collapsed={!sidebarOpen} usuario={usuarioActual} />
              <main
                style={{
                  padding: "5rem 1rem 1rem 1rem",
                  overflowY: "auto",
                  minHeight: "calc(100vh - 80px)"
                }}
              >
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
                            <button
                              style={styles.btnCrear}
                              onClick={() => { setUsuarioEditar(null); setMostrarModal(true); }}
                            >＋</button>
                          )}
                        </div>
                      </div>

                      {/* Bandeja de usuarios */}
                      <BandejaUsuarios
                        usuarios={usuariosFiltrados}
                        onEdit={handleEditar}
                        onToggle={handleToggle}
                        rolActual={(usuarioActual?.rol as "usuario" | "administrador") ?? "usuario"}
                      />
                    </div>
                  </div>
                )}

                {/* --- Bandeja animales --- */}
                {pantalla === "animales" && (
                  <BandejaAnimales
                    animales={animales}
                    usuarioLogueado={usuarioActual}
                    onEdit={handleEditarAnimal}
                    onToggle={handleToggleAnimal}
                    onAdd={handleAgregarAnimalNuevo} // abrir modal agregar
                  />
                )}

                {/* Modal para agregar o editar animal */}
                {animalEditar && (
                  <ModalAnimal
                    animal={animalEditar}
                    onClose={() => setAnimalEditar(null)}
                    onSave={guardarAnimal}
                  />
                )}
                {pantalla === "perros" && <Perros />}
                {pantalla === "gatos" && <Gatos />}
                {pantalla === "adopciones" && <Adopciones />}
                {pantalla === "voluntarios" && <Voluntarios />}
                {pantalla === "reportes" && <Reportes />}
                {pantalla === "configuracion" && <Configuracion />}
              </main>

              {/* Modal de usuarios */}
              {mostrarModal && usuarioActual && (
                <ModalUsuario
                  usuario={usuarioEditar}
                  usuarioLogueado={usuarioActual}
                  onClose={() => { setMostrarModal(false); setUsuarioEditar(null); }}
                  onSave={handleGuardar}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </IdiomaProvider>
  );
};

export default App;