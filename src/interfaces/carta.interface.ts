// import { DetalleCartaInterface } from "./detalleCarta.interface";

export interface CartaInterface {
  id: number;
  nombre: string;
  descripcion: string;
  fechaInicioValidez: string;
  fechaFinValidez: string;
  habilitado: boolean;
  // DetalleCarta?: DetalleCartaInterface[];
}
