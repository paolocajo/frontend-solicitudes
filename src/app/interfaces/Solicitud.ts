import { Usuario } from './Usuario';

export interface Solicitud {
  idSolicitud: number;
  fechaRegistro: Date;
  codigo: string;
  detalle: string;
  modificado: boolean;
  estado: string;
  idUsuarioSolicitante: Usuario;
}
