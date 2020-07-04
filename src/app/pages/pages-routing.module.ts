import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { SitiosComponent } from './sitios/sitios.component';
import { CargarCvComponent } from './cargar-cv/cargar-cv.component';


const routes: Routes = [
  {
    path: "",
    component: PagesComponent,
    children: [
      {
        path: "",
        redirectTo: "home",
        pathMatch: "full"
      },
      {
        path: "home",
        component: HomeComponent,
        data: {
          index: 0
        }
      },
      {
        path: "sitios",
        component: SitiosComponent,
        data: {
          index: 1
        }
      },
      {
        path: "cargar-cv",
        component: CargarCvComponent,
        data: {
          index: 2
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
