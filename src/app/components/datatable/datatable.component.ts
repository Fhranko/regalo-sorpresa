import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.css'],
})
export class DatatableComponent implements OnDestroy, OnInit {
  dtOptions: any = {};
  // dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  valores:[];

  constructor(
    private http: HttpClient,
    private angularFireStore: AngularFirestore
  ) {}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      language: {
        url: '//cdn.datatables.net/plug-ins/1.10.21/i18n/Spanish.json',
      },
      dom: 'Bfrtip',
      buttons: [
        'print',
        'excel',
      ]
    };

    this.angularFireStore
      .collection('registros')
      .valueChanges()
      .subscribe((res:any) => {
        this.valores = res;
        this.dtTrigger.next();
      });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
