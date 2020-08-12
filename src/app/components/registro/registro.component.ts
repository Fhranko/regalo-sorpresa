import { Component, OnInit } from '@angular/core';

import { FormsModule, NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent implements OnInit {
  constructor(private fire: AngularFirestore, private ngForm: FormsModule) {}

  ngOnInit(): void {}

  registrar(datos: NgForm) {
    
    if (datos.invalid) {
      return;
    }

    Swal.fire({
      type: 'info',
      text: 'Espere por favor',
    });
    
    Swal.showLoading();
    
      if (datos.value.monto >= 450) {
        let data = Object.assign({}, datos.value);
        this.fire
          .collection('registros')
          .add(data)
          .then((res) => {
            Swal.fire({
              type: 'success',
              text: 'Datos registrados correctamente',
              showCloseButton: true,
            });
            let regalo = this.regalar();
            Swal.fire({
              type: 'success',
              text: `FELICIDADES GANASTE ${regalo}`,
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
      }else {
        Swal.fire({
          type: 'warning',
          text: 'El monto debe ser mayor a 450 Bs.',
          showCloseButton: true,
        });
        return;
      }
  }

  regalar(){
    let regalos = [
      'LLAVERO',
      'BOLIGRAFO',
      'GAFAS',
      'BILLERETA',
      'MOCHILA'
    ]

    let regalo = regalos[Math.floor(Math.random() * regalos.length)];
    return regalo;
  }
}
