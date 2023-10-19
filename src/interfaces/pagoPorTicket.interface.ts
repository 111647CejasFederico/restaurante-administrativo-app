import { TicketInterface } from "./ticket.interface";
import { TipoPagoInterface } from "./tipo.interface";

export interface PagosPorTicketInterface {
  id: number;
  ticket: number;
  tipoPago: number;
  importe: number;
  Ticket?: TicketInterface;
  TipoPago?: TipoPagoInterface;
}
