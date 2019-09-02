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

  public borrarProyecto(proyecto: Proyecto): void{
    swal.fire({
      title: '¿Estás seguro?',
      text: `¿Seguro que desea eliminar al proyecto ${proyecto.acronimo}?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo',
      cancelButtonText: 'No, cancelar',
      onClose: () => {
            location.reload();
          }
    }).then((result) => {
        if (result.value) {
          this.proyectoService.borrarProyecto(proyecto).subscribe (
            response => {
              this.proyectos = this.proyectos.filter(pry => pry !== proyecto),
              swal.fire(
                'Proyecto eliminado',
                `El proyecto ${proyecto.acronimo} ha sido eliminado con éxito`,
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
