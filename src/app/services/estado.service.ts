import { Injectable } from '@angular/core';

export interface Estado {
  idUsuario: number;
  nombreUsuario: string;
  authenticated: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class EstadoService {
  private readonly STORAGE_KEY = 'appEstado';
  private estado: Estado | null = null;

  constructor() {
    const savedEstado = localStorage.getItem(this.STORAGE_KEY);
    if (savedEstado) {
      this.estado = JSON.parse(savedEstado);
    }
  }

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
