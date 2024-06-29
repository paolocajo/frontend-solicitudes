import { Component, OnInit } from '@angular/core';
import { Solicitud } from '../../interfaces/Solicitud';
import { SolicitudService } from '../../services/solicitud.service';
import { EstadoService } from '../../services/estado.service';

@Component({
  selector: 'app-solicitudes-activas-page',
  templateUrl: './solicitudes-activas-page.component.html',
  styleUrls: ['./solicitudes-activas-page.component.css'],
})
export class SolicitudesActivasPageComponent implements OnInit {
  solicitudesActivas: Solicitud[] = [];

  constructor(
    private solicitudService: SolicitudService,
    private estadoService: EstadoService
  ) {}

  ngOnInit(): void {
    this.solicitudService
      .getSolicitudesActivas()
      .subscribe((data: Solicitud[]) => {
        this.solicitudesActivas = data;
      });
    console.log(this.estadoService.getEstado());
  }
}
