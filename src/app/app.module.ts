import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Rutas
import { APP_ROUTING } from './app.routes';


// Servicios
import { DbConnectionService } from './services/db-connection.service';

// Componentes
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { AcreedoresComponent } from './components/acreedores/acreedores.component';
import { TablaAcreedoresComponent } from './components/tabla-acreedores/tabla-acreedores.component';
import { AddAcreedorComponent } from './components/add-acreedor/add-acreedor.component';
import { AddOrdenComponent } from './components/add-orden/add-orden.component';

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
    LoginComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    DbConnectionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
