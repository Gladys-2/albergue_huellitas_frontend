export interface Usuario {
  email: any;
  correo: any;
  avatarUrl: string;
  id?: number;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  cedula_identidad?: string;
  telefono?: string;
  correo_electronico: string;
  contrasena?: string;
  rol?: "usuario" | "administrador";
  genero?: "M" | "F" | "O";
  estado?: "Activo" | "Inactivo";
  fecha_creacion?: string;
  fecha_actualizacion?: string;
}

export interface Refugio {
  id?: number;
  nombre: string;
  direccion: string;
  telefono?: string;
  correo?: string;
  fecha_creacion?: string;
  fecha_actualizacion?: string;
}

export interface Animal {
  id?: number; 
  nombre: string; 
  especie?: string; 
  raza?: string;
  edad?: number; 
  descripcion?: string;
  estado_animal?: "Disponible" | "Adoptado" | "En cuidado"; 
  foto?: string; 
  sexo?: "Macho" | "Hembra";
  refugio_id?: number; 
  estado?: "Activo" | "Inactivo"; 
  fecha_creacion?: string; 
  usuario_creacion?: string; 
  fecha_modificacion?: string; 
  usuario_modificacion?: string;
}

export interface Adopcion {
  id?: number;
  usuarioId: number;
  animalId: number;
  fecha?: string;
  estado?: "Pendiente" | "Aprobada" | "Rechazada";
}

export interface Donacion {
  id?: number;
  usuarioId?: number;
  monto: number;
  tipo?: string;
  fecha?: string;
}

export interface Voluntario {
  id?: number;
  nombre: string;
  telefono?: string;
  correo?: string;
  refugioId?: number;
}

export interface Administrador {
  id?: number;
  usuarioId?: number;
  privilegios?: string;
}
