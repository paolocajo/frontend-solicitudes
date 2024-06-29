import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetalleSolicitudActivaPageComponent } from './pages/detalle-solicitud-activa-page/detalle-solicitud-activa-page.component';
import { EditarSolicitudPageComponent } from './pages/editar-solicitud-page/editar-solicitud-page.component';
import { EliminarSolicitudPageComponent } from './pages/eliminar-solicitud-page/eliminar-solicitud-page.component';
import { NuevaSolicitudPageComponent } from './pages/nueva-solicitud-page/nueva-solicitud-page.component';
import { DetalleSolicitudEliminadaPageComponent } from './pages/detalle-solicitud-eliminada-page/detalle-solicitud-eliminada-page.component';
import { DetalleSolicitudFinalizadaPageComponent } from './pages/detalle-solicitud-finalizada-page/detalle-solicitud-finalizada-page.component';
import { SolicitudesActivasPageComponent } from './pages/solicitudes-activas-page/solicitudes-activas-page.component';
import { SolicitudesEliminadasPageComponent } from './pages/solicitudes-eliminadas-page/solicitudes-eliminadas-page.component';
import { SolicitudesFinalizadasPageComponent } from './pages/solicitudes-finalizadas-page/solicitudes-finalizadas-page.component';
import { Error404PageComponent } from './pages/error-404-page/error-404-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AuthGuard } from './guards/auth.guard.spec';

const routes: Routes = [
  {
    path: 'detalle-solicitud-activa/:id',
    component: DetalleSolicitudActivaPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'detalle-solicitud-eliminada/:id',
    component: DetalleSolicitudEliminadaPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'detalle-solicitud-finalizada/:id',
    component: DetalleSolicitudFinalizadaPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'editar-solicitud/:id',
    component: EditarSolicitudPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'eliminar-solicitud/:id',
    component: EliminarSolicitudPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'nueva-solicitud',
    component: NuevaSolicitudPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'solicitudes-activas',
    component: SolicitudesActivasPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'solicitudes-eliminadas',
    component: SolicitudesEliminadasPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'solicitudes-finalizadas',
    component: SolicitudesFinalizadasPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'error-404',
    component: Error404PageComponent,
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Default
  { path: '**', redirectTo: '/error-404', pathMatch: 'full' }, // 404
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
