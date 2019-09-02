import { Component, OnInit } from '@angular/core';
import { Orden } from '../../services/orden/orden';
import { OrdenService } from '../../services/orden/orden.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SesionService } from '../../services/sesion/sesion.service';
import swal from 'sweetalert2';
import { Pipe, PipeTransform } from '@angular/core';

@Component({
  selector: 'app-vista-ordenes',
  templateUrl: './vista-ordenes.component.html',
  styleUrls: ['./vista-ordenes.component.css']
})
export class VistaOrdenesComponent implements OnInit {

  ordenes: Orden[];

  // Usuario logueado
  dniUsuarioLogin: string = "";

  constructor(private ordenService: OrdenService,
              private sesionService: SesionService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {}

  ngOnInit() {
    // Proyectos de usuarios, cargamos el dni con el que esta login.
    if (!this.sesionService.isLogin())
      this.router.navigate(['/login']);
    else{
      this.elementos = new Array<number[]>(1);
      this.elementos[0] = new Array<number>();
      this.dniUsuarioLogin = this.sesionService.getDni();
  
      this.cargarMisOrdenes();

    }
    
  }

  /* CARGAR Mis ordenes */
  cargarMisOrdenes(): void {

    this.ordenService.getOrdenesNif(this.dniUsuarioLogin).subscribe(
      (listaMisOrdenes) =>{
        this.ordenes = listaMisOrdenes;
        this.inicializarArrayNElementos( this.elementosPorPagina<this.ordenes.length ? this.elementosPorPagina : this.ordenes.length, 0);
     
      });
  }

  public borrarOrden(orden: Orden): void{
    swal.fire({
      title: '¿Estás seguro?',
      text: `¿Seguro que desea eliminar la orden ${orden.numeracion} del proyecto ${orden.acronimo}?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo',
      cancelButtonText: 'No, cancelar',
      /*onClose: () => {
           location.reload();
      }*/
    }).then((result) => {
        if (result.value) {
          this.ordenService.borrarOrden(orden).subscribe (
            response => {
              this.ordenes = this.ordenes.filter(ord => ord !== orden),
              swal.fire(
                'Orden eliminada',
                `La orden la orden ${orden.numeracion} del proyecto ${orden.acronimo} ha sido eliminada con éxito`,
                'success'
              )
            }
          );
        }
    })
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


}
