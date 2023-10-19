import { ProductoInterface } from "./producto.interface";
import { PedidoInterface } from "./pedido.interface";
import { PromocionInterface } from "./promocion.interface";

export interface DetallePedidoInterface {
  id: number;
  pedido: number;
  nombreProducto: string;
  precio: number;
  cantidad: number;
  promocion: number | null;
  producto: number | null;
  Pedido?: PedidoInterface;
  Promocion?: PromocionInterface | null;
  Producto?: ProductoInterface | null;
}
