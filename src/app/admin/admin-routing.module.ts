import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { PublicacionesComponent } from './publicaciones/publicaciones.component';
import { SitiosComponent } from './sitios/sitios.component';
import { CargarCvComponent } from './cargar-cv/cargar-cv.component';
import { AngularFireAuthGuard, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  {
    path: "admin",
    component: AdminComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe : redirectUnauthorizedToLogin },
    children: [
      {
        path: "",
        redirectTo: "publicaciones",
        pathMatch: "full"
      },
      {
        path: "publicaciones",
        component: PublicacionesComponent
      },
      {
        path: "sitios",
        component: SitiosComponent
      },
      {
        path: "cargar-cv",
        component: CargarCvComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
