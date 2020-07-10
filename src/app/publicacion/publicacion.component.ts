import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmpleosService } from '../_services/empleos.service';
import { Empleo } from '../_models/empleo';

@Component({
  selector: 'app-publicacion',
  templateUrl: './publicacion.component.html',
  styleUrls: ['./publicacion.component.scss']
})
export class PublicacionComponent implements OnInit {

  idPublicacion = null;
  loading = true;
  constructor(private route: ActivatedRoute, private apiPublicacion: EmpleosService) {
    this.route.params.subscribe(params => {
      this.idPublicacion = params['id'];
    });
  }

  publicacion: Empleo = new Empleo();
  async ngOnInit() {
    await this.apiPublicacion.getEmpleoById(this.idPublicacion)
    .then(
      (doc)=> {
        if(doc.exists){
          this.publicacion = <Empleo> doc.data();
        }
        this.loading = false;
      }
    );
  }

}
