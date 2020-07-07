import { Component, OnInit } from '@angular/core';
import { SitiosService } from 'src/app/_services/sitios.service';
import { Sitio } from 'src/app/_models/sitio';
declare var $:any;
@Component({
  selector: 'app-sitios',
  templateUrl: './sitios.component.html',
  styleUrls: ['./sitios.component.scss']
})
export class SitiosComponent implements OnInit {

  constructor(private apiSitio: SitiosService) { }

  sitios: Sitio[] = [];
  loading = false;

  sitioAdd: Sitio = new Sitio();
  sitioEdit: Sitio = new Sitio();

  ngOnInit(): void {
    this.getSitios();
  }

  getSitios(){
    this.loading = true;
    this.apiSitio.getSitios().subscribe(
      data => {
        this.sitios = [];
        for(let i=0; i<data.length;i++){
          let e:Sitio = <Sitio> data[i].payload.doc.data();
          e.id = data[i].payload.doc.id;
          this.sitios.push(e);
        }
        this.loading = false;
      }
    )
  }

  postSitio(){
    if(this.sitioAdd.nombre != null && this.sitioAdd.url != null){
      this.apiSitio.postSitios(this.sitioAdd)
      .then(
        res =>{
          this.sitioAdd = new Sitio();
          setTimeout(()=>{
            $("#agregarSitioModal").modal("hide");
          },0)
        },
        err =>{
          console.log(err);
        }
      )
    }
  }

  putSitio(){
    if(this.sitioEdit.nombre != null && this.sitioEdit.url != null){
      this.apiSitio.updateSitios(this.sitioEdit)
      .then(
        res =>{
          this.sitioEdit = new Sitio();
          setTimeout(()=>{
            $("#editarSitioModal").modal("hide");
          },0)
        },
        err =>{
          console.log(err);
        }
      )
    }
  }

  removeCV(id){
    this.apiSitio.removeSitios(id).then(
      res => {},
      err => {
        console.log(err);
      }
    )
  }

}
