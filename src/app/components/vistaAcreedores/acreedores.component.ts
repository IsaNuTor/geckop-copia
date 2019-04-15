import { Component, OnInit } from '@angular/core';
import { Acreedor } from '../../services/acreedor/acreedor';
import { AcreedorService } from '../../services/acreedor/acreedor.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-acreedores',
  templateUrl: './acreedores.component.html',
  styleUrls: ['./acreedores.component.css']
})
export class AcreedoresComponent implements OnInit {

  acreedores: Acreedor[];
  constructor(private acreedorService: AcreedorService) { }

  ngOnInit() {
    this.acreedorService.getAcreedores().subscribe(
      acreedores => this.acreedores = acreedores
    );
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
}