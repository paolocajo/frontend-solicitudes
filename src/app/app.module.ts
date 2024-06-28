import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SolicitudesActivasPageComponent } from './pages/solicitudes-activas-page/solicitudes-activas-page.component';
import { NuevaSolicitudPageComponent } from './pages/nueva-solicitud-page/nueva-solicitud-page.component';
import { EditarSolicitudPageComponent } from './pages/editar-solicitud-page/editar-solicitud-page.component';
import { DetalleSolicitudActivaPageComponent } from './pages/detalle-solicitud-activa-page/detalle-solicitud-activa-page.component';
import { DetalleSolicitudFinalizadaPageComponent } from './pages/detalle-solicitud-finalizada-page/detalle-solicitud-finalizada-page.component';
import { DetalleSolicitudEliminadaPageComponent } from './pages/detalle-solicitud-eliminada-page/detalle-solicitud-eliminada-page.component';
import { SolicitudesEliminadasPageComponent } from './pages/solicitudes-eliminadas-page/solicitudes-eliminadas-page.component';
import { SolicitudesFinalizadasPageComponent } from './pages/solicitudes-finalizadas-page/solicitudes-finalizadas-page.component';
import { EliminarSolicitudPageComponent } from './pages/eliminar-solicitud-page/eliminar-solicitud-page.component';
import { Nav1Component } from './components/nav-1/nav-1.component';
import { Nav2Component } from './components/nav-2/nav-2.component';
import { Error404PageComponent } from './pages/error-404-page/error-404-page.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    SolicitudesActivasPageComponent,
    NuevaSolicitudPageComponent,
    EditarSolicitudPageComponent,
    DetalleSolicitudActivaPageComponent,
    DetalleSolicitudFinalizadaPageComponent,
    DetalleSolicitudEliminadaPageComponent,
    SolicitudesEliminadasPageComponent,
    SolicitudesFinalizadasPageComponent,
    EliminarSolicitudPageComponent,
    Nav1Component,
    Nav2Component,
    Error404PageComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
