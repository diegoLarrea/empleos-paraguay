import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class EmpleosService {

  constructor(private firestore: AngularFirestore) {}

  getEmpleos() {
    return this.firestore.collection('empleos').snapshotChanges();
  }
}
