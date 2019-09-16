import { Component, OnInit } from '@angular/core';
/*Clases propias*/
import { Proyecto } from '../../services/proyecto/proyecto';
import { ProyectoService } from '../../services/proyecto/proyecto.service';
import { SesionService } from '../../services/sesion/sesion.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {
  proyectos: Proyecto[];
  constructor(
    private proyectoService: ProyectoService,
    private sesionService: SesionService,
    private router: Router,
    private activatedRoute: ActivatedRoute
    ) { }

  ngOnInit() {
    if (!this.sesionService.isLogin())
      this.router.navigate(['/login']);
    else{
      this.elementos = new Array<number[]>(1);
      this.elementos[0] = new Array<number>();
      this.proyectoService.getProyectosUsuario(this.sesionService.getDni()).subscribe(
        proyectos =>{
          this.proyectos = proyectos;
          this.inicializarArrayNElementos( this.elementosPorPagina<this.proyectos.length ? this.elementosPorPagina : this.proyectos.length, 0);
        }
      );
    }
  }






  /*PAGINACION */

  elementosPorPagina: number = 5; //numero MAXIMO de elementos a mostrar por pagina
  paginaActual: number = 0;
  elementos: number[][];

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


  orderByFechaI():void{
    this.proyectos.sort(
      function (a, b) {
        if (a.fechaInicio < b.fechaInicio) {
          return 1;
        }
        if (a.fechaInicio > b.fechaInicio) {
          return -1;
        }
        // a must be equal to b
        return 0;
      }
    );
  }

  orderByFechaC():void{
    this.proyectos.sort(
      function (a, b) {
        if (a.fechaCierre < b.fechaCierre) {
          return 1;
        }
        if (a.fechaCierre > b.fechaCierre) {
          return -1;
        }
        // a must be equal to b
        return 0;
      }
    );
  }

  orderByNombre():void{
    this.proyectos.sort(
      function (a, b) {
        if (a.nombre > b.nombre) {
          return 1;
        }
        if (a.nombre < b.nombre) {
          return -1;
        }
        // a must be equal to b
        return 0;
      }
    );
  }

  orderByProyecto():void{
    this.proyectos.sort(
      function (a, b) {
        if (a.acronimo > b.acronimo) {
          return 1;
        }
        if (a.acronimo < b.acronimo) {
          return -1;
        }
        // a must be equal to b
        return 0;
      }
    );
  }

  orderByPresupuesto():void{
    this.proyectos.sort(
      function (a, b) {
        if (a.presupuesto > b.presupuesto) {
          return 1;
        }
        if (a.presupuesto < b.presupuesto) {
          return -1;
        }
        // a must be equal to b
        return 0;
      }
    );
  }

  orderByNumConta():void{
    this.proyectos.sort(
      function (a, b) {
        if (a.nContabilidad > b.nContabilidad) {
          return 1;
        }
        if (a.nContabilidad < b.nContabilidad) {
          return -1;
        }
        // a must be equal to b
        return 0;
      }
    );
  }

}
