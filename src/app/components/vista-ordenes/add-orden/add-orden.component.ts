import { Component, OnInit } from '@angular/core';
import { Acreedor } from 'src/app/services/acreedor/acreedor';
import { Proyecto } from 'src/app/services/proyecto/proyecto';
import { AcreedorService } from 'src/app/services/acreedor/acreedor.service';
import { ProyectoService } from 'src/app/services/proyecto/proyecto.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { Orden } from '../../../services/orden/orden';
import { OrdenService } from '../../../services/orden/orden.service';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Gasto } from 'src/app/services/gasto/gasto';

@Component({
  selector: 'app-add-orden',
  templateUrl: './add-orden.component.html',
  styleUrls: ['./add-orden.component.css']
})
export class AddOrdenComponent implements OnInit {

  acreedores: Acreedor[];
  proyectos: Proyecto[];
  orden: Orden = new Orden();
  gastos: Gasto[];

  /*Cosas formulario*/
  formOrden: FormGroup;
  formGastos: FormGroup;

  constructor(private acreedorService: AcreedorService,
        private router: Router,
        private ordenService: OrdenService,
        private proyectoService: ProyectoService,
        private fb: FormBuilder
        ) {

          this.formOrden = this.fb.group({
            proyecto: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
            acreedor: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
            concepto: ['', [Validators.required, Validators.maxLength(50)]],
            numContabilidad: ['', [Validators.maxLength(50)]],
            memoria: ['', [Validators.required, Validators.maxLength(50)]],
            relacion: ['', [Validators.required, Validators.max(100000000)]],
            observaciones: ['', [Validators.required, Validators.max(100000000)]]
          });
          this.formGastos = this.fb.group({
            nFactura: [ '', Validators.required], //Nº de Factura
            descripcion: [ '', Validators.required],  //Concepto
            importe: [ '', Validators.required],  //Importe
            imagen: [''] //Imagen
          });

        }

  ngOnInit() {
    // Cargamos selector de acreedores.
    this.acreedorService.getAcreedores().subscribe(
      acreedores => this.acreedores = acreedores
    );

    // Cargamos selector de proyectos.
    this.proyectoService.getProyectos().subscribe(
      proyectos => this.proyectos = proyectos
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

  /*--------------------------------------------------------------------------------------------------------------*/

  public cancelar(){
    this.router.navigate(['/vista-ordenes/vista-orden-boton']);
  }

  public crearOrden(): void {
    //console.log(this.gasto);
    this.ordenService.crearOrden(this.orden).subscribe(
      orden =>
      {
        this.router.navigate(['vista-ordenes'])
        if(orden != null){
          const ToastrModule = swal.mixin({
                  toast: true,
                  position: 'top-end',
                  showConfirmButton: false,
                  timer: 5000
                });

                ToastrModule.fire({
                  type: 'success',
                  title: 'Éxito creada',

                })
          }else{
            swal.fire({
                        type: 'error',
                        title: 'Error!',
                        text: 'La orden no se ha podido crear',
                        onClose: () => {
                              location.reload();
                            }
            })
          }
      }
    )
  }
}
