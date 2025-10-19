export interface Usuario {
  id?: number;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  cedula_identidad?: string;
  telefono?: string;
  correo_electronico: string;
  contrasena?: string;
  rol: "usuario" | "administrador";
  genero?: "M" | "F" | "O";
  estado: "Activo" | "Inactivo";
  fecha_creacion?: string;
  fecha_actualizacion?: string;
}