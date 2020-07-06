import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class SitiosService {

  constructor(private firestore: AngularFirestore) { }

  getSitios() {
    return this.firestore.collection(
      'sitios',
      ref => ref
        .orderBy('nombre', 'asc')
    ).snapshotChanges();
  }
}
