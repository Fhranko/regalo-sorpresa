import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userToken:string

  constructor() { }

  // leerToken(){
  //   if (localStorage.getItem('token')) {
  //     this.userToken = localStorage.getItem('token');
  //   }else{
  //     this.userToken = '';
  //   }
  //   return this.userToken;
  // }

  canActivate():boolean{
    this.userToken = localStorage.getItem('token');
    return this.userToken.length > 2;
  }
}
