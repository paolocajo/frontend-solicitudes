import { Component, OnInit } from '@angular/core';
import { SolicitudEliminadaService } from '../../services/solicitud-eliminada.service';
import { SolicitudEliminada } from '../../interfaces/SolicitudEliminada';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalle-solicitud-eliminada-page',
  templateUrl: './detalle-solicitud-eliminada-page.component.html',
  styleUrl: './detalle-solicitud-eliminada-page.component.css',
})
export class DetalleSolicitudEliminadaPageComponent implements OnInit {
  solicitudEliminada: SolicitudEliminada = {} as SolicitudEliminada;

  constructor(
    private solicitudEliminadaService: SolicitudEliminadaService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const idParam = this.activatedRoute.snapshot.paramMap.get('id');
    if (idParam !== null) {
      const id = +idParam;
      this.solicitudEliminadaService
        .getSolicitudEliminadaPorId(id)
        .subscribe((data: SolicitudEliminada) => {
          this.solicitudEliminada = data;
        });
    } else {
      console.error('ID de parámetro nulo');
    }
  }
}
