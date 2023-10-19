interface AuxiliarInterface {
  id: number;
  nombre: string;
  descripcion: string;
  habilitado: boolean;
}

export interface TipoEstadoUsuarioInterface extends AuxiliarInterface {}
export interface TipoEstadoPedidoInterface extends AuxiliarInterface {}
export interface TipoEstadoPromocionInterface extends AuxiliarInterface {}
export interface TipoPagoInterface extends AuxiliarInterface {}
export interface TipoProductoInterface extends AuxiliarInterface {}
export interface TipoRolInterface extends AuxiliarInterface {}
