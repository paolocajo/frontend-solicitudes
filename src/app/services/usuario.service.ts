import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../interfaces/Usuario';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private apiUrl = 'http://localhost:8080/usuario';

  getByNombreUsuarioAndContrasena(usuario: any, contrasena: any) {
    return this.http.post<any>(
      `${this.apiUrl}/login?username=${usuario}&password=${contrasena}`,
      {}
    );
  }
  constructor(private http: HttpClient) {}

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }
}
