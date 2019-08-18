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
  formGastos: FormGroup;
  formValid: boolean = true;

  constructor(private gastoService: GastoService,
private fb: FormBuilder) {
    this.formGastos = this.fb.group({
      nFactura: [ '', Validators.required], //Nº de Factura
      descripcion: [ '', Validators.required],  //Concepto
      importe: [ '', Validators.required],  //Importe
      imagen: ['', Validators.required] //Imagen
    });
  }

  ngOnInit() {
    this.gastoService.getGastos().subscribe(
      gastos => this.gastos = gastos
    );

    this.gastos = new Array<Gasto>();

    
  }

  /*--------------------------------------------FUNCIONES PARA GASTOS---------------------------------------------- */


  anadirGasto(){

      var gasto: Gasto = new Gasto();
      gasto = this.formGastos.value; //Coge los datos del formulario de gasto y los mete en un gasto auxiliar

      gasto.iva = 21;


      this.gastos.push(gasto);
      /*alert(this.formGastos.value + this.gastos);*/

  }

  eliminarGasto(gasto: Gasto){
    /*Cogemos el indice */
    var i = this.gastos.indexOf (gasto);
    /*Quitamos el gasto del array de gastos*/
    this.gastos.splice(i, 1);
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
