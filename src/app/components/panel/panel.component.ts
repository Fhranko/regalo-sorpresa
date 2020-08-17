import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css'],
})
export class PanelComponent implements OnInit {
  registros = [];
  constructor(private angularFireStore: AngularFirestore) {}

  ngOnInit(): void {
    let valores = this.angularFireStore
      .collection('registros')
      .valueChanges()
      .subscribe((res) => {
        // console.log(res)
        this.registros = res;
        // console.log(this.registros);
      });
  }
}
