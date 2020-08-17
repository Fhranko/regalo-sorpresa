import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { environment } from 'src/environments/environment';
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


//rutas
import { APP_ROUTING } from "./app.routes";

import { AppComponent } from './app.component';
import { RegaloComponent } from './components/regalo/regalo.component';
import { RegistroComponent } from './components/registro/registro.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PanelComponent } from './components/panel/panel.component';
import { SliderComponent } from './components/slider/slider.component';
import { DatatableComponent } from './components/datatable/datatable.component';
import { DataTablesModule } from 'angular-datatables';
import { ServiceWorkerModule } from '@angular/service-worker';


@NgModule({
  declarations: [
    AppComponent,
    RegaloComponent,
    RegistroComponent,
    HomeComponent,
    LoginComponent,
    PanelComponent,
    SliderComponent,
    DatatableComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    NgbModule,
    DataTablesModule,
    HttpClientModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
