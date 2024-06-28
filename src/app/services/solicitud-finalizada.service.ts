import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SolicitudFinalizada } from '../interfaces/SolicitudFinalizada';

@Injectable({
  providedIn: 'root',
})
export class SolicitudFinalizadaService {
  private apiUrl = 'http://localhost:8080/solicitud/finalizada';

  constructor(private http: HttpClient) {}

  crearSolicitudFinalizada(solicitudFinalizada: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      accept: '*/*',
    });
    return this.http.post<any>(this.apiUrl, solicitudFinalizada, { headers });
  }
  getSolicitudesFinalizadas(): Observable<SolicitudFinalizada[]> {
    return this.http.get<SolicitudFinalizada[]>(this.apiUrl);
  }
}
