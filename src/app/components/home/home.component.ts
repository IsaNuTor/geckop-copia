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
          }else if(orden.estado == "PM"){//Pendientes de modificacion
            this.pendientes.push(orden);
          }
        }

        this.inicializarArrayNElementos( this.elementosPorPagina<this.ordenes.length ? this.elementosPorPagina : this.ordenes.length );
      }
    );
  }

  cargarOrdenesIP(){
    this.listaIP =  new Array<Orden>();
    this.ordenService.getOrdenesPendientesDeFirmaDeIP(this.sesionService.getDni()).subscribe(
      ordenes=> this.listaIP = ordenes      
    );
  }


  



  /* ----------------Funciones necesarias para cualquier paginado--------------------- */

    /*Por cada tabla a mostrar */
    paginaActual: number = 0; //mantiene un contador de la pagina en la que se encuentra
    elementos: Number[]; //"contador" de elementos que se muestran por pagina
    elementosPorPagina: number = 2; //numero MAXIMO de elementos a mostrar por pagina


  //Devuelve la siguiente pagina con el array de mostrado actulizado por si es pagina final y hay menos elementos que mostrar
  siguiente(actual:number, longitud:number):number{
    //Comprobar maximo
    
    let ultimaPagina = Math.trunc(longitud/this.elementosPorPagina);
    
    if(actual < ultimaPagina)
      actual++;
    
    if(actual == ultimaPagina)
      this.inicializarArrayNElementos(((longitud)%this.elementosPorPagina))
    
    return actual;
    
  }
  //Devuelve la anterior pagina con el array de mostrado actulizado por si es pagina final y hay menos elementos que mostrar
  anterior(actual: number, longitud:number):number{
    let ultimaPagina = Math.trunc(longitud/this.elementosPorPagina);
    
    if(actual == ultimaPagina)
      this.inicializarArrayNElementos(this.elementosPorPagina)
    
    if(actual >0)
        actual--;
    
    return actual;
  }

  //Marca el array de mostrado con los elementos correspondientes
  inicializarArrayNElementos(n:number):void{
    this.elementos=new Array<Number>();

    for(let i = 0; i< n; i++)
      this.elementos.push(i);
  }

  

  getOrdenPagindoIndex(a:number, actual:number):number{
    return a+actual*this.elementosPorPagina;
  }




}
