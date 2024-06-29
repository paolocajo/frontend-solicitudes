import { Component, OnInit } from '@angular/core';
import { SolicitudFinalizada } from '../../interfaces/SolicitudFinalizada';
import { ActivatedRoute } from '@angular/router';
import { SolicitudFinalizadaService } from '../../services/solicitud-finalizada.service';

@Component({
  selector: 'app-detalle-solicitud-finalizada-page',
  templateUrl: './detalle-solicitud-finalizada-page.component.html',
  styleUrl: './detalle-solicitud-finalizada-page.component.css',
})
export class DetalleSolicitudFinalizadaPageComponent implements OnInit {
  solicitudFinalizada: SolicitudFinalizada = {} as SolicitudFinalizada;

  constructor(
    private solicitudFinalizadaService: SolicitudFinalizadaService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const idParam = this.activatedRoute.snapshot.paramMap.get('id');
    if (idParam !== null) {
      const id = +idParam;
      this.solicitudFinalizadaService
        .getSolicitudFinalizadaPorId(id)
        .subscribe((data: SolicitudFinalizada) => {
          this.solicitudFinalizada = data;
        });
    } else {
      console.error('ID de parámetro nulo');
    }
  }
}
