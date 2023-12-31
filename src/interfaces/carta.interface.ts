// import { DetalleCartaInterface } from "./detalleCarta.interface";

import { DetalleCartaInterface } from "./detalleCarta.interface";

export interface CartaInterface {
  id?: number;
  nombre: string;
  descripcion: string;
  fechaInicioValidez: string;
  fechaFinValidez: string;
  habilitado: boolean;
  DetallesCarta?: DetalleCartaInterface[];
}
export interface CartaErrorInterface {
  nombre: boolean;
  descripcion: boolean;
  fechaInicioValidez: boolean;
  fechaFinValidez: boolean;
  habilitado: boolean;
  // DetalleCarta?: DetalleCartaInterface[];
}
