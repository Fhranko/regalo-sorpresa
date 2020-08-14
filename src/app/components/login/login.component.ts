import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  
  constructor(
    private angularFireAuth: AngularFireAuth,
    private router: Router,
  ) {}

  ngOnInit(): void {}

  autenticar(datos: NgForm) {
    if (datos.invalid) {
      return;
    }

    console.log(datos.value);
    this.angularFireAuth
      .signInWithEmailAndPassword(datos.value.email, datos.value.pass)
      .then((res) => {
        this.router.navigateByUrl('/panel');
        res.user
          .getIdToken()
          .then((ress) => {
            localStorage.setItem("token", ress);
            
          })
          .catch((errr) => {
            console.log(errr);
          });
      })
      .catch((err) => {
        Swal.fire({
          type: 'error',
          title: 'Usuario o contraseña incorrectos',
          showCloseButton: true,
        });
      });
  }
}
