import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Solicitud } from '../../interfaces/Solicitud';
import { SolicitudService } from '../../services/solicitud.service';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from './../../interfaces/Usuario';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-detalle-solicitud-activa-page',
  templateUrl: './detalle-solicitud-activa-page.component.html',
  styleUrls: ['./detalle-solicitud-activa-page.component.css'],
})
export class DetalleSolicitudActivaPageComponent implements OnInit {
  solicitud: Solicitud = {} as Solicitud;
  usuarios: Usuario[] = [];

  constructor(
    private solicitudService: SolicitudService,
    private usuarioService: UsuarioService,
    private activatedRoute: ActivatedRoute
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
}
