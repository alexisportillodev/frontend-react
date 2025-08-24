export enum EstadoRegistro {
  PENDIENTE = 1,
  EN_REVISION = 2,
  APROBADO = 3,
  RECHAZADO = 4,
  VIGENTE = 5,
  VENCIDO = 6
}

export interface RegistroMarca {
  id?: number;
  nombre_marca: string;
  descripcion?: string;
  categoria: string;
  clase_niza?: string;
  solicitante: string;
  email_solicitante: string;
  estado: EstadoRegistro;
  numero_solicitud?: string;
  fecha_solicitud?: string;
  fecha_aprobacion?: string;
  created_at?: string;
  updated_at?: string;
}

export interface CreateRegistroMarca {
  nombre_marca: string;
  descripcion?: string;
  categoria: string;
  clase_niza?: string;
  solicitante: string;
  email_solicitante: string;
}

export interface UpdateRegistroMarca extends Partial<CreateRegistroMarca> {
  estado?: EstadoRegistro;
  numero_solicitud?: string;
  fecha_aprobacion?: string;
}
