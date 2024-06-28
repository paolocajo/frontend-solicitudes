import { Solicitud } from './Solicitud';
import { Usuario } from './Usuario';

export interface SolicitudFinalizada {
  idFinalizado: number | null;
  idSolicitud: Solicitud;
  fechaFinalizacion: Date | null;
  idUsuarioFinalizador: Usuario | null;
}
