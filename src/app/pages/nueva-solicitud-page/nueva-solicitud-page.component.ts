import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from './../../interfaces/Usuario';
import { Router } from '@angular/router';
import { SolicitudService } from '../../services/solicitud.service';

@Component({
  selector: 'app-nueva-solicitud-page',
  templateUrl: './nueva-solicitud-page.component.html',
  styleUrl: './nueva-solicitud-page.component.css',
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
    idSolicitud: null, //default
    fechaRegistro: null, //fecha FORM
    codigo: null, //codigo  FORM
    detalle: null, // detalle  FORM
    modificado: false, // default false
    estado: 'activa', //default activa
    idUsuarioSolicitante: null, //id  FORM
  };

  guardar() {
    console.log(this.newAgregado);
    let bodyAgregado = {
      idSolicitud: 0,
      fechaRegistro: this.newAgregado.fechaRegistro,
      codigo: this.newAgregado.codigo,
      detalle: this.newAgregado.detalle,
      modificado: this.newAgregado.modificado,
      estado: this.newAgregado.estado,
      idUsuarioSolicitante: {
        idUsuario: this.newAgregado.idUsuarioSolicitante,
        nombreUsuario: 'string',
      },
    };
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
