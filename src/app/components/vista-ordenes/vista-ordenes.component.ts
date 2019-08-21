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
              private activatedRoute: ActivatedRoute,) {


              }

  ngOnInit() {

    // Carga todas las ordenes
    /*this.ordenService.getOrdenes().subscribe(
      ordenes => this.ordenes = ordenes
    );*/

    // Proyectos de usuarios, cargamos el dni con el que esta login.
    this.dniUsuarioLogin = this.sesionService.getDni();

    this.cargarMisOrdenes();
  }

  /* CARGAR Mis ordenes */
  cargarMisOrdenes(): void {

    this.ordenService.getOrdenesNif(this.dniUsuarioLogin).subscribe(
      (listaMisOrdenes) =>{
        this.ordenes = listaMisOrdenes;
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



}
