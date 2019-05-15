import { Component, OnInit } from '@angular/core';
import { Proyecto } from 'src/app/services/proyecto/proyecto';
import { ProyectoService } from 'src/app/services/proyecto/proyecto.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ver-proyecto',
  templateUrl: './ver-proyecto.component.html',
  styleUrls: ['./ver-proyecto.component.css']
})
export class VerProyectoComponent implements OnInit {

  proyecto: Proyecto;
  

  constructor(
    proyectoService: ProyectoService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.cargarProyecto();
  }


  cargarProyecto(): void {
    this.activatedRoute.params.subscribe(params => {
      let acronimo = params['acronimo']
      if(acronimo) {
      //alert(acronimo);
      /*this.proyectoService.getProyecto(acronimo).subscribe(
          (proyecto) => this.proyecto = proyecto
        )*/
      }
    })
  }

}


