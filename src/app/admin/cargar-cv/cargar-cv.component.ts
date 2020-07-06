import { Component, OnInit } from '@angular/core';
import { Sitio } from 'src/app/_models/sitio';
import { CvsService } from 'src/app/_services/cvs.service';
import { ToastrService } from 'ngx-toastr';
declare var $:any;
@Component({
  selector: 'app-cargar-cv',
  templateUrl: './cargar-cv.component.html',
  styleUrls: ['./cargar-cv.component.scss']
})
export class CargarCvComponent implements OnInit {

  constructor(private apiCVs: CvsService, private toastr: ToastrService) { }

  sitios: Sitio[] = [];
  loading = false;

  sitioAdd: Sitio = new Sitio();
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

  postSitio(){
    if(this.sitioAdd.nombre != null && this.sitioAdd.url != null){
      this.apiCVs.postCvs(this.sitioAdd)
      .then(
        res =>{
          console.log(res);
          this.toastr.success("Sitio agregado");
          setTimeout(()=>{
            $("#agregarSitioModal").modal("hide");
          },0)
        },
        err =>{
          console.log(err);
          this.toastr.error("Error al guardar sitio");
        }
      )
    }else{
      this.toastr.error("Complete los campos");
    }
  }
}
