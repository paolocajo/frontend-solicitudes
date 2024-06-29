import { Solicitud } from './Solicitud';
import { Usuario } from './Usuario';

export interface SolicitudFinalizada {
  idFinalizado: number;
  idSolicitud: Solicitud;
  fechaFinalizacion: Date;
  idUsuarioFinalizador: Usuario;
}
