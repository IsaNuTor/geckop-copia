import { Component, OnInit } from '@angular/core';
/*Clases propias*/
import { Proyecto } from '../../services/proyecto/proyecto';
import { ProyectoService } from '../../services/proyecto/proyecto.service';
@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {
  proyectos: Proyecto[];
  constructor( private proyectoService: ProyectoService) { }

  ngOnInit() {
    this.proyectoService.getProyectos().subscribe(
      proyectos => this.proyectos = proyectos
    );
  }

}
