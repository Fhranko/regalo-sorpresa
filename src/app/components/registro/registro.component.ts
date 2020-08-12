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
    console.table(datos.value.monto);
    
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
            console.log('datos registrados correctamente');
            Swal.fire({
              type: 'success',
              text: 'Datos registrados correctamente',
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
}
