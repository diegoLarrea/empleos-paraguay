import { Component, OnInit } from '@angular/core';
declare var $:any;
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {}

  activeItem = 0;
  items = [
    {
      nombre: "Publicaciones",
      path: "/admin/publicaciones",
      icon: "fas fa-copy",
      active: true
    },
    {
      nombre: "Sitios",
      path: "/admin/sitios",
      icon: "fas fa-globe",
      active: false
    },
    {
      nombre: "Cargar CVs",
      path: "/admin/cargar-cv",
      icon: "fas fa-edit",
      active: false
    }
  ]

  setActive(pos){
    if(this.activeItem != pos){
      this.items[pos].active = true;
      this.items[this.activeItem].active = false;
      this.activeItem = pos;
    }
  }
}
