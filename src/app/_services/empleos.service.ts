import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Empleo } from '../_models/empleo';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class EmpleosService {

  constructor(private firestore: AngularFirestore, private dp:DatePipe) {}

  getEmpleos() {
    return this.firestore.collection(
      'empleos',
      ref => ref
        .orderBy('fecha', 'desc')
    ).snapshotChanges();
  }

  getEmpleoById(id){
    return this.firestore.doc(`empleos/${id}`).get();
  }

  postEmpleo(el: Empleo) {
    return this.firestore.collection('empleos').add({
      titulo: el.titulo,
      descripcion: el.descripcion,
      fecha: this.dp.transform(new Date(), 'dd/MM/yyyy'),
      contacto: el.contacto,
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
      contacto: el.contacto,
      ubicacion: el.ubicacion,
      imagen: el.imagen
    });
  }
}
