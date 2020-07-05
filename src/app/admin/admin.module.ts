import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { NavComponent } from './nav/nav.component';
import { PublicacionesComponent } from './publicaciones/publicaciones.component';
import { SitiosComponent } from './sitios/sitios.component';
import { CargarCvComponent } from './cargar-cv/cargar-cv.component';


@NgModule({
  declarations: [AdminComponent, NavComponent, PublicacionesComponent, SitiosComponent, CargarCvComponent],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
