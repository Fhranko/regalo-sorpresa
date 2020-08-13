import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class PanelGuard implements CanActivate {
  userToken: string;

  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean {

    if (localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }

    if (this.userToken.length > 2) {
      return true;
    } else {
      this.router.navigateByUrl('/admin');
    }

  }
}
