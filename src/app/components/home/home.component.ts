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

  /*Por cada tabla a mostrar */
  paginaActual: number = 0;
  elementos: Number[];


  elementosPorPagina: number = 2;

  
  ordenes: Orden[];
  aceptadas: Orden[];
  rechazadas: Orden[];
  pendientes: Orden[];

  fecha:Date;

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

        this.inicializarArrayNElementos( this.elementosPorPagina<this.ordenes.length ? this.elementosPorPagina : this.ordenes.length );
      }
    );
  }


  



  /* Funciones necesarias para cualquier paginado */
  siguiente(actual:number, longitud:number):number{
    //Comprobar maximo
    longitud--;
    let ultimaPagina = Math.trunc(longitud/this.elementosPorPagina);
    
    if(actual < ultimaPagina)
      actual++;
    
    if(actual == ultimaPagina)
      this.inicializarArrayNElementos(((longitud)%this.elementosPorPagina))
    
    return actual;
    
  }
  anterior(actual: number, longitud:number):number{
    let ultimaPagina = Math.trunc(longitud/this.elementosPorPagina) - 1;
    
    if(actual == ultimaPagina)
      this.inicializarArrayNElementos(this.elementosPorPagina)
    
    if(actual >0)
        actual--;
    
    return actual;
  }

  maxOrdenesOK(a:number, actual:number, longitud:number):boolean{
    return a+actual*this.elementosPorPagina < longitud;
  }

  inicializarArrayNElementos(n:number):void{
    this.elementos=new Array<Number>();

    for(let i = 1; i<= n; i++)
      this.elementos.push(i);
  }

  getOrdenPaginado(a:number, actual:number):Orden{
    return this.ordenes [a+actual*this.elementosPorPagina];
  }




}
