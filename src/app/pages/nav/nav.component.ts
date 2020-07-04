import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.firstChild.data.subscribe(
      data => {
        this.current = data.index;
        this.handeActive(data.index);
      }
    )

  }

  current = null;
  paths = {
    "/home" : 0,
    "/sitios" : 1,
    "/cargar-cv" : 2,
  }

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(event => {
      this.items[this.current].active = false;
      this.current = this.paths[event["url"]];
      this.items[this.current].active = true;
    });
  }

  items = [
    {
      nombre: "Pág. Principal",
      path: "/home",
      active: false
    },
    {
      nombre: "Sitios de Empleos",
      path: "/sitios",
      active: false
    },
    {
      nombre: "¿Dónde cargar mi cv?",
      path: "/cargar-cv",
      active: false
    }
  ]


  handeActive(pos) {
    this.items[this.current].active = false;
    this.current = Number(pos);
    this.items[this.current].active = true;
  }
}
