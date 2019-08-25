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
import { SesionService } from '../../../services/sesion/sesion.service';
import {UsuarioProyecto} from 'src/app/services/usuario-proyecto/usuario-proyecto';
import {UsuarioProyectoService} from 'src/app/services/usuario-proyecto/usuario-proyecto.service';
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

  misProyectos: UsuarioProyecto[];

  /*Cosas formulario*/
  formOrden: FormGroup;
  formGastos: FormGroup;

  // Usuario logueado
  dniUsuarioLogin: string = "";

  formValid: boolean = true;
  crear: boolean = true;
  proyectoVacio:boolean = false;
  acreedorVacio:boolean = false;
  conceptoVacio:boolean = false;
  numContabilidadVacio:boolean = false;
  memoriaVacio:boolean = false;
  relacionVacio:boolean = false;
  observacionesVacio:boolean = false;

  constructor(private acreedorService: AcreedorService,
        private router: Router,
        private ordenService: OrdenService,
        private usuarioProyectoService: UsuarioProyectoService,
        private proyectoService: ProyectoService,
        private fb: FormBuilder,
        private activatedRoute: ActivatedRoute,
        private sesionService: SesionService
        ) {

          this.formOrden = this.fb.group({
            acronimo: ['', [Validators.required, Validators.maxLength(10)]],
            nif_acreedor: ['', [Validators.required, Validators.maxLength(10)]],
            concepto: ['', [Validators.required, Validators.maxLength(50)]],
            num_contabilidad: ['', [Validators.maxLength(50)]],
            memoria: ['', [Validators.required, Validators.maxLength(50)]],
            relacion: ['', [Validators.required, Validators.max(100000000)]],
            observaciones: ['', [Validators.required, Validators.max(100000000)]]
          });
          /*this.formGastos = this.fb.group({
            nFactura: [ '', Validators.required], //Nº de Factura
            descripcion: [ '', Validators.required],  //Concepto
            importe: [ '', Validators.required],  //Importe
            imagen: [''] //Imagen
          });*/

          //numeracion: number;
          //estado: string;

          //fechaOrden: Date;

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

    // Proyectos de usuarios, cargamos el dni con el que esta login.
    this.dniUsuarioLogin = this.sesionService.getDni();

    this.cargarUsuariosProyecto();
  }


  /*--------------------------------------------FUNCIONES PARA GASTOS---------------------------------------------- */


/*  anadirGasto(){

      var gasto: Gasto = new Gasto();
      gasto = this.formGastos.value; //Coge los datos del formulario de gasto y los mete en un gasto auxiliar

      gasto.iva = 21;
      this.gastos.push(gasto);
      /*alert(this.formGastos.value + this.gastos);*/

/*  }

  eliminarGasto(gasto: Gasto){
    /*Cogemos el indice */
/*    var i = this.gastos.indexOf (gasto);
    /*Quitamos el gasto del array de gastos*/
/*    this.gastos.splice(i, 1);
}*/

  /*--------------------------------------------------------------------------------------------------------------*/

/* CARGAR PROYECTOS DEL USUARIO */
cargarUsuariosProyecto(): void {

  this.usuarioProyectoService.getProyectosDni(this.dniUsuarioLogin).subscribe(
    (listaInvestigadores) =>{
      this.misProyectos = listaInvestigadores;
    });

}

  public cancelar(){
    this.router.navigate(['/vista-ordenes/vista-orden-boton']);
  }

  public crearOrden(): void {
    //console.log(this.gasto);

    if(this.formOrden.valid){

      //si falta algun dato marcamos el fallo y NO creamos la nueva Orden
      if(this.formOrden.value.proyecto == ""){this.proyectoVacio = true; this.crear = false;}
      if(this.formOrden.value.acreedor == ""){this.acreedorVacio = true; this.crear = false;}
      if(this.formOrden.value.concepto == ""){this.conceptoVacio = true; this.crear = false;}
      if(this.formOrden.value.numContabilidad == ""){this.numContabilidadVacio = true; this.crear = false;}
      if(this.formOrden.value.memoria == ""){this.memoriaVacio = true; this.crear = false;}
      if(this.formOrden.value.relacion == ""){this.relacionVacio = true; this.crear = false;}
      if(this.formOrden.value.observaciones == ""){this.observacionesVacio = true; this.crear = false;}

      if(this.crear){
        this.orden = this.formOrden.value;
        // Los datos que no coge del formulario.
        this.orden.nif_user = this.dniUsuarioLogin;
        this.orden.estado = "pendiente";

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
}
}
