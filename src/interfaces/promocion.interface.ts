import { DetallePromocionInterface } from "./detallePromocion.interface";
import { TipoEstadoPromocionInterface } from "./tipo.interface";

export interface PromocionInterface {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  fechaInicio: string;
  fechaFin: string;
  horaInicio: string;
  horaFin: string;
  validoLunes: boolean;
  validoMartes: boolean;
  validoMiercoles: boolean;
  validoJueves: boolean;
  validoViernes: boolean;
  validoSabado: boolean;
  validoDomingo: boolean;
  estado: number;
  EstadoPromocion?: TipoEstadoPromocionInterface;
  DetallesPromocion?: DetallePromocionInterface[];
}

export interface PromocionErrorInterface {
  nombre: boolean;
  descripcion: boolean;
  precio: boolean;
  fechaInicio: boolean;
  fechaFin: boolean;
  horaInicio: boolean;
  horaFin: boolean;
  validoLunes: boolean;
  validoMartes: boolean;
  validoMiercoles: boolean;
  validoJueves: boolean;
  validoViernes: boolean;
  validoSabado: boolean;
  validoDomingo: boolean;
  estado: boolean;
}
