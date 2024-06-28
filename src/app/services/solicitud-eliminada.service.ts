import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SolicitudEliminada } from '../interfaces/SolicitudEliminada';

@Injectable({
  providedIn: 'root',
})
export class SolicitudEliminadaService {
  private apiUrl = 'http://localhost:8080/solicitud/eliminada';

  constructor(private http: HttpClient) {}

  crearSolicitudEliminada(solicitudEliminada: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      accept: '*/*',
    });
    return this.http.post<any>(this.apiUrl, solicitudEliminada, { headers });
  }
  getSolicitudesEliminadas(): Observable<SolicitudEliminada[]> {
    return this.http.get<SolicitudEliminada[]>(this.apiUrl);
  }
}
