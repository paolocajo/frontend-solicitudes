// estado.service.ts
import { Injectable } from '@angular/core';

export interface Estado {
  idUsuario: number;
  nombreUsuario: string;
  authenticated: boolean;
}

@Injectable({
  providedIn: 'root', // Esto asegura que el servicio sea un Singleton
})
export class EstadoService {
  private estado!: Estado;

  setEstado(estado: Estado) {
    this.estado = estado;
  }

  getEstado(): Estado | null {
    return this.estado;
  }
}
