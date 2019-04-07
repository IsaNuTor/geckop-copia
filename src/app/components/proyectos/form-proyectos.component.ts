import { Component, OnInit } from '@angular/core';
import { Proyecto } from './proyecto';

@Component({
  selector: 'app-form-proyectos',
  templateUrl: './form-proyectos.component.html',
  styleUrls: ['./form-proyectos.component.css']
})
export class FormProyectosComponent implements OnInit {

  private proyecto: Proyecto = new Proyecto()
  tituloProyectos:string = "Crear Nuevo Proyecto";

  constructor() { }

  ngOnInit() {
  }

}
