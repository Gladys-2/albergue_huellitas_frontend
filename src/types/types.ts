export interface Usuario {
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
  estado?: "Disponible" | "Adoptado" | "En cuidado";
  foto?: string;
  refugioId?: number;
  fecha_creacion?: string;
  fecha_actualizacion?: string;
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

export interface AuditoriaUsuarios {
  id?: number;
  usuarioId?: number;
  accion?: string;
  descripcion?: string;
  fecha?: string;
}

export interface AuditoriaAdopciones {
  id?: number;
  adopcionId?: number;
  usuario_responsable?: string;
  accion?: string;
  descripcion?: string;
  fecha?: string;
}

export interface AuditoriaDonaciones {
  id?: number;
  donacionId?: number;
  usuario_responsable?: string;
  accion?: string;
  descripcion?: string;
  fecha?: string;
}