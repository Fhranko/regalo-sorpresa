import { Component, OnInit } from '@angular/core';

import { FormsModule, NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase/app';
import Swal from 'sweetalert2';
import * as moment from "moment";

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent implements OnInit {
  constructor(
    private fire: AngularFirestore,
    private ngForm: FormsModule,

  ) {}

  ngOnInit(): void {}

  registrar(datos: NgForm) {
    if (datos.invalid) {
      return;
    }

    // Swal.fire({
    //   type: 'info',
    //   text: 'Espere por favor',
    // });

    Swal.showLoading();

    if (datos.value.monto >= 450) {
      let data = Object.assign({}, datos.value);
      // data.fecha = firestore.Timestamp.now().toDate();
      // let fecha = moment(data.fecha).format('DD MM YYYY')
      // console.log(fecha);
      this.fire
        .collection('registros')
        .add(data)
        .then((res) => {
          let regalo = this.regalar();
          Swal.fire({
            imageUrl: 'assets/img/billetera.png',
            imageWidth: 200,
            confirmButtonColor: "#ef4135",
            titleText:`¡FELICIDADES GANASTE! ${regalo}`, 
            text: 'Apersonate a una de nuestras oficinas con tu factura',
            showCloseButton: true,
          });
        })
        .catch((err) => {
          console.log(`Algo pasó al registrar los datos ${err}`);
          Swal.fire({
            type: 'error',
            title: 'Error al registrar los datos',
            text: err,
            showCloseButton: true,
          });
        });
    } else {
      Swal.fire({
        type: 'warning',
        text: 'El monto debe ser mayor a 450 Bs.',
        showCloseButton: true,
      });
      return;
    }
  }

  regalar() {
    let regalos = ['LLAVERO', 'BOLIGRAFO', 'GAFAS', 'BILLERETA', 'MOCHILA'];

    let regalo = regalos[Math.floor(Math.random() * regalos.length)];
    return regalo;
  }
}
