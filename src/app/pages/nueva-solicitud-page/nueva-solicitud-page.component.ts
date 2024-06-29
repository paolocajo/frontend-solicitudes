import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from './../../interfaces/Usuario';
import { Router } from '@angular/router';
import { SolicitudService } from '../../services/solicitud.service';

@Component({
  selector: 'app-nueva-solicitud-page',
  templateUrl: './nueva-solicitud-page.component.html',
  styleUrls: ['./nueva-solicitud-page.component.css'],
})
export class NuevaSolicitudPageComponent implements OnInit {
  usuarios: Usuario[] = [];

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private solicitudService: SolicitudService
  ) {}

  ngOnInit(): void {
    this.usuarioService.getUsuarios().subscribe((data: Usuario[]) => {
      this.usuarios = data;
    });
  }

  newAgregado = {
    idSolicitud: null, // default
    fechaRegistro: null, // fecha FORM
    codigo: null, // codigo FORM
    detalle: null, // detalle FORM
    modificado: false, // default false
    estado: 'activa', // default activa
    idUsuarioSolicitante: null, // id FORM
  };

  guardar() {
    if (!this.newAgregado.fechaRegistro) {
      console.error('Fecha de registro no puede ser nula');
      return;
    }

    const fecha = new Date(this.newAgregado.fechaRegistro);
    const formattedFecha = fecha.toISOString().split('T')[0]; // Formato yyyy-MM-dd
    let bodyAgregado = {
      idSolicitud: 0,
      fechaRegistro: formattedFecha,
      codigo: this.newAgregado.codigo,
      detalle: this.newAgregado.detalle,
      modificado: this.newAgregado.modificado,
      estado: this.newAgregado.estado,
      idUsuarioSolicitante: {
        idUsuario: this.newAgregado.idUsuarioSolicitante,
        nombreUsuario: 'string',
      },
    };
    // console.log(bodyAgregado);
    this.solicitudService.crearSolicitud(bodyAgregado).subscribe(
      (response) => {
        console.log('Solicitud creada:', response);

        this.router.navigate(['solicitudes-activas']);
      },
      (error) => {
        console.error('Error al crear la solicitud:', error);
      }
    );
  }
}
