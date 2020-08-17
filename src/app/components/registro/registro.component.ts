import { Component, OnInit } from '@angular/core';

import { FormsModule, NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase/app';
import Swal from 'sweetalert2';
import * as moment from 'moment';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent implements OnInit {

  regalos: any[] = [{
    img: 'assets/img/billetera.png',
    nombre: 'billetera'
  },{
    img: 'assets/img/boligrafo.png',
    nombre: 'boligrafo'
  },{
    img: 'assets/img/friki.png',
    nombre: 'friki'
  },{
    img: 'assets/img/llavero.png',
    nombre: 'llavero'
  },{
    img: 'assets/img/mochila.png',
    nombre: 'mochila'
  }]

  constructor(private fire: AngularFirestore, private ngForm: FormsModule) {}

  ngOnInit(): void {}

  registrar(datos: NgForm) {
    if (datos.invalid) {
      return;
    }
    Swal.showLoading();

    if (datos.value.monto >= 450) {
      let data = Object.assign({}, datos.value);
      data.fecha = moment(firestore.Timestamp.now().toDate()).format(
        'DD-MM-YYYY'
      );
      data.hora = moment(firestore.Timestamp.now().toDate()).format('HH:mm');
      let regalo = this.regalos[Math.floor(Math.random() * this.regalos.length)];
      // console.log(regalo)
      data.regalo = regalo.nombre;

      console.log(data);

      this.fire
        .collection('registros')
        .add(data)
        .then((res) => {
          Swal.fire({
            imageUrl: regalo.img,
            imageWidth: 200,
            confirmButtonColor: '#ef4135',
            titleText: `¡FELICIDADES GANASTE! ${data.regalo.toUpperCase()}`,
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
}
