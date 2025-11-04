# Albergue Huellitas - Frontend

Este repositorio contiene la parte frontend del proyecto Albergue Huellitas, una plataforma web para gestionar adopciones, usuarios, animales y voluntarios de un albergue de mascotas.

La aplicación permite administrar información de usuarios, perros y gatos, registrar adopciones y voluntarios, y generar reportes de manera rápida y organizada.

# Tecnologías utilizadas
1.React v18 con TypeScript
2.Vite como herramienta de desarrollo y bundler
3.Axios para comunicación con el backend
4.React Icons para los íconos de la interfaz
5.jsPDF y XLSX para exportar reportes en PDF y Excel
6.CSS-in-JS con CSSProperties para estilos flexibles
7.Backend: Node.js + Express (API REST)

# Estructura del proyecto
/albergue_huellitas_frontend
├─ /public
├─ /src
│  ├─ /components
│  │  ├─ Navbar.tsx
│  │  ├─ Sidebar.tsx
│  │  ├─ ModalUsuario.tsx
│  │  ├─ BandejaUsuarios.tsx
│  │  ├─ LoginScreen.tsx
│  │  └─ Registro.tsx
│  ├─ /pages
│  │  ├─ Inicio.tsx
│  │  ├─ Perros.tsx
│  │  ├─ Gatos.tsx
│  │  ├─ Adopciones.tsx
│  │  ├─ Voluntarios.tsx
│  │  ├─ Reportes.tsx
│  │  └─ Configuracion.tsx
│  ├─ /types
│  │  └─ types.ts
│  ├─ App.tsx
│  └─ main.tsx
├─ package.json
├─ tsconfig.json
└─ vite.config.ts

# Funcionalidades principales

Usuarios: crear, editar y eliminar. Control de rol (administrador/usuario).
Animales: ver perros y gatos disponibles para adopción.
Adopciones y voluntarios: registrar y dar seguimiento a las adopciones y voluntarios.
Reportes: exportar usuarios a CSV, Excel o PDF.
Sidebar dinámico: adaptado para móviles y escritorio.
Autenticación: login y registro con control de roles.

# Instalación y ejecución
Clonar el repositorio:

git clone https://github.com/Gladys-2/albergue_huellitas_frontend.git
cd albergue_huellitas_frontend


**Instalar dependencias:**
npm install


**Ejecutar el proyecto en modo desarrollo:**
npm run dev


**Abrir en el navegador:**
http://localhost:5173


Asegúrate de que el backend esté corriendo en http://localhost:5000 para que la aplicación funcione correctamente.

# Configuración
Si el backend no está en localhost:5000, actualiza la URL en los servicios que consumen la API, por ejemplo:

const API_URL = "http://TU_BACKEND:PUERTO/api/usuarios";

# Uso
1. Inicia sesión con un usuario existente o crea uno nuevo.
2. Usa el sidebar para navegar entre: Inicio, Usuarios, Perros, Gatos, Adopciones, Voluntarios, Reportes y Configuración.
3. Los usuarios con rol administrador pueden crear, editar y eliminar usuarios.
4. Exporta los reportes desde la bandeja de usuarios en CSV, Excel o PDF.
