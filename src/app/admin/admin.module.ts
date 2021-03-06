import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import {NgxPaginationModule} from 'ngx-pagination';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { NavComponent } from './nav/nav.component';
import { PublicacionesComponent } from './publicaciones/publicaciones.component';
import { SitiosComponent } from './sitios/sitios.component';
import { CargarCvComponent } from './cargar-cv/cargar-cv.component';
import { HttpClientModule } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [AdminComponent, NavComponent, PublicacionesComponent, SitiosComponent, CargarCvComponent],
  imports: [
    CommonModule,
    NgSelectModule,
    FormsModule,
    NgxPaginationModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AdminRoutingModule
  ],
  providers: [DatePipe]
})
export class AdminModule { }
