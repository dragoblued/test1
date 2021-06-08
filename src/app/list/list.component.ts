import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from "@angular/fire/firestore";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  items$: Observable<any[]>;
  constructor(firestore: AngularFirestore) {
    this.items$ = firestore.collection('dataform').valueChanges();
  }
}
