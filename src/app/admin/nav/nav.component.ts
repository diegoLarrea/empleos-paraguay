import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  current = null;
  constructor(private route: ActivatedRoute, private router: Router, private auth: AuthService) {
    this.current = this.route.snapshot.firstChild.data['index']; 
    this.navs[this.current].active = true;
  }

  ngOnInit(): void {
  }

  navs = [
    {
      active: false,
      nombre: "Publicaciones",
      path: "/admin/publicaciones"
    },
    {
      active: false,
      nombre: "Sitios",
      path: "/admin/sitios"
    },
    {
      active: false,
      nombre: "Cargar CV",
      path: "/admin/cargar-cv"
    }
  ]

  change(pos){
    if(this.current != pos){
      this.navs[this.current].active = false;
      this.current = pos;
      this.navs[this.current].active = true;
    }
  }

  async logOut(){
    await this.auth.logout();
    this.router.navigate(['/']);
  }
}
