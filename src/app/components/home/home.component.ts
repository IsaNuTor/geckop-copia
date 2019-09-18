import { Component, OnInit } from '@angular/core';
import { Orden } from '../../services/orden/orden';
import { OrdenService } from '../../services/orden/orden.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SesionService } from 'src/app/services/sesion/sesion.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { Usuario } from 'src/app/services/usuario/usuario';

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
  pendientesM: Orden[];
  listaIP: Orden[];
  nombres: Usuario[];

  verPendientes:boolean=true;
  verAceptadas:boolean=false;
  verRechazadas:boolean=false;
  verPM: boolean = false;
  verIp:boolean=false;



  fecha:Date;

  constructor(private ordenService: OrdenService,
              private sesionService: SesionService,
              private usuarioService: UsuarioService,
              private router: Router,
              private activatedRoute: ActivatedRoute
            ) { }

  ngOnInit() {
    if (!this.sesionService.isLogin())
      this.router.navigate(['/login']);
    else{
      this.elementos = new Array<number[]>(5);
      this.elementos[0] = new Array<number>();
      this.elementos[1] = new Array<number>();
      this.elementos[2] = new Array<number>();
      this.elementos[3] = new Array<number>();
      this.elementos[4] = new Array<number>();

      this.cargarOrdenesUsuario();
      this.cargarOrdenesIP();
    }

		
   
  }

  /*Carga las ordenes emitidas por el usuario*/
  cargarOrdenesUsuario(){
    this.aceptadas =  new Array<Orden>();
    this.rechazadas =  new Array<Orden>();
    this.pendientes =  new Array<Orden>();
    this.pendientesM =  new Array<Orden>();


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
            this.pendientesM.push(orden);
          }else if(orden.estado == "P"){//Pendientes 
            this.pendientes.push(orden);
          }
        }

        this.inicializarArrayNElementos( this.elementosPorPagina<this.aceptadas.length ? this.elementosPorPagina : this.aceptadas.length, 1);
        this.inicializarArrayNElementos( this.elementosPorPagina<this.rechazadas.length ? this.elementosPorPagina : this.rechazadas.length, 2);
        this.inicializarArrayNElementos( this.elementosPorPagina<this.pendientes.length ? this.elementosPorPagina : this.pendientes.length, 3);
        this.inicializarArrayNElementos( this.elementosPorPagina<this.pendientesM.length ? this.elementosPorPagina : this.pendientesM.length, 4);
    

      }
    );
  }

  cargarOrdenesIP():void{
    this.listaIP =  new Array<Orden>();
    this.nombres = new Array<Usuario>();

    this.ordenService.getOrdenesPendientesDeFirmaDeIP(this.sesionService.getDni()).subscribe(
      ordenes=> {
          this.listaIP = ordenes;

          for(let dni of this.listaIP){
            this.cargarNombre(dni.nif_user);
          }
          this.inicializarArrayNElementos( this.elementosPorPagina<this.listaIP.length ? this.elementosPorPagina : this.listaIP.length, 0);
      }  
    );

    
  }

  cargarNombre(dni:string):void{
    this.usuarioService.getNombreUsuario(dni).subscribe(
      (result) => {
        this.nombres.push(result);
      }
    )

  }


  /* ----------------Funciones necesarias para cualquier paginado--------------------- */

    /*Por cada tabla a mostrar */
    //mantiene un contador de la pagina en la que se encuentra
    paginaActualIP: number = 0;  
    paginaActualA: number = 0;  
    paginaActualR: number = 0;  
    paginaActualP: number = 0;  
    paginaActualPM: number = 0;  

    /*numero de elementos en la pagina actual de cada tabla */
    elementos: number[][];  
    /*
      elementos[0][] -> listaIP
      elementos[1][] -> aceptadas
      elementos[2][] -> rechazadas
      elementos[3][] -> pendientes
    */

    elementosPorPagina: number = 7; //numero MAXIMO de elementos a mostrar por pagina


  //Devuelve la siguiente pagina con el array de mostrado actulizado por si es pagina final y hay menos elementos que mostrar
  siguiente(actual:number, longitud:number, a:number):number{
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


  
  despleOut():void{
    //alert("Funciona el alert");
    document.getElementById("desplegable").classList.remove("show");
    document.getElementById("desplegable").setAttribute("aria-expanded","false"); 
  }

  despleIn():void{
   /* document.getElementById("usuario").classList.add("active");
    if(this.listaIP.length > 0)
      document.getElementById("firmar").classList.remove("active");*/
    document.getElementById("desplegable").classList.add("show");
    document.getElementById("desplegable").setAttribute("aria-expanded","true");
  }

  quitarVer(){
    this.verIp = false;
    this.verAceptadas = false;
    this.verRechazadas = false;
    this.verPendientes = false;
    this.verPM = false;
  }

  desactivar(){
    
    if(this.aceptadas.length > 0)
      document.getElementById("aceptadas").classList.remove("active");
    
    if(this.rechazadas.length > 0)
      document.getElementById("rechazadas").classList.remove("active");
    
    if(this.pendientes.length > 0)
      document.getElementById("pendientes").classList.remove("active");

    if(this.pendientesM.length > 0)
      document.getElementById("pm").classList.remove("active");
  }
  activarIp():void{
    //alert("Funciona el alert");
    

    if(this.listaIP.length > 0)
      document.getElementById("firmar").classList.add("active");
    document.getElementById("usuario").classList.remove("active");

    this.quitarVer();
    this.desactivar();
    this.verIp=true;
  }
  cambiarMisOrdenes():void{
    if(this.listaIP.length > 0)
    document.getElementById("firmar").classList.remove("active");
    document.getElementById("usuario").classList.add("active");
  }
  activarAceptadas():void{
    this.quitarVer();
    this.desactivar();
    document.getElementById("aceptadas").classList.add("active");
    this.cambiarMisOrdenes();
    this.verAceptadas=true;
  }

  activarRechazadas():void{
    this.quitarVer();
    this.desactivar();
    document.getElementById("rechazadas").classList.add("active");
    this.cambiarMisOrdenes();
    this.verRechazadas=true;
  }

  activarPendientes():void{
    this.quitarVer();
    this.desactivar();
    document.getElementById("pendientes").classList.add("active");
    this.cambiarMisOrdenes();
    this.verPendientes=true;
  }

  activarPM():void{
    this.quitarVer();
    this.desactivar();
    document.getElementById("pm").classList.add("active");
    this.cambiarMisOrdenes();
    this.verPM=true;
  }


}
