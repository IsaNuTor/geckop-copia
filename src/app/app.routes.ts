import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { AcreedoresComponent } from './components/acreedores/acreedores.component';
import { AddOrdenComponent } from './components/add-orden/add-orden.component';

import { FormRegistroUsuariosComponent } from './components/form-registro-usuarios/form-registro-usuarios.component';
import { LoginComponent } from './components/login/login.component';

const APP_ROUTES: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'acreedores', component: AcreedoresComponent},
    { path: 'orden', component: AddOrdenComponent },
    { path: 'registro', component: FormRegistroUsuariosComponent },
    { path: 'login', component: LoginComponent },
    { path: 'perfil', component: PerfilComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'home' } // Por defecto redirecciona a esta ruta si llega
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, {useHash: true});
