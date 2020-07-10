import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { SitiosComponent } from './sitios/sitios.component';
import { CargarCvComponent } from './cargar-cv/cargar-cv.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../../environments/environment';


@NgModule({
  declarations: [
    PagesComponent,
    HomeComponent,
    NavComponent,
    SitiosComponent,
    CargarCvComponent
  ],
  imports: [
    CommonModule,
    NgxPaginationModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
