import { ProductoInterface } from "./producto.interface";
import { TicketInterface } from "./ticket.interface";
import { PromocionInterface } from "./promocion.interface";

export interface DetalleTicketInterface {
  id: number;
  ticket: number;
  nombreProducto: string;
  precio: number;
  cantidad: number;
  promocion: number | null;
  producto: number | null;
  Promocion?: PromocionInterface | null;
  Producto?: ProductoInterface | null;
  Ticket?: TicketInterface;
}
