import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Rutas
import { APP_ROUTING } from './app.routes';

// Backend
import { HttpClientModule } from '@angular/common/http';

// Servicios
import { DbConnectionService } from './services/db-connection.service';
import { AcreedorService } from './acreedores/acreedor.service';
import { UsuarioService} from './usuario/usuario.service';
// Componentes
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { AcreedoresComponent } from './acreedores/acreedores.component';
import { TablaAcreedoresComponent } from './components/tabla-acreedores/tabla-acreedores.component';
import { AddAcreedorComponent } from './components/add-acreedor/add-acreedor.component';
import { AddOrdenComponent } from './components/add-orden/add-orden.component';
import { ProyectosComponent } from './components/proyectos/proyectos.component';
import { TablaOrdenesComponent } from './components/tabla-ordenes/tabla-ordenes.component';
import { InfoProyectoComponent } from './components/info-proyecto/info-proyecto.component';

// Login y registro
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FormRegistroUsuariosComponent } from './components/form-registro-usuarios/form-registro-usuarios.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    PerfilComponent,
    AcreedoresComponent,
    TablaAcreedoresComponent,
    AddAcreedorComponent,
    AddOrdenComponent,

    FormRegistroUsuariosComponent,
    LoginComponent,
    ProyectosComponent,
    TablaOrdenesComponent,
    InfoProyectoComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    FormsModule,
    ReactiveFormsModule,
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
