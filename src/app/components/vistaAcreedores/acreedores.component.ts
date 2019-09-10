import { Component, OnInit } from '@angular/core';
import { Acreedor } from '../../services/acreedor/acreedor';
import { AcreedorService } from '../../services/acreedor/acreedor.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { SesionService } from 'src/app/services/sesion/sesion.service';

@Component({
  selector: 'app-acreedores',
  templateUrl: './acreedores.component.html',
  styleUrls: ['./acreedores.component.css']
})
export class AcreedoresComponent implements OnInit {

  acreedores: Acreedor[];
  constructor(
    private acreedorService: AcreedorService,
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
      this.acreedorService.getAcreedores().subscribe(
        acreedores => {
          this.acreedores = acreedores;
          this.inicializarArrayNElementos( this.elementosPorPagina<this.acreedores.length ? this.elementosPorPagina : this.acreedores.length, 0);

        }
      );
    }

  }

  delete(acreedor: Acreedor): void {
    swal.fire({
    title: '¿Estás seguro?',
    text: `¿Seguro que desea eliminar al acreedor ${acreedor.nombre}?`,
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, eliminarlo',
    cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.value) {
        this.acreedorService.borrarAcreedor(acreedor.nif).subscribe (
          response => {
            this.acreedores = this.acreedores.filter(acr => acr !== acreedor),
            swal.fire(
              'Acreedor eliminado',
              `El acreedor ${acreedor.nombre} ha sido eliminado con éxito`,
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
  ultima: number = 0;

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
