import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { EstadoService, Estado } from '../services/estado.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private estadoService: EstadoService, private router: Router) {}

  canActivate(): boolean {
    const estado: Estado | null = this.estadoService.getEstado();
    if (estado?.authenticated) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
