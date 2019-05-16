import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { Gasto } from '../../../../services/gasto/gasto';
import { GastoService } from '../../../../services/gasto/gasto.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.component.html',
  styleUrls: ['./gastos.component.css']
})
export class GastosComponent implements OnInit {

  gastos: Gasto[];
  formGasto: FormGroup;
  formValid: boolean = true;

  constructor(private gastoService: GastoService) { }

  ngOnInit() {
    this.gastoService.getGastos().subscribe(
      gastos => this.gastos = gastos
    );
  }

  delete(gasto: Gasto): void {
    swal.fire({
    title: '¿Estás seguro?',
    text: `¿Seguro que desea eliminar el gasto ?`,
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, eliminarlo',
    cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.value) {
        this.gastoService.borrarGasto(gasto.id).subscribe (
          response => {
            this.gastos = this.gastos.filter(gast => gast !== gasto),
            swal.fire(
              'Gasto eliminado',
              `El gasto ha sido eliminado con éxito`,
              'success'
            )
          }
        );
      }
    })
  }

}
