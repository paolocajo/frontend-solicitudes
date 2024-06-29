import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from './../../interfaces/Usuario';
import { Router } from '@angular/router';
import { SolicitudService } from '../../services/solicitud.service';
import { Solicitud } from '../../interfaces/Solicitud';

@Component({
  selector: 'app-editar-solicitud-page',
  templateUrl: './editar-solicitud-page.component.html',
  styleUrls: ['./editar-solicitud-page.component.css'],
})
export class EditarSolicitudPageComponent implements OnInit {
  solicitud: Solicitud = {} as Solicitud;
  usuarios: Usuario[] = [];
  idSolicitud: string | null = null;
  newEditado: any = {};

  constructor(
    private solicitudService: SolicitudService,
    private usuarioService: UsuarioService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const idParam = this.activatedRoute.snapshot.paramMap.get('id');

    if (idParam !== null) {
      const id = +idParam;

      Promise.all([
        this.solicitudService.getSolicitudActivaPorId(id).toPromise(),
        this.usuarioService.getUsuarios().toPromise(),
      ])
        .then(([solicitudData, usuariosData]) => {
          this.solicitud = solicitudData ?? ({} as Solicitud);
          this.usuarios = usuariosData ?? [];

          this.newEditado = {
            idSolicitud: this.solicitud.idSolicitud,
            fechaRegistro: this.solicitud.fechaRegistro,
            codigo: this.solicitud.codigo,
            detalle: this.solicitud.detalle,
            modificado: true,
            estado: 'activa',
            idUsuarioSolicitante: this.solicitud.idUsuarioSolicitante.idUsuario,
          };
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    } else {
      console.error('ID de parámetro nulo');
    }
  }

  guardar(id: any) {
    if (!this.newEditado.fechaRegistro) {
      console.error('Fecha de registro no puede ser nula');
      return;
    }

    const fecha = new Date(this.newEditado.fechaRegistro);
    const formattedFecha = fecha.toISOString().split('T')[0];
    console.log(this.newEditado);
    let bodyEditado = {
      idSolicitud: id,
      fechaRegistro: formattedFecha,
      codigo: this.newEditado.codigo,
      detalle: this.newEditado.detalle,
      modificado: this.newEditado.modificado,
      estado: this.newEditado.estado,
      idUsuarioSolicitante: {
        idUsuario: this.newEditado.idUsuarioSolicitante,
        nombreUsuario: 'string',
      },
    };
    this.solicitudService.editarSolicitud(bodyEditado, id).subscribe(
      (response) => {
        console.log('Solicitud editada:', response);

        this.router.navigate(['solicitudes-activas']);
      },
      (error) => {
        console.error('Error al editar la solicitud:', error);
      }
    );
  }
}
