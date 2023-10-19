import { ProductoInterface } from "./producto.interface";

export interface DetallePromocionInterface {
  id: number;
  promocion: number;
  cantidad: number;
  producto: number;
  Producto?: ProductoInterface;
}
