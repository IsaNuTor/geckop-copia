import { Component, OnInit } from '@angular/core';
import { Proyecto } from 'src/app/services/proyecto/proyecto';
import { ProyectoService } from 'src/app/services/proyecto/proyecto.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Orden } from 'src/app/services/orden/orden';
import { UsuarioProyecto } from 'src/app/services/usuario-proyecto/usuario-proyecto';

@Component({
  selector: 'app-ver-proyecto',
  templateUrl: './ver-proyecto.component.html',
  styleUrls: ['./ver-proyecto.component.css']
})
export class VerProyectoComponent implements OnInit {

  proyecto: Proyecto = new Proyecto();
  ordenesPendientes: Orden;
  investigadoresProyecto: UsuarioProyecto;

  constructor(
    private proyectoService: ProyectoService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.cargarProyecto();
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

}
