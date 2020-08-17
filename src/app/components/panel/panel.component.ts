import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css'],
})
export class PanelComponent implements OnInit {
  registros = [];
  constructor(private angularFireStore: AngularFirestore, private router: Router) {}

  ngOnInit(): void {
  
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }
}
