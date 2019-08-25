import { Component, OnInit } from '@angular/core';
/*Clases propias*/
import { Proyecto } from '../../services/proyecto/proyecto';
import { ProyectoService } from '../../services/proyecto/proyecto.service';
import { SesionService } from '../../services/sesion/sesion.service';
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
    private sesionService: SesionService
    ) { }

  ngOnInit() {
    this.proyectoService.getProyectosUsuario(this.sesionService.getDni()).subscribe(
      proyectos => this.proyectos = proyectos
    );
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

}
