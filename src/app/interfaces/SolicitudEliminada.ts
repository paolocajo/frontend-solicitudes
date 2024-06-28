import { Solicitud } from './Solicitud';
import { Usuario } from './Usuario';

export interface SolicitudEliminada {
  idEliminado: number;
  idSolicitud: Solicitud;
  motivo: string;
  fechaEliminacion: Date;
  idUsuarioEliminador: Usuario;
}
