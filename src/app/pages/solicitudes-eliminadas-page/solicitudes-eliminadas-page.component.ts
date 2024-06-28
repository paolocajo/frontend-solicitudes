import { Component, OnInit } from '@angular/core';
import { SolicitudEliminada } from '../../interfaces/SolicitudEliminada';
import { SolicitudEliminadaService } from '../../services/solicitud-eliminada.service';

@Component({
  selector: 'app-solicitudes-eliminadas-page',
  templateUrl: './solicitudes-eliminadas-page.component.html',
  styleUrl: './solicitudes-eliminadas-page.component.css',
})
export class SolicitudesEliminadasPageComponent implements OnInit {
  solicitudes: SolicitudEliminada[] = [];

  constructor(private solicitudEliminadaService: SolicitudEliminadaService) {}

  ngOnInit(): void {
    this.solicitudEliminadaService
      .getSolicitudesEliminadas()
      .subscribe((data: SolicitudEliminada[]) => {
        this.solicitudes = data;
      });
  }
}
