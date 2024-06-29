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
  newEditado: any = {}; // Inicializa aquí para asegurar que tenga un valor inicial

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

          // Inicializa newEditado con los datos de la solicitud y usuarios
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
    console.log(this.newEditado);
    let bodyEditado = {
      idSolicitud: id,
      fechaRegistro: this.newEditado.fechaRegistro,
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
