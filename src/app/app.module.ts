import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Servicios
import { DbConnectionService } from './services/db-connection.service';
import { AcreedorService } from './components/acreedores/acreedor.service';
import { UsuarioService} from './components/usuario/usuario.service';

// Componentes
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { AcreedoresComponent } from './components/acreedores/acreedores.component';
import { AddOrdenComponent } from './components/add-orden/add-orden.component';
import { ProyectosComponent } from './components/proyectos/proyectos.component';
import { TablaOrdenesComponent } from './components/tabla-ordenes/tabla-ordenes.component';
import { InfoProyectoComponent } from './components/info-proyecto/info-proyecto.component';
import { FormAcreedoresComponent } from './components/acreedores/form-acreedores.component';

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
  {path:'perfil', component: PerfilComponent},
  {path:'orden', component: AddOrdenComponent},
  {path:'proyectos', component: ProyectosComponent},
  {path:'login', component: LoginComponent},
  {path:'registro', component: FormRegistroUsuariosComponent}
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
    FooterComponent
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
    AcreedorService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
