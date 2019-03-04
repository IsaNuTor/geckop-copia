import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Rutas
import { APP_ROUTING } from './app.routes';


// Servicios
import {AuthService} from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';

// Componentes
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { AcreedoresComponent } from './components/acreedores/acreedores.component';
import { TablaAcreedoresComponent } from './components/tabla-acreedores/tabla-acreedores.component';
import { AddAcreedorComponent } from './components/add-acreedor/add-acreedor.component';
import { AddOrdenComponent } from './components/add-orden/add-orden.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    PerfilComponent,
    AcreedoresComponent,
    TablaAcreedoresComponent,
    AddAcreedorComponent,
    AddOrdenComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTING
  ],
  providers: [
    AuthService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
