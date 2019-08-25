import { Component, OnInit } from '@angular/core';
import { Orden } from '../../services/orden/orden';
import { OrdenService } from '../../services/orden/orden.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SesionService } from 'src/app/services/sesion/sesion.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  paginaActual: number = 0;
  elementosPorPagina: number = 7;

  ordenes: Orden[];
  aceptadas: Orden[];
  rechazadas: Orden[];
  pendientes: Orden[];

  constructor(private ordenService: OrdenService,
              private sesionService: SesionService,
              private activatedRoute: ActivatedRoute
            ) { }

  ngOnInit() {
   this.cargarOrdenesUsuario();
  }

  cargarOrdenesUsuario(){
    this.aceptadas =  new Array<Orden>();
    this.rechazadas =  new Array<Orden>();
    this.pendientes =  new Array<Orden>();


    // Carga todas las ordenes 
    this.ordenService.getOrdenesNif(this.sesionService.getDni()).subscribe(
      ordenes =>{
        this.ordenes = ordenes;
        for (let orden of ordenes ){
          if(orden.estado == "A"){//Aceptadas
            this.aceptadas.push(orden);
          }else if(orden.estado == "R"){//Rechazadas
            this.rechazadas.push(orden);
          }else if(orden.estado == "PM"){//Prndientes de modificacion
            this.pendientes.push(orden);
          }

        }
      }
    );
  }


  getOrdenPaginado(a:number):Orden{
   return this.ordenes [a+this.paginaActual*this.elementosPorPagina];
  }

  siguiente():void{
    //Comprobar maximo
    this.paginaActual++;
  }
  anterior():void{
    if(this.paginaActual >0)
        this.paginaActual--;
  }







}
