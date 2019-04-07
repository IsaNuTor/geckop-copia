import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Servicios
import { DbConnectionService } from './services/db-connection.service';
import { AcreedorService } from './components/acreedores/acreedor.service';
import { UsuarioService} from './components/usuario/usuario.service';
import { SesionService} from './services/sesion/sesion.service';

// COMPONENTES
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
// Menú
import { NavbarComponent } from './components/navbar/navbar.component';
import { PerfilComponent } from './components/perfil/perfil.component';
// Acreedores
import { AcreedoresComponent } from './components/acreedores/acreedores.component';
import { FormAcreedoresComponent } from './components/acreedores/form-acreedores.component';

import { ProyectosComponent } from './components/proyectos/proyectos.component';
import { TablaOrdenesComponent } from './components/tabla-ordenes/tabla-ordenes.component';
import { InfoProyectoComponent } from './components/info-proyecto/info-proyecto.component';

// órdenes
import { OrdenesComponent } from './components/ordenes/ordenes.component';
import { AddOrdenComponent } from './components/ordenes/add-orden/add-orden.component';

// Login y registro
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FormRegistroUsuariosComponent } from './components/form-registro-usuarios/form-registro-usuarios.component';
import { LoginComponent } from './components/login/login.component';

// Rutas
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'', redirectTo:'login',pathMatch: 'full'},
  {path:'acreedores', component: AcreedoresComponent},
  {path: 'acreedores/form-acreedores.component', component: FormAcreedoresComponent},
  {path: 'ordenes/add-orden/add-orden.component', component: AddOrdenComponent},
  {path:'perfil', component: PerfilComponent},
  {path:'ordenes', component: OrdenesComponent},
  {path:'proyectos', component: ProyectosComponent},
  {path:'login', component: LoginComponent},
  {path:'registro', component: FormRegistroUsuariosComponent},
  {path: "acreedores/form-acreedores.component/:nif", component: FormAcreedoresComponent}
];

// Backend
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './components/footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    PerfilComponent,
    AcreedoresComponent,
    FormAcreedoresComponent,
    AddOrdenComponent,
    FormRegistroUsuariosComponent,
    LoginComponent,
    ProyectosComponent,
    TablaOrdenesComponent,
    InfoProyectoComponent,
    FooterComponent,
    OrdenesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  providers: [
    DbConnectionService,
    UsuarioService,
    AcreedorService,
    SesionService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
