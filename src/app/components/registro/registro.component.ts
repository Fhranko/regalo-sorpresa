import { Component, OnInit } from '@angular/core';

import { FormsModule, NgForm } from '@angular/forms';
import {
  AngularFirestore,
} from '@angular/fire/firestore';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent implements OnInit {
  constructor(private fire: AngularFirestore, private ngForm: FormsModule) {}

  ngOnInit(): void {}

  registrar(datos: NgForm) {
    console.table(datos.value);

    let data = Object.assign({}, datos.value)
    this.fire.collection('registros').add(data).then(res=>{
      console.log("datos registrados correctamente")
    }).catch( err=>{
      console.log(`Algo pasó al registrar los datos ${err}`)
    });
  }
}
