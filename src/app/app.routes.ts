import { RouterModule, Routes } from '@angular/router';
import { RegistroComponent } from './components/registro/registro.component';
import { RegaloComponent } from './components/regalo/regalo.component';
import { LoginComponent } from './components/login/login.component';
import { PanelComponent } from './components/panel/panel.component';
import { PanelGuard } from './guards/panel.guard';


const APP_MODULES: Routes=[
    { path: 'registro', component: RegistroComponent},
    { path: 'admin', component: LoginComponent },
    { path: 'panel', component: PanelComponent, canActivate: [PanelGuard] },
    { path: '**', component: RegaloComponent }
];

export const APP_ROUTING = RouterModule.forRoot(APP_MODULES)




