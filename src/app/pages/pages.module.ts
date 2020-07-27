import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { PublicacionesComponent } from './publicaciones/publicaciones.component';
import { ArticulosComponent } from './articulos/articulos.component';


@NgModule({
  declarations: [PagesComponent, PublicacionesComponent, ArticulosComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
