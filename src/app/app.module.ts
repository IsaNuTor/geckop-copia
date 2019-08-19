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
import { InfoProyectoComponent } from './components/info-proyecto/info-proyecto.component';

// órdenes
import { AddOrdenComponent } from './components/vista-ordenes/add-orden/add-orden.component';
import { VistaOrdenesComponent } from './components/vista-ordenes/vista-ordenes.component';
import { GastosComponent } from './components/vista-ordenes/add-orden/gastos/gastos.component';
import { FormGastosComponent } from './components/vista-ordenes/add-orden/gastos/form-gastos/form-gastos.component';
import { VistaOrdenBotonComponent } from './components/vista-ordenes/vista-orden-boton/vista-orden-boton.component';
import { VerOrdenComponent } from './components/vista-ordenes/ver-orden/ver-orden.component';
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
  {path: "add-orden/gastos/form-gastos/form-gastos.component", component:FormGastosComponent},
  {path: "vistaProyectos/verProyecto/:acronimo", component:VerProyectoComponent},
  {path: "vista-ordenes/vista-orden-boton", component:VistaOrdenBotonComponent},
  {path: "vistaOrdenes/verOrden/:id", component:VerOrdenComponent}
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
    InfoProyectoComponent,
    FooterComponent,
    FormProyectosComponent,
    MenuVerticalComponent,
    VistaOrdenesComponent,
    GastosComponent,
    FormGastosComponent,
    VerProyectoComponent,
    VistaOrdenBotonComponent,
    VerOrdenComponent,
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
    OrdenService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
