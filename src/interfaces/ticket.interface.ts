// import { DetalleTicketInterface } from "./detalleTicket.interface";
import { EmpleadoInterface } from "./empleado.interface";
import { MesaInterface } from "./mesa.interface";
import { PedidoInterface } from "./pedido.interface";
import { TipoPagoInterface } from "./tipo.interface";

export interface TicketInterface {
  id: number;
  valida: boolean;
  mesa: number;
  empleadoAtiende: number;
  empleadoFacturo: number;
  EmpleadoAtendio?: EmpleadoInterface;
  EmpleadoFacturo?: EmpleadoInterface;
  Mesa?: MesaInterface;
  // DetalleFactura?: DetalleTicketInterface[];
}
