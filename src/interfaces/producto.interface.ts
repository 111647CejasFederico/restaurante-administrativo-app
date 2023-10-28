import { TipoProductoInterface } from "./tipo.interface";

export interface ProductoInterface {
  id: number;
  nombre: string;
  descripcion: string;
  tipo: number;
  precio: number;
  habilitado: boolean;
  TipoProducto?: TipoProductoInterface;
}

export interface ProductoErrorInterface {
  nombre: boolean;
  descripcion: boolean;
  tipo: boolean;
  precio: boolean;
  habilitado: boolean;
}
