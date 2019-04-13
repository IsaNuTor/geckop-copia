import { Component, OnInit } from '@angular/core';
import { Proyecto } from '../../../services/proyecto/proyecto';
import {UsuarioService} from '../../../services/usuario/usuario.service';
import { Usuario } from '../../../services/usuario/usuario';
import{UsuarioProyectoService} from '../../../services/usuario-proyecto/usuario-proyecto.service'
@Component({
  selector: 'app-form-proyectos',
  templateUrl: './form-proyectos.component.html',
  styleUrls: ['./form-proyectos.component.css']
})
export class FormProyectosComponent implements OnInit {

  proyecto: Proyecto = new Proyecto();
  tituloProyectos:string = "Crear Nuevo Proyecto";
  usuarios: Usuario[];
  usuarios_anadidos: Usuario[];
  // = new TablaUsuariosComponent();
  constructor( private usuarioService: UsuarioService, private usuarioProyecto: UsuarioProyectoService) { }

  ngOnInit() {
    this.usuarioService.getUsuarios().subscribe(
      usuarios => this.usuarios = usuarios
    );
    this.usuarios_anadidos = new Array<Usuario>();
  }

  public anadirInvestigador(usuario: Usuario): void{
    //Podemos hacer que se quite de la otra lista
    this.usuarios_anadidos.push(usuario);
  }


  public anadirInvestigadores(): void{
      this.usuarioProyecto.guardarUsuariosProyecto(this.usuarios_anadidos, "AAA");
  }


  public guardarProyecto(){
    //post proyecto

    //post inv-proyecto

  }
}
