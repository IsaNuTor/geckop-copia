import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Servicios
import { DbConnectionService } from './services/db-connection.service';
import { AcreedorService } from './services/acreedor/acreedor.service';
import { UsuarioService} from './services/usuario/usuario.service';
import { SesionService} from './services/sesion/sesion.service';
import { ProyectoService} from './services/proyecto/proyecto.service';
import { UsuarioProyectoService} from './services/usuario-proyecto/usuario-proyecto.service';
import { OrdenService} from './services/orden/orden.service';
import { GastoService} from './services/gasto/gasto.service';
import { GastoViajeService} from './services/gasto-viaje/gasto-viaje.service';

// COMPONENTES
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
// Menú
import { NavbarComponent } from './components/navbar/navbar.component';
import { MenuVerticalComponent } from './components/menu-vertical/menu-vertical.component';
import { PerfilComponent } from './components/perfil/perfil.component';
// Acreedores
import { AcreedoresComponent } from './components/vistaAcreedores/acreedores.component';
import { FormAcreedoresComponent } from './components/vistaAcreedores/formAcreedores/form-acreedores.component';

//Proyectos
import { ProyectosComponent } from './components/vistaProyectos/proyectos.component';
import { FormProyectosComponent } from './components/vistaProyectos/formProyectos/form-proyectos.component';
import { VerProyectoComponent } from './components/vistaProyectos/verProyecto/ver-proyecto.component';

// órdenes
import { AddOrdenComponent } from './components/vista-ordenes/add-orden/add-orden.component';
import { VistaOrdenesComponent } from './components/vista-ordenes/vista-ordenes.component';
//import { GastosComponent } from './components/vista-ordenes/add-orden/gastos/gastos.component';
import { VistaOrdenBotonComponent } from './components/vista-ordenes/vista-orden-boton/vista-orden-boton.component';
import { VerOrdenComponent } from './components/vista-ordenes/ver-orden/ver-orden.component';

// Gasto
import { ModalImagenComponent } from './components/vista-ordenes/add-orden/gastos/modal-imagen/modal-imagen.component';
// Gasto Viajes
import { AddOrdenViajesComponent } from './components/vista-ordenes/add-orden-viajes/add-orden-viajes.component';

// Login y registro
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FormRegistroUsuariosComponent } from './components/form-registro-usuarios/form-registro-usuarios.component';
import { LoginComponent } from './components/login/login.component';

// Rutas
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'', redirectTo:'login',pathMatch: 'full'},
  {path:'home', component: HomeComponent},
  {path:'acreedores', component: AcreedoresComponent},
  {path: 'acreedores/form-acreedores.component', component: FormAcreedoresComponent},
  {path: 'vista-ordenes/add-orden/add-orden.component', component: AddOrdenComponent},
  {path:'perfil', component: PerfilComponent},
  {path:'vista-ordenes', component: VistaOrdenesComponent},
  {path:'proyectos', component: ProyectosComponent},
  {path: 'proyectos/form-proyectos.component', component: FormProyectosComponent},
  {path:'login', component: LoginComponent},
  {path:'registro', component: FormRegistroUsuariosComponent},
  {path: "acreedores/form-acreedores.component/:nif", component: FormAcreedoresComponent},
  {path: "vistaProyectos/verProyecto/:acronimo", component:VerProyectoComponent},
  {path: "vista-ordenes/vista-orden-boton", component:VistaOrdenBotonComponent},
  {path: "vistaOrdenes/verOrden/:id", component:VerOrdenComponent},
  {path: 'vista-ordenes/add-orden/add-orden-viajes.component', component: AddOrdenViajesComponent},
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
    FooterComponent,
    FormProyectosComponent,
    MenuVerticalComponent,
    VistaOrdenesComponent,
  //  GastosComponent,
    VerProyectoComponent,
    VistaOrdenBotonComponent,
    VerOrdenComponent,
    ModalImagenComponent,
    AddOrdenViajesComponent,
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
    SesionService,
    UsuarioProyectoService,
    GastoService,
    GastoViajeService,
    OrdenService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
