import { ProductoInterface } from "./producto.interface";
import { PromocionInterface } from "./promocion.interface";

export interface DetalleCartaInterface {
  id: number;
  carta: number;
  promocion: number | null;
  producto: number | null;
  Promocion?: PromocionInterface;
  Producto?: ProductoInterface | null;
}
