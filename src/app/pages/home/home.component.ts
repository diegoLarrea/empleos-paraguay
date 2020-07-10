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
  ngOnInit(): void {
    this.getEmpleos();
  }

  getEmpleos(){
    this.loading = true;
    this.apiEmpleo.getEmpleos().subscribe(
      data => {
        for(let i=0; i<data.length;i++){
          let e:Empleo = <Empleo> data[i].payload.doc.data();
          e.id = data[i].payload.doc.id;
          this.empleos.push(e);
        }
        this.loading = false;
      }
    )
  }

  pageChange(e){
    let top = document.getElementById("empleos");
    this.p = e;
    top.scrollIntoView({behavior:'smooth'});
  }
}
