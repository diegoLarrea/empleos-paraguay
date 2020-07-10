import { Component, OnInit } from '@angular/core';
import { EmpleosService } from 'src/app/_services/empleos.service';
import { Empleo } from 'src/app/_models/empleo';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private apiEmpleo: EmpleosService, private router: Router) { }

  empleos: Empleo[] = [];
  loading = false;
  p: number = 1;
  itemspp = 5;
  filters = {
    area: [],
    ubicacion: []
  }
  ngOnInit(): void {
    this.getEmpleos();
    this.getAreas();
    this.getCiudades();
  }

  getEmpleos() {
    this.loading = true;
    this.apiEmpleo.getEmpleos().subscribe(
      data => {
        this.empleos = [];
        for (let i = 0; i < data.length; i++) {
          let e: Empleo = <Empleo>data[i].payload.doc.data();
          e.id = data[i].payload.doc.id;
          this.empleos.push(e);
        }
        this.loading = false;
      }
    )
  }

  pageChange(e) {
    let top = document.getElementById("empleos");
    this.p = e;
    top.scrollIntoView({ behavior: 'smooth' });
  }

  areas = [];
  getAreas() {
    this.apiEmpleo.getAreas().subscribe(
      data => {
        this.areas = data;
      }
    )
  }

  ciudades = [];
  getCiudades() {
    this.apiEmpleo.getCiudades().subscribe(
      data => {
        this.ciudades = data;
      }
    )
  }

  loadingFilter = false;

  filter(items: Empleo[]) {
    this.loadingFilter = true;
    let searchText: string = "";
    for(let i=0;i<this.filters.area.length;i++){
      searchText += this.filters.area[i];
    }
    for(let i=0;i<this.filters.ubicacion.length;i++){
      searchText += this.filters.ubicacion[i];
    }
    if(searchText != ""){
      if (!items) return [];

      if (searchText == null) return items;
  
      let ret: Empleo[] = [];
      for (let i = 0; i < items.length; i++) {
        let it = items[i];
        let contains = false;
        for (let j = 0; j < it.area.length; j++) {
          let area = it.area[j];
          if (searchText.includes(area)) {
            contains = true;
            break;
          }
        }
        if (contains) {
          ret.push(it);
        } else {
          for (let j = 0; j < it.ubicacion.length; j++) {
            let ubicacion = it.ubicacion[j];
            if (searchText.includes(ubicacion)) {
              contains = true;
              break;
            }
          }
          if (contains) { ret.push(it); }
        }
      }
      return ret;
    }
    this.loadingFilter = false;
  }

  limpiarFiltros(){
    this.filters.area = [];
    this.filters.ubicacion= [];
    this.getEmpleos();
  }
}
