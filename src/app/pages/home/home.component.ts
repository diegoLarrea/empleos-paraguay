import { Component, OnInit } from '@angular/core';
import { EmpleosService } from 'src/app/_services/empleos.service';
import { Empleo } from 'src/app/_models/empleo';
import { BlockUIService } from 'ng-block-ui';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private apiEmpleo: EmpleosService, private bui:BlockUIService) { }

  empleos: Empleo[] = [];
  loading = false;
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
}
