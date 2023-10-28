import { TipoEstadoUsuarioInterface, TipoRolInterface } from "./tipo.interface";

export interface EmpleadoInterface {
  id: number;
  user: string;
  pass: string;
  nombre: string;
  apellido: string;
  nroDocumento: number;
  rol: number;
  telefono: string;
  email: string;
  estado: number;
  token?: string;
  Rol?: TipoRolInterface;
  EstadoUsuario?: TipoEstadoUsuarioInterface;
}

export interface EmpleadoErrorInterface {
  user: boolean;
  pass: boolean;
  nombre: boolean;
  apellido: boolean;
  nroDocumento: boolean;
  rol: boolean;
  telefono: boolean;
  email: boolean;
  estado: boolean;
}

export type AuthType = Pick<EmpleadoInterface, "user" | "pass" | "rol" | "token">;
