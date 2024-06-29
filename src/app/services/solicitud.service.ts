import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Solicitud } from '../interfaces/Solicitud';

@Injectable({
  providedIn: 'root',
})
export class SolicitudService {
  private apiUrl = 'http://localhost:8080/solicitud';

  constructor(private http: HttpClient) {}

  getSolicitudesActivas(): Observable<Solicitud[]> {
    return this.http.get<Solicitud[]>(`${this.apiUrl}/activa`);
  }
  getSolicitudActivaPorId(id: number): Observable<Solicitud> {
    return this.http.get<Solicitud>(`${this.apiUrl}/${id}`);
  }
  actualizarEstadoPorId(id: number, estado: string): Observable<Solicitud> {
    return this.http.put<Solicitud>(
      `${this.apiUrl}/actualizar-estado/${id}?estado=${estado}`,
      id
    );
  }
  crearSolicitud(solicitud: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      accept: '*/*',
    });
    return this.http.post<any>(this.apiUrl, solicitud, { headers });
  }
}
