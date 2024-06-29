import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Solicitud } from '../../interfaces/Solicitud';
import { SolicitudService } from '../../services/solicitud.service';
import { SolicitudFinalizadaService } from '../../services/solicitud-finalizada.service';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from './../../interfaces/Usuario';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detalle-solicitud-activa-page',
  templateUrl: './detalle-solicitud-activa-page.component.html',
  styleUrls: ['./detalle-solicitud-activa-page.component.css'],
})
export class DetalleSolicitudActivaPageComponent implements OnInit {
  solicitud: Solicitud = {} as Solicitud;
  usuarios: Usuario[] = [];
  idSolicitud: string | null = null;

  constructor(
    private solicitudService: SolicitudService,
    private solicitudFinalizadaService: SolicitudFinalizadaService,
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

  newFinalizado = {
    idFinalizado: null,
    idSolicitud: null,
    fechaFinalizacion: null,
    idUsuarioFinalizador: null,
  };

  guardar(id: any) {
    this.newFinalizado.idSolicitud = id;
    console.log(this.newFinalizado);
    let bodyFinalizado = {
      idFinalizado: 0,
      idSolicitud: {
        idSolicitud: this.newFinalizado.idSolicitud,
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
      fechaFinalizacion: this.newFinalizado.fechaFinalizacion,
      idUsuarioFinalizador: {
        idUsuario: this.newFinalizado.idUsuarioFinalizador,
        nombreUsuario: 'string',
      },
    };

    firstValueFrom(
      this.solicitudFinalizadaService.crearSolicitudFinalizada(bodyFinalizado)
    )
      .then(() =>
        firstValueFrom(
          this.solicitudService.actualizarEstadoPorId(id, 'finalizada')
        )
      )
      .then(() => {
        this.router.navigate(['solicitudes-finalizadas']);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
}
