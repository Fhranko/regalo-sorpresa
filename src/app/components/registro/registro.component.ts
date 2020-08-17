import { Component, OnInit } from '@angular/core';

import {
  FormsModule,
  NgForm,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase/app';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent implements OnInit {
  regalos: any[] = [
    {
      img: 'assets/img/billetera.png',
      nombre: 'billetera',
    },
    {
      img: 'assets/img/boligrafo.png',
      nombre: 'boligrafo',
    },
    {
      img: 'assets/img/friki.png',
      nombre: 'gafas',
    },
    {
      img: 'assets/img/llavero.png',
      nombre: 'llavero',
    },
    {
      img: 'assets/img/mochila.png',
      nombre: 'mochila',
    },
  ];

  registroForm: FormGroup;

  constructor(
    private fire: AngularFirestore,
    private ngForm: FormsModule,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.registroForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      carnet: ['', Validators.required],
      telefono: ['', Validators.required],
      correo: ['', Validators.compose([Validators.email, Validators.required])],
      factura: ['', Validators.required],
      monto: [
        '',
        Validators.compose([Validators.min(450), Validators.required]),
      ],
      ciudad: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  guardarDatos(datos) {
    datos.fecha = moment(firestore.Timestamp.now().toDate()).format(
      'DD-MM-YYYY'
    );
    datos.hora = moment(firestore.Timestamp.now().toDate()).format('HH:mm');
    let regalo = this.regalos[Math.floor(Math.random() * this.regalos.length)];
    datos.regalo = regalo.nombre;

    console.log(datos);

    this.fire
      .collection('registros')
      .add(datos)
      .then((res) => {
        Swal.fire({
          imageUrl: regalo.img,
          imageWidth: 200,
          confirmButtonColor: '#ef4135',
          titleText: `¡FELICIDADES GANASTE! ${datos.regalo.toUpperCase()}`,
          text: 'Apersonate a una de nuestras oficinas con tu factura',
          showCloseButton: true,
        });
        this.router.navigateByUrl('/');
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
  }
}
