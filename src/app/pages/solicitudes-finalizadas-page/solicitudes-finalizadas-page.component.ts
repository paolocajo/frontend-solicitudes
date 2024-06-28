import { Component, OnInit } from '@angular/core';
import { SolicitudFinalizada } from '../../interfaces/SolicitudFinalizada';
import { SolicitudFinalizadaService } from '../../services/solicitud-finalizada.service';

@Component({
  selector: 'app-solicitudes-finalizadas-page',
  templateUrl: './solicitudes-finalizadas-page.component.html',
  styleUrl: './solicitudes-finalizadas-page.component.css',
})
export class SolicitudesFinalizadasPageComponent implements OnInit {
  solicitudes: SolicitudFinalizada[] = [];

  constructor(private solicitudFinalizadaService: SolicitudFinalizadaService) {}

  ngOnInit(): void {
    this.solicitudFinalizadaService
      .getSolicitudesFinalizadas()
      .subscribe((data: SolicitudFinalizada[]) => {
        this.solicitudes = data;
      });
  }
}
