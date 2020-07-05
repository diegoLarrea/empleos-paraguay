import { Component, OnInit } from '@angular/core';
import { Sitio } from 'src/app/_models/sitio';
import { SitiosService } from 'src/app/_services/sitios.service';

@Component({
  selector: 'app-sitios',
  templateUrl: './sitios.component.html',
  styleUrls: ['./sitios.component.scss']
})
export class SitiosComponent implements OnInit {

  constructor(private apiSitio: SitiosService) { }

  sitios: Sitio[] = [];
  loading = false;
  ngOnInit(): void {
    this.getSitios();
  }

  getSitios(){
    this.loading = true;
    this.apiSitio.getSitios().subscribe(
      data => {
        for(let i=0; i<data.length;i++){
          let e:Sitio = <Sitio> data[i].payload.doc.data();
          e.id = data[i].payload.doc.id;
          this.sitios.push(e);
        }
        this.loading = false;
      }
    )
  }
}
