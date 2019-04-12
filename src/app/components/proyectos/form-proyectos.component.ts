import { Component, OnInit } from '@angular/core';
import { Proyecto } from './proyecto';
import {TablaUsuariosComponent} from '../tabla-usuarios/tabla-usuarios.component';
@Component({
  selector: 'app-form-proyectos',
  templateUrl: './form-proyectos.component.html',
  styleUrls: ['./form-proyectos.component.css']
})
export class FormProyectosComponent implements OnInit {

  proyecto: Proyecto = new Proyecto();
  investigadores: Usuarios[] = new Array<Usuario>();
  tituloProyectos:string = "Crear Nuevo Proyecto";
  // = new TablaUsuariosComponent();
  constructor(listaUsuarios:TablaUsuariosComponent) {

  }

  ngOnInit() {


  }
  public anadirInvestigadores(): void{
  /*  this.listaUsuarios.getListaInvestigadoresAnadidos().subscribe(
      investigadores => this.investigadores = investigadores
    );*/
    this.investigadores = this.listaUsuarios.getListaInvestigadoresAnadidos().slice();


    alert(this.investigadores);
  }
}
