import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { AcreedoresComponent } from './components/acreedores/acreedores.component';
import {AuthGuardService} from "./services/auth-guard.service";
import { AddOrdenComponent } from './components/add-orden/add-orden.component';

const APP_ROUTES: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'perfil', component: PerfilComponent, canActivate: [AuthGuardService]},
    { path: 'acreedores', component: AcreedoresComponent},
    { path: 'orden', component: AddOrdenComponent },
    /*{ path: '', component: Component },
    { path: '', component: Component },
    { path: '', component: Component },*/
    { path: '**', pathMatch: 'full', redirectTo: 'home' } // Por defecto redirecciona a esta ruta si llega
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, {useHash: true});
