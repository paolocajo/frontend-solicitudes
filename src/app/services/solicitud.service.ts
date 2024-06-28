import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
}
