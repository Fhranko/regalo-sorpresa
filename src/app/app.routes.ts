import { RouterModule, Routes } from '@angular/router';
import { RegistroComponent } from './components/registro/registro.component';
import { RegaloComponent } from './components/regalo/regalo.component';




const APP_MODULES: Routes=[
    { path: 'registro', component: RegistroComponent},
    { path: '**', component: RegaloComponent }
];

export const APP_ROUTING = RouterModule.forRoot(APP_MODULES)




