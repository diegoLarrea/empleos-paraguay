import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Sitio } from '../_models/sitio';

@Injectable({
  providedIn: 'root'
})
export class CvsService {

  constructor(private firestore: AngularFirestore) { }

  getCvs() {
    return this.firestore.collection
    (
      'cvs',
      ref => ref
        .orderBy('nombre', 'asc')
    ).snapshotChanges();
  }

  postCvs(el: Sitio) {
    return this.firestore.collection('cvs').add({nombre:el.nombre, url:el.url});
  }

  removeCV(id) {
    return this.firestore.doc(`cvs/${id}`).delete();
  }

  updateCV(el: Sitio){
    return this.firestore.doc('cvs/' + el.id).update(el);
  }
}

