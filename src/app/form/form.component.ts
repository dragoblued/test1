import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFirestoreCollection } from "@angular/fire/firestore/collection/collection";
import { Date } from '../Date';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  form!: FormGroup;
  data: AngularFirestoreCollection<Date>;
  loader: boolean = false;

  constructor(firestore: AngularFirestore) {
    this.data = firestore.collection("dataform");
  }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [
        Validators.email, Validators.required
      ]),
      phone: new FormControl('', [Validators.required])
    });

  }

  submit() {
    const formData = {...this.form.value};
    this.data.add(formData);
    this.loader = true;
    setTimeout(() => {
      this.form.reset();
      this.loader = !this.loader;
    }, 3000);
  }
}
