import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { Gasto } from '../../../../services/gasto/gasto';
import { GastoService } from '../../../../services/gasto/gasto.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.component.html',
  styleUrls: ['./gastos.component.css']
})
export class GastosComponent implements OnInit {

  titulo: string = "Ordenes";
  rutaImagen: string = 'http://localhost:8080/api/imagenes/';
  gastos: Gasto[];
  gasto: Gasto = new Gasto();
  formGastos: FormGroup;
  formValid: boolean = true;
  fotoSeleccionada: File;
  crear: boolean = true;
  nFacturaVacio:boolean = false;
  descripcionVacio:boolean = false;
  importeVacio:boolean = false;
  idAux: number;

  constructor(private gastoService: GastoService,
              private fb: FormBuilder,
              private activatedRoute: ActivatedRoute,) {
    this.formGastos = this.fb.group({
      nFactura: [ '', Validators.required], //Nº de Factura
      descripcion: [ '', Validators.required],  //Concepto
      importe: [ '', Validators.required],  //Importe
      //imagen: ['', Validators.required] //Imagen
    });
  }

  ngOnInit() {
    this.gastoService.getGastos().subscribe(
      gastos => this.gastos = gastos
    );

    this.gastos = new Array<Gasto>();
  }

  /*--------------------------------------------FUNCIONES PARA GASTOS---------------------------------------------- */

  public crearGasto(): void {

    if(this.formGastos.valid){
      //si falta algun dato marcamos el fallo y NO creamos el nuevo gasto
      if(this.formGastos.value.nFactura == ""){this.nFacturaVacio = true; this.crear = false;}
      if(this.formGastos.value.descripcion == ""){this.descripcionVacio = true; this.crear = false;}
      if(this.formGastos.value.importe == ""){this.importeVacio = true; this.crear = false;}
      if(this.crear){
        this.gasto = this.formGastos.value;
        this.gastoService.crearGasto(this.gasto).subscribe(
          gasto =>
          {
            if(gasto != null){

              this.idAux = gasto.id;

              const ToastrModule = swal.mixin({
                      toast: true,
                      position: 'top-end',
                      showConfirmButton: false,
                      timer: 5000
                    });

                    ToastrModule.fire({
                      type: 'success',
                      title: 'Guardado gasto '+ gasto.nFactura,

                    })

                    // IMAGEN DEL GASTO, FACTURA, TICKET
                    //alert(this.idAux);
                    this.subirFoto(this.idAux);
              }else{
                swal.fire({
                            type: 'error',
                            title: 'Error!',
                            text: 'El gasto no se ha podido crear',
                            onClose: () => {
                                  location.reload();
                                }
                          })
              }
        })
      }
    }else{
      this.formValid = false;
      swal.fire({
                  type: 'error',
                  title: 'Error!',
                  text: 'Revisa los campos, uno de los campos no tiene el formato correcto',
                  onClose: () => {
                        location.reload();
                      }
                })
    }
  }

  anadirGasto(){

      // Comprobamos que ha seleccionado la imagenen
      if(!this.fotoSeleccionada) {
          swal.fire('Error', `Debe seleccionar una imagen`, 'error');

      } else {
        this.gasto = this.formGastos.value; //Coge los datos del formulario de gasto y los mete en un gasto auxiliar

        this.gasto.iva = 21;

        this.crearGasto();

        this.gastos.push(this.gasto);
        /*alert(this.formGastos.value + this.gastos);*/
      }
  }

  seleccionarFoto(event) {
    this.fotoSeleccionada = event.target.files[0];
    console.log(this.fotoSeleccionada);

    // Validamos que sea una foto y no otro archivo.
    if(this.fotoSeleccionada.type.indexOf('image') < 0) {
      swal.fire('Error', `El archivo seleccionado debe ser del tipo imagen`, 'error');
      this.fotoSeleccionada = null;
    }
  }

  subirFoto(idAux: number) {

    this.gastoService.subirImagen(this.fotoSeleccionada, idAux).subscribe(
      gasto => {
          this.gasto = gasto;
          swal.fire('Exito', `La foto se ha subido correctamente`, 'success');
      });
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
