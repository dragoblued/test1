import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  form!: FormGroup;
  tutorial: any;
  loader: boolean = false;

  constructor(firestore: AngularFirestore) {
    this.tutorial = firestore.collection("dataform");
  }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [
        Validators.email, Validators.required
      ]),
      phone: new FormControl('', [Validators.required, Validators.maxLength(11)])
    });

  }

  submit() {
    this.tutorial.add({...this.form.value});
    this.loader = true;
    setTimeout(() => {
      this.form.reset();
      this.loader = !this.loader;
    }, 3000);
  }
}
