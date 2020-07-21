import { Component, OnInit } from '@angular/core';
import { Empleo } from 'src/app/_models/empleo';
import { EmpleosService } from 'src/app/_services/empleos.service';
declare var $:any;
@Component({
  selector: 'app-publicaciones',
  templateUrl: './publicaciones.component.html',
  styleUrls: ['./publicaciones.component.scss']
})
export class PublicacionesComponent implements OnInit {

  constructor(private apiPublicacion: EmpleosService) { }

  publicaciones: Empleo[] = [];
  empleo:Empleo = new Empleo();
  loading = false;
  p: number = 1;
  
  isPost = true;
  ngOnInit(): void {
    this.getEmpleos();
    this.getAreas();
    this.getCiudades();
    $('#summernote').summernote({
      tabsize: 2,
      height: 120,
      toolbar: [
        ['font', ['bold', 'underline']],
        ['insert', ['link']],
        ['para', ['ul', 'ol']],
      ]
    });
  }

  getEmpleos(){
    this.loading = true;
    this.apiPublicacion.getEmpleos().subscribe(
      data => {
        this.publicaciones = [];
        for(let i=0; i<data.length;i++){
          let e:Empleo = <Empleo> data[i].payload.doc.data();
          e.id = data[i].payload.doc.id;
          this.publicaciones.push(e);
        }
        this.loading = false;
      }
    )
  }


  edit(target:Empleo){
    this.isPost = false;
    this.empleo = Object.assign({}, target);
    setTimeout(()=>{
      $('#summernote').summernote('code', this.empleo.descripcion);
    },0);
  }

  loadingPublicacion = false;
  showError = false;
  guardarPublicacion(){
    this.empleo.descripcion = $('#summernote').summernote('code');
    if(this.empleo.titulo != null &&
      this.empleo.descripcion != null){
        this.loadingPublicacion = true;
        if(this.isPost){
          this.apiPublicacion.postEmpleo(this.empleo)
          .then(
            res => {
              this.empleo = new Empleo();
              setTimeout(()=>{
                $("#imagen-chooser").val(null);
                $('#summernote').summernote('reset');
              },0)
              this.loadingPublicacion = false;
            }
          )
        }else{
          this.apiPublicacion.updateEmpleo(this.empleo)
          .then(
            res => {
              this.empleo = new Empleo();
              this.isPost = true;
              setTimeout(()=>{
                $("#imagen-chooser").val(null);
                $('#summernote').summernote('reset');
              },0)
              this.loadingPublicacion = false;
            }
          )
        }
        
    }else{
      this.error();
    }
  }

  error(){
    this.showError = true;
    setTimeout(()=>{
      this.showError = false;
    }, 2000);
  }
  async imageHandler(files: FileList) {
    if (files != null && this.isFileImage(files.item(0)) ) {
      let file = files.item(0);
      let file64 = await this.toBase64(file);
      this.empleo.imagen = file64.toString();
    }
  }

  isFileImage(file) {
    const acceptedImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
    return file && acceptedImageTypes.includes(file['type']);
  }

  toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

  scroll(el: HTMLElement) {
    el.scrollIntoView({behavior: 'smooth'});
  }

  removerImagen(){
    this.empleo.imagen = null;
    setTimeout(()=>{
      $("#imagen-chooser").val(null);
    },0);
  }

  limpiarCampos(){
    this.empleo = new Empleo();
    this.isPost = true;
    setTimeout(()=>{
      $("#imagen-chooser").val(null);
      $('#summernote').summernote('reset');
    },0);
  }

  scrollTop(){
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  targetEliminar: Empleo = new Empleo();
  eliminarModal(target:Empleo){
    this.targetEliminar = target;
  }

  loadingEliminar = false;
  deletePublicacion(){
    this.loadingEliminar = true;
    this.apiPublicacion.removeEmpleo(this.targetEliminar.id).then(
      res => {
        this.loadingEliminar = false;
        setTimeout(()=>{
          $("#eliminarModal").modal("hide");
        },0);
      },
      err => {
        console.log(err);
        this.loadingEliminar = false;
      }
    )
  }

  areas = [];
  getAreas(){
    this.apiPublicacion.getAreas().subscribe(
      data => {
        this.areas = data;
      }
    )
  }

  ciudades = [];
  getCiudades(){
    this.apiPublicacion.getCiudades().subscribe(
      data => {
        this.ciudades = data;
      }
    )
  }
}
