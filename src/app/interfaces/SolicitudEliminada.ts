import { Solicitud } from './Solicitud';
import { Usuario } from './Usuario';

export interface SolicitudEliminada {
  idEliminado: number | null;
  idSolicitud: Solicitud | null | number;
  motivo: string | null;
  fechaEliminacion: Date | null;
  idUsuarioEliminador: Usuario | null;
}
