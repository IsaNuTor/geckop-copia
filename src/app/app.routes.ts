import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PerfilComponent } from './components/perfil/perfil.component';



const APP_ROUTES: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'perfil', component: PerfilComponent },
    { path: 'acreedores', component: AcreedoresComponent},
    /*{ path: '', component: Component },
    { path: '', component: Component },
    { path: '', component: Component },
    { path: '', component: Component },*/
    { path: '**', pathMatch: 'full', redirectTo: 'home' } // Por defecto redirecciona a esta ruta si llega
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, {useHash: true});
