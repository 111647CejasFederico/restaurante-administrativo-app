import { ProductoInterface } from "./producto.interface";
import { PromocionInterface } from "./promocion.interface";

export interface DetalleCartaInterface {
  id?: number;
  carta: number;
  promocion: number | null;
  producto: number | null;
  cantidadDisponible: number | null;
  disponible: boolean;
  visible: boolean;
  Promocion?: PromocionInterface;
  Producto?: ProductoInterface | null;
}
export interface DetalleCartaErrorInterface {
  carta: boolean;
  promocion: boolean;
  producto: boolean;
  cantidadDisponible: boolean;
}
