import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CvsService {

  constructor(private firestore: AngularFirestore) { }

  getCvs() {
    return this.firestore.collection('cvs').snapshotChanges();
  }
}

