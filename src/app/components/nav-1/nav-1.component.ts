import { Component, OnInit } from '@angular/core';
import { EstadoService, Estado } from '../../services/estado.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-1',
  templateUrl: './nav-1.component.html',
  styleUrls: ['./nav-1.component.css'],
})
export class Nav1Component implements OnInit {
  estado: Estado;

  constructor(private estadoService: EstadoService, private router: Router) {
    this.estado = this.estadoService.getEstado() || {
      idUsuario: 0,
      nombreUsuario: '',
      authenticated: false,
    };
  }

  ngOnInit(): void {
    console.log(this.estadoService.getEstado());
  }

  cerrarSesion() {
    this.estadoService.setEstado({
      idUsuario: 0,
      nombreUsuario: '',
      authenticated: false,
    });
    this.estado = { idUsuario: 0, nombreUsuario: '', authenticated: false };
    this.router.navigate(['/login']);
  }
}
