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
  TipoRol?: TipoRolInterface;
  Estado?: TipoEstadoUsuarioInterface;
}

export type AuthType = Pick<EmpleadoInterface, "user" | "pass" | "rol" | "token">;
