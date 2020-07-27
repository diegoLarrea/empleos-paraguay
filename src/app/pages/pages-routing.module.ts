import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { PublicacionesComponent } from './publicaciones/publicaciones.component';
import { ArticulosComponent } from './articulos/articulos.component';


const routes: Routes = [
  {
    path: "",
    component: PagesComponent
  },
  {
    path: "publicaciones",
    component: PublicacionesComponent
  },
  {
    path: "articulos",
    component: ArticulosComponent
  }
]; 

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
