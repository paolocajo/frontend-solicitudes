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
  private readonly STORAGE_KEY = 'appEstado';

  constructor() {
    // Cargar el estado del almacenamiento local cuando el servicio se inicializa
    const savedEstado = localStorage.getItem(this.STORAGE_KEY);
    if (savedEstado) {
      this.estado = JSON.parse(savedEstado);
    }
  }

  private estado: Estado | null = null;

  setEstado(estado: Estado): void {
    this.estado = estado;
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(estado));
  }

  getEstado(): Estado | null {
    return this.estado;
  }

  clearEstado(): void {
    this.estado = null;
    localStorage.removeItem(this.STORAGE_KEY);
  }
}
