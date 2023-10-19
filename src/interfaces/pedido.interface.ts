// import { DetallePedidoInterface } from "./detallePedido.interface";
import { EmpleadoInterface } from "./empleado.interface";
import { MesaInterface } from "./mesa.interface";
import { TipoEstadoPedidoInterface } from "./tipo.interface";

export interface PedidoInterface {
  id: number;
  valida: boolean;
  estado: number;
  mesa: number;
  empleadoAtiende: number;
  EmpleadoAtiende?: EmpleadoInterface;
  Mesa?: MesaInterface;
  EstadoPedido?: TipoEstadoPedidoInterface;
  // DetallePedido?: DetallePedidoInterface[];
}
