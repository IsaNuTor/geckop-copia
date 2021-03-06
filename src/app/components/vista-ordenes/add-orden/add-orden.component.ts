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
import { SesionService } from '../../../services/sesion/sesion.service';
import {UsuarioProyecto} from 'src/app/services/usuario-proyecto/usuario-proyecto';
import {UsuarioProyectoService} from 'src/app/services/usuario-proyecto/usuario-proyecto.service';
import {URL_BACKEND} from '../../../config/config';
// GASTO
import { Gasto } from 'src/app/services/gasto/gasto';
import { GastoService } from 'src/app/services/gasto/gasto.service';

@Component({
  selector: 'app-add-orden',
  templateUrl: './add-orden.component.html',
  styleUrls: ['./add-orden.component.css']
})
export class AddOrdenComponent implements OnInit {

  acreedores: Acreedor[];
  proyectos: Proyecto[];
  orden: Orden = new Orden();

  misProyectos: UsuarioProyecto[];

  /*Cosas formulario*/
  formOrden: FormGroup;

  // Usuario logueado
  dniUsuarioLogin: string = "";

  crear: boolean = true;
  proyectoVacio:boolean = false;
  acreedorVacio:boolean = false;
  conceptoVacio:boolean = false;
  numContabilidadVacio:boolean = false;
  memoriaVacio:boolean = false;
  relacionVacio:boolean = false;
  observacionesVacio:boolean = false;
  tipo_gastoVacio:boolean = false;
  relacion:string="";

  idAuxOrden: number;

  // Ver si el select tiene valor para que aparezca el panel de gastos.
  verSeleccionada: string = '';
  //opcionSeleccionada:string = '0';

  // GASTOS
  titulo: string = "Ordenes";
  rutaImagen: string = URL_BACKEND + '/api/imagenes/';

  //rutaImagen: string = URL_BACKEND + '/api/imagenes/';
  /*Ojo cambiar ruta para el backend */
  gastos: Gasto[];
  gasto: Gasto = new Gasto();
  formGastos: FormGroup;
  formValid: boolean = true;
  fotoSeleccionada: File;
  crearGastoForm: boolean = true;
  nFacturaVacio:boolean = false;
  descripcionVacio:boolean = false;
  importeVacio:boolean = false;
  idAux: number;
  numeracionAux: number;
  ibanRegistrado: boolean = true;
  num_contabilidad: string = ""; 

  constructor(private acreedorService: AcreedorService,
        private router: Router,
        private ordenService: OrdenService,
        private usuarioProyectoService: UsuarioProyectoService,
        private proyectoService: ProyectoService,
        private fb: FormBuilder,
        private activatedRoute: ActivatedRoute,
        private sesionService: SesionService,
        private gastoService: GastoService
        ) {

          this.formOrden = this.fb.group({
            acronimo: ['', [Validators.required, Validators.maxLength(10)]],
            nif_acreedor: ['', [Validators.required, Validators.maxLength(10)]],
            concepto: ['', [Validators.required, Validators.maxLength(50)]],
            memoria: ['', [Validators.required, Validators.maxLength(150)]],
            relacion: ['', [Validators.required,  Validators.maxLength(150)]],
            observaciones: ['', [Validators.required, Validators.maxLength(150)]],
            tipo_gasto: ['', [Validators.required, Validators.maxLength(150)]],
          });
          this.formGastos = this.fb.group({
            nFactura: [ '', [Validators.required, Validators.maxLength(12)]], //Nº de Factura
            descripcion: [ '', [Validators.required, Validators.maxLength(150)]],  //Concepto
            importe: [ '', [Validators.required, Validators.maxLength(12)]]  //Importe
            //imagen: ['', Validators.required] //Imagen
          });

        }

  ngOnInit() {
    if (!this.sesionService.isLogin())
      this.router.navigate(['/login']);
    else{
      // Cargamos selector de acreedores.
      this.acreedorService.getAcreedoresOrden(this.sesionService.getDni()).subscribe(
        acreedores => {
          this.acreedores = acreedores;
          this.acreedorService.getAcreedor(this.sesionService.getDni()).subscribe(
            (result) => {
              if(result != null)
                this.orden.nif_acreedor = result.nif;
              else
                this.ibanRegistrado = false;
            }
          );
        }
      );

      // Cargamos todos los proyectos.
      this.proyectoService.getProyectos().subscribe(
        proyectos => this.proyectos = proyectos
      );

      // Proyectos de usuarios, cargamos el dni con el que esta login.
      this.dniUsuarioLogin = this.sesionService.getDni();

      this.cargarUsuariosProyecto();

      // GASTOS
      /*
      this.gastoService.getGastos().subscribe(
        gastos => this.gastos = gastos
      );*/

      this.gastos = new Array<Gasto>();
    }
  }

  // Para ocultar el panel de gastos si no hay un acronimo de proyecto seleccionado.
  capturarValor() {
    //this.opcionSeleccionada = this.formOrden.get('acronimo');
    this.verSeleccionada = this.formOrden.get('acronimo').value;
    this.relacion = this.getRelacionProyecto();
    this.proyectoService.getProyecto(this.formOrden.value.acronimo).subscribe(
      (result) =>  this.num_contabilidad = result.nContabilidad.toString()
    );
    //console.log(this.verSeleccionada);
  }


/*--------------------------------------------FUNCIONES PARA GASTOS---------------------------------------------- */

public crearGasto(): void {
this.crear = true;
  if(this.formGastos.valid){
    //si falta algun dato marcamos el fallo y NO creamos el nuevo gasto
    if(this.formGastos.value.nFactura == ""){this.nFacturaVacio = true; this.crearGastoForm = false;}
    if(this.formGastos.value.descripcion == ""){this.descripcionVacio = true; this.crearGastoForm = false;}
    if(this.formGastos.value.importe == ""){this.importeVacio = true; this.crearGastoForm = false;}
    if(this.crearGastoForm){
      this.gasto = this.formGastos.value;
      this.gastoService.crearGasto(this.gasto).subscribe(
        gasto =>
        {

          if(gasto != null){

            this.idAux = gasto.id;
            this.subirFoto(this.idAux);
            gasto.foto = this.idAux + "_" + this.fotoSeleccionada.name;
            this.gastos.push(gasto);
            console.log(this.gastos);

            const ToastrModule = swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 5000
                  });

                  /*ToastrModule.fire({
                    type: 'success',
                    title: 'Guardado gasto '+ gasto.nFactura,

                  })*/

                  // IMAGEN DEL GASTO, FACTURA, TICKET
                  //alert(this.idAux);

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
   /* swal.fire({
                type: 'error',
                title: 'Error!',
                text: 'Revisa los campos, uno de los campos no tiene el formato correcto',
                onClose: () => {
                      location.reload();
                    }
              })*/
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

      //this.gastos.push(this.gasto);
      /*alert(this.formGastos.value + this.gastos);*/
    }
}

/* CARGAR la numeracion segun el acronimo del proyecto */
cargarNumProyectoOrden(): number {
  this.crear = true;
  if(this.formOrden.value.acronimo == ""){this.proyectoVacio = true; this.crear = false;}

  if(this.crear){

    this.ordenService.getNumAcronimo(this.formOrden.value.acronimo).subscribe(
      (numMax) =>{
        this.numeracionAux = numMax;
        this.crearOrden();
      });

      return this.numeracionAux;
  }

}

seleccionarFoto(event) {
  this.fotoSeleccionada = event.target.files[0];
  console.log(this.fotoSeleccionada);

  // Validamos que sea una foto y no otro archivo.
  // si no se encuentra una extensión de imagen, va a devolver la función menor que cero.
  if(this.fotoSeleccionada.type.indexOf('image') < 0) {
    swal.fire('Error', `El archivo seleccionado debe ser del tipo imagen`, 'error');
    this.fotoSeleccionada = null;
  }
}

subirFoto(idAux: number) {

  this.gastoService.subirImagen(this.fotoSeleccionada, idAux).subscribe(
    gasto => {
        this.gasto = gasto;
        //swal.fire('Exito', `La foto se ha subido correctamente`, 'success');
    });
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

      /*Cogemos el indice */
      var i = this.gastos.indexOf (gasto);
      /*Quitamos el gasto del array de gastos*/
      this.gastos.splice(i, 1);
    }
  })
}

// Inserta el dato id_orden en los gastos de la orden.
cargarIdOrdenGasto(idAuxOrden: number): void {

    for(let g of this.gastos) {
    //  console.log(g);

      g.id_orden = this.idAuxOrden;

      this.gastoService.subirIdOrden(g).subscribe (
        resultado => {
          if(resultado){
          const ToastrModule = swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 5000
          });

          ToastrModule.fire({
            type: 'success',
            title: 'Guardado con exito',

          })
        }
      });

      /*this.gastoService.subirIdOrden(g).subscribe(
        gasto => {
            g = gasto;
            //swal.fire('Exito', `id_orden en gasto insertado correctamente`, 'success');
        });*/
    }
  }

  /*--------------------------------------------------------------------------------------------------------------*/

/* CARGAR PROYECTOS DEL USUARIO */
cargarUsuariosProyecto(): void {

  this.usuarioProyectoService.getProyectosDni(this.dniUsuarioLogin).subscribe(
    (listaInvestigadores) =>{
      this.misProyectos = listaInvestigadores;
    });

}

cancelar(){
    this.router.navigate(['/vista-ordenes/vista-orden-boton']);
}

// Crear orden
crearOrden(): void {
    //console.log(this.gasto);
  console.log(this.gastos);
  if(this.gastos.length > 0){

    if(this.formOrden.valid){
      this.crear = true;
      //si falta algun dato marcamos el fallo y NO creamos la nueva Orden
      if(this.formOrden.value.acronimo == ""){this.proyectoVacio = true; this.crear = false;}
      if(this.formOrden.value.acreedor == ""){this.acreedorVacio = true; this.crear = false;}
      if(this.formOrden.value.concepto == ""){this.conceptoVacio = true; this.crear = false;}
      if(this.formOrden.value.numContabilidad == ""){this.numContabilidadVacio = true; this.crear = false;}
      if(this.formOrden.value.memoria == ""){this.memoriaVacio = true; this.crear = false;}
      if(this.formOrden.value.relacion == ""){this.relacionVacio = true; this.crear = false;}
      if(this.formOrden.value.observaciones == ""){this.observacionesVacio = true; this.crear = false;}
      if(this.formOrden.value.tipo_gasto == ""){this.tipo_gastoVacio = true; this.crear = false;}

      if(this.crear){
        this.orden = this.formOrden.value;
        // Los datos que no coge del formulario.
        this.orden.nif_user = this.dniUsuarioLogin;
        this.orden.estado = "P"; // Pendiente
        this.orden.fechaOrden = new Date();
        this.orden.numeracion = this.numeracionAux;
        this.orden.tipo = "G";
        this.orden.num_contabilidad = this.num_contabilidad;
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

              this.idAuxOrden = orden.id;
              //alert(orden.id);
              this.cargarIdOrdenGasto(this.idAuxOrden);
              //alert("pasa por aqui");

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
        })
      }
    }
  }else{
    const ToastrModule = swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 5000
    });

    ToastrModule.fire({
    type: 'error',
    title: 'Es necesario que al menos haya un gasto.',

    })
  }
}

verFoto(foto:String): void {

  swal.fire({
    imageUrl: this.rutaImagen + foto,
    imageAlt: 'Custom image',
    animation: false
  })
}

  getRelacionProyecto(): string{
    let relacion = "";
    for(let r of this.misProyectos){
    if(this.formOrden.value.acronimo == r.acronimo)
      return r.rol;
    }
  }
}
