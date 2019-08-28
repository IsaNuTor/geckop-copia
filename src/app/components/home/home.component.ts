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



  
  ordenes: Orden[];
  aceptadas: Orden[];
  rechazadas: Orden[];
  pendientes: Orden[];
  listaIP: Orden[];

  fecha:Date;

  constructor(private ordenService: OrdenService,
              private sesionService: SesionService,
              private activatedRoute: ActivatedRoute
            ) { }

  ngOnInit() {
  
   this.elementos = new Array<number[]>(4);
   this.elementos[0] = new Array<number>();
   this.elementos[1] = new Array<number>();
   this.elementos[2] = new Array<number>();
   this.elementos[3] = new Array<number>();

   this.cargarOrdenesUsuario();
   this.cargarOrdenesIP();

   
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
          }else if(orden.estado == "P"){//Pendientes de modificacion
            this.pendientes.push(orden);
          }
        }

        this.inicializarArrayNElementos( this.elementosPorPagina<this.aceptadas.length ? this.elementosPorPagina : this.aceptadas.length, 1);
        this.inicializarArrayNElementos( this.elementosPorPagina<this.rechazadas.length ? this.elementosPorPagina : this.rechazadas.length, 2);
        this.inicializarArrayNElementos( this.elementosPorPagina<this.pendientes.length ? this.elementosPorPagina : this.pendientes.length, 3);
    

      }
    );
  }

  cargarOrdenesIP(){
    this.listaIP =  new Array<Orden>();
    this.ordenService.getOrdenesPendientesDeFirmaDeIP(this.sesionService.getDni()).subscribe(
      ordenes=> {
          this.listaIP = ordenes;
          this.inicializarArrayNElementos( this.elementosPorPagina<this.listaIP.length ? this.elementosPorPagina : this.listaIP.length, 0);
      }  
    );
  }


  



  /* ----------------Funciones necesarias para cualquier paginado--------------------- */

    /*Por cada tabla a mostrar */
    //mantiene un contador de la pagina en la que se encuentra
    paginaActualIP: number = 0;  
    paginaActualA: number = 0;  
    paginaActualR: number = 0;  
    paginaActualP: number = 0;  

    /*numero de elementos en la pagina actual de cada tabla */
    elementos: number[][];  
    /*
      elementos[0][] -> listaIP
      elementos[1][] -> aceptadas
      elementos[2][] -> rechazadas
      elementos[3][] -> pendientes
    */

    elementosPorPagina: number = 2; //numero MAXIMO de elementos a mostrar por pagina


  //Devuelve la siguiente pagina con el array de mostrado actulizado por si es pagina final y hay menos elementos que mostrar
  siguiente(actual:number, longitud:number, a:number):number{
    //Comprobar maximo
    
    let ultimaPagina = Math.trunc(longitud/this.elementosPorPagina);
    
    if(longitud%this.elementosPorPagina == 0){
      ultimaPagina--;
      if(actual < ultimaPagina)
        actual++;
    }else{
      if(actual < ultimaPagina)
        actual++;
      if(actual == ultimaPagina)
        this.inicializarArrayNElementos(longitud%this.elementosPorPagina, a)
    }
      
  
    


    
    return actual;
    
  }
  //Devuelve la anterior pagina con el array de mostrado actulizado por si es pagina final y hay menos elementos que mostrar
  anterior(actual: number, longitud:number, a:number):number{
    let ultimaPagina = Math.trunc(longitud/this.elementosPorPagina);
    
    if(longitud%this.elementosPorPagina ==0)
      ultimaPagina--;

    if(actual == ultimaPagina)
      this.inicializarArrayNElementos(this.elementosPorPagina < longitud ? this.elementosPorPagina : longitud , a)
    
    if(actual >0)
        actual--;
    
    return actual;
  }

  //Marca el array de mostrado con los elementos correspondientes
  inicializarArrayNElementos(n:number, a:number):void{
    this.elementos[a]=new Array<number>();

    for(let i = 0; i< n; i++)
      this.elementos[a].push(i); 
  }

  

  getOrdenPagindoIndex(a:number, actual:number):number{
    return a+actual*this.elementosPorPagina;
  }




}
