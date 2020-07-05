import { Component, OnInit } from '@angular/core';
import { Sitio } from 'src/app/_models/sitio';
import { CvsService } from 'src/app/_services/cvs.service';

@Component({
  selector: 'app-cargar-cv',
  templateUrl: './cargar-cv.component.html',
  styleUrls: ['./cargar-cv.component.scss']
})
export class CargarCvComponent implements OnInit {

  constructor(private apiCVs: CvsService) { }

  sitios: Sitio[] = [];
  loading = false;
  ngOnInit(): void {
    this.getSitios();
  }

  getSitios(){
    this.loading = true;
    this.apiCVs.getCvs().subscribe(
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
