import { Component, OnInit } from '@angular/core';
import { Proyecto } from 'src/app/services/proyecto/proyecto';
import { ProyectoService } from 'src/app/services/proyecto/proyecto.service';
import { UsuarioProyectoService } from 'src/app/services/usuario-proyecto/usuario-proyecto.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Orden } from 'src/app/services/orden/orden';
import { UsuarioProyecto } from 'src/app/services/usuario-proyecto/usuario-proyecto';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { Usuario } from 'src/app/services/usuario/usuario';

@Component({
  selector: 'app-ver-proyecto',
  templateUrl: './ver-proyecto.component.html',
  styleUrls: ['./ver-proyecto.component.css']
})
export class VerProyectoComponent implements OnInit {

  proyecto: Proyecto = new Proyecto();
  ordenesPendientes: Orden;
  investigadoresProyecto: UsuarioProyecto[];
  nombresInvestigadores: String[];//Array<String>;
  usuarioAux: Usuario;
  editarFechaActiva: Boolean = false;
  constructor(
    private proyectoService: ProyectoService,
    private usuarioService: UsuarioService,
    private usuariosProyectoService: UsuarioProyectoService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.cargarProyecto();
    this.cargarUsuariosProyecto();
    
  }


  cargarProyecto(): void {
      this.activatedRoute.params.subscribe(params => {
      let acronimo = params['acronimo']

      //this.proyecto = new Proyecto();
      if(acronimo) {
      //alert(acronimo);
      /*this.proyectoService.getProyecto(acronimo).subscribe(
          (proyecto) => this.proyecto = proyecto
        )*/
        this.proyectoService.getProyecto(acronimo).subscribe((proyecto) => this.proyecto = proyecto);
      }
    })
  }

  cargarUsuariosProyecto(): void {

    this.activatedRoute.params.subscribe(params => {
        let acronimo = params['acronimo']

        //this.proyecto = new Proyecto();
        if(acronimo) {
        //alert(acronimo);
        /*this.proyectoService.getProyecto(acronimo).subscribe(
            (proyecto) => this.proyecto = proyecto
          )*/
          this.usuariosProyectoService.getInvestigadoresProyecto(acronimo).subscribe( 
            (listaInvestigadores) =>{
              this.investigadoresProyecto = listaInvestigadores;
              this.cargarNombres();
              
            });
        }
      }) 
  }

  verUsuarios(): void{
    this.cargarUsuariosProyecto();
  }

  getNombre(dni: String): void{
      
      this.usuarioService.getNombreUsuario(dni).subscribe( (result) => {
        this.usuarioAux = result;
        this.nombresInvestigadores.push(result.nombre + " " + result.apellido1 +" "+ result.apellido2);
      });
    
  }

  cargarNombres():void{  
    this.nombresInvestigadores = new Array<String>();  
    for (let user of this.investigadoresProyecto) {
      this.getNombre(user.dni);
      
    }
   //alert(this.nombresInvestigadores);
  }

  editarFecha():void{
    this.editarFechaActiva = !this.editarFechaActiva;
  }
}
