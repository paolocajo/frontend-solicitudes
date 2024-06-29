import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../interfaces/Usuario';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  usuario: Usuario | any;

  newLogin = {
    usuario: '',
    contrasena: '',
  };

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  ngOnInit(): void {}

  async guardar() {
    try {
      this.usuario = await this.usuarioService
        .getByNombreUsuarioAndContrasena(
          this.newLogin.usuario,
          this.newLogin.contrasena
        )
        .toPromise();

      if (this.usuario && this.usuario.idUsuario) {
        const authenticatedUser = {
          idUsuario: this.usuario.idUsuario,
          nombreUsuario: this.usuario.nombreUsuario,
          authenticated: true,
        };

        this.router.navigate(['/solicitudes-activas']);
      } else {
        console.error('Usuario no válido');
      }

      console.log('Respuesta del servicio:', this.usuario);
    } catch (error) {
      console.error('Error al obtener el usuario:', error);
      this.usuario = {};
    }

    console.log('Petición enviada:', this.newLogin);
    console.log('Usuario:', this.usuario);
  }
}
