import { Component, OnInit } from '@angular/core';
import { Orden } from '../../services/orden/orden';
import { OrdenService } from '../../services/orden/orden.service';
import swal from 'sweetalert2';
import { Pipe, PipeTransform } from '@angular/core';

@Component({
  selector: 'app-vista-ordenes',
  templateUrl: './vista-ordenes.component.html',
  styleUrls: ['./vista-ordenes.component.css']
})
export class VistaOrdenesComponent implements OnInit {

  ordenes: Orden[];

  constructor(private ordenService: OrdenService) { }

  ngOnInit() {
    this.ordenService.getOrdenes().subscribe(
      ordenes => this.ordenes = ordenes
    );
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



}
