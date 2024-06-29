import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Solicitud } from '../../interfaces/Solicitud';
import { SolicitudService } from '../../services/solicitud.service';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from './../../interfaces/Usuario';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { SolicitudEliminadaService } from '../../services/solicitud-eliminada.service';

@Component({
  selector: 'app-eliminar-solicitud-page',
  templateUrl: './eliminar-solicitud-page.component.html',
  styleUrls: ['./eliminar-solicitud-page.component.css'],
})
export class EliminarSolicitudPageComponent implements OnInit {
  solicitud: Solicitud = {} as Solicitud;
  usuarios: Usuario[] = [];
  idSolicitud: string | null = null;

  constructor(
    private solicitudService: SolicitudService,
    private solicitudEliminadaService: SolicitudEliminadaService,
    private usuarioService: UsuarioService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const idParam = this.activatedRoute.snapshot.paramMap.get('id');

    if (idParam !== null) {
      const id = +idParam;

      Promise.all([
        firstValueFrom(this.solicitudService.getSolicitudActivaPorId(id)),
        firstValueFrom(this.usuarioService.getUsuarios()),
      ])
        .then(([solicitudData, usuariosData]) => {
          this.solicitud = solicitudData ?? ({} as Solicitud);
          this.usuarios = usuariosData ?? [];
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    } else {
      console.error('ID de parámetro nulo');
    }
  }

  newEliminado = {
    idEliminado: null,
    idSolicitud: null,
    motivo: null,
    fechaEliminacion: null,
    idUsuarioEliminador: null,
  };

  guardar(id: any) {
    this.newEliminado.idSolicitud = id;

    let formattedFechaEliminacion = null;
    if (this.newEliminado.fechaEliminacion) {
      const fechaEliminacion = new Date(this.newEliminado.fechaEliminacion);
      formattedFechaEliminacion = fechaEliminacion.toISOString().split('T')[0]; // Formato yyyy-MM-dd
    }

    console.log(this.newEliminado);
    let bodyEliminado = {
      idEliminado: 0,
      idSolicitud: {
        idSolicitud: this.newEliminado.idSolicitud,
        fechaRegistro: '',
        codigo: 'string',
        detalle: 'string',
        modificado: true,
        estado: 'string',
        idUsuarioSolicitante: {
          idUsuario: 0,
          nombreUsuario: 'string',
        },
      },
      motivo: this.newEliminado.motivo,
      fechaEliminacion: formattedFechaEliminacion,
      idUsuarioEliminador: {
        idUsuario: this.newEliminado.idUsuarioEliminador,
        nombreUsuario: 'string',
      },
    };

    firstValueFrom(
      this.solicitudEliminadaService.crearSolicitudEliminada(bodyEliminado)
    )
      .then(() =>
        firstValueFrom(
          this.solicitudService.actualizarEstadoPorId(id, 'eliminada')
        )
      )
      .then(() => {
        this.router.navigate(['solicitudes-eliminadas']);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
}
