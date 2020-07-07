import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Sitio } from '../_models/sitio';

@Injectable({
  providedIn: 'root'
})
export class SitiosService {

  constructor(private firestore: AngularFirestore) { }

  getSitios() {
    return this.firestore.collection
    (
      'sitios',
      ref => ref
        .orderBy('nombre', 'asc')
    ).snapshotChanges();
  }

  postSitios(el: Sitio) {
    return this.firestore.collection('sitios').add({nombre:el.nombre, url:el.url});
  }

  removeSitios(id) {
    return this.firestore.doc(`sitios/${id}`).delete();
  }

  updateSitios(el: Sitio){
    return this.firestore.doc('sitios/' + el.id).update(el);
  }
}
