import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Empleo } from '../_models/empleo';
import { DatePipe } from '@angular/common';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleosService {

  constructor(private firestore: AngularFirestore, private dp:DatePipe, private http: HttpClient) {}

  getEmpleos() {
    return this.firestore.collection(
      'empleos',
      ref => ref
        .orderBy('fecha', 'desc')
    ).snapshotChanges();
  }

  async getEmpleoById(id){
    return await this.firestore.collection('empleos').doc(id).ref.get();
  }

  postEmpleo(el: Empleo) {
    return this.firestore.collection('empleos').add({
      titulo: el.titulo,
      descripcion: el.descripcion,
      fecha: this.dp.transform(new Date(), 'dd/MM/yyyy'),
      area: el.area,
      ubicacion: el.ubicacion,
      imagen: el.imagen
    });
  }

  removeEmpleo(id) {
    return this.firestore.doc(`empleos/${id}`).delete();
  }

  updateEmpleo(el: Empleo){
    return this.firestore.doc('empleos/' + el.id).update({
      titulo: el.titulo,
      descripcion: el.descripcion,
      fecha: this.dp.transform(new Date(), 'dd/MM/yyyy'),
      area: el.area,
      ubicacion: el.ubicacion,
      imagen: el.imagen
    });
  }

  getAreas():Observable<any>{
    return this.http.get('assets/json/areas.json');
  }

  getCiudades():Observable<any>{
    return this.http.get('assets/json/ciudades.json');
  }
}
