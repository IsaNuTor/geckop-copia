import { Component, OnInit } from '@angular/core';
import { Orden } from 'src/app/services/orden/orden';
import { OrdenService } from 'src/app/services/orden/orden.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SesionService } from '../../../services/sesion/sesion.service';
import { Usuario } from 'src/app/services/usuario/usuario';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { Gasto } from 'src/app/services/gasto/gasto';
import { GastoService } from 'src/app/services/gasto/gasto.service';
import { Acreedor } from 'src/app/services/acreedor/acreedor';
import { AcreedorService } from 'src/app/services/acreedor/acreedor.service';
import { ProyectoService } from 'src/app/services/proyecto/proyecto.service';
import { GastoViajeService } from 'src/app/services/gasto-viaje/gasto-viaje.service';
import { GastoViaje } from 'src/app/services/gasto-viaje/gasto-viaje';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import {UsuarioProyecto} from 'src/app/services/usuario-proyecto/usuario-proyecto';
import {UsuarioProyectoService} from 'src/app/services/usuario-proyecto/usuario-proyecto.service';
import swal from 'sweetalert2';

import {URL_BACKEND} from '../../../config/config';



@Component({
  selector: 'app-editar-orden',
  templateUrl: './editar-orden.component.html',
  styleUrls: ['./editar-orden.component.css']
})
export class EditarOrdenComponent implements OnInit {
  acreedores: Acreedor[];
  orden : Orden= new Orden();
  gastosGenerales: Gasto[] = new Array<Gasto>();
  misProyectos: UsuarioProyecto[] = new Array<UsuarioProyecto>();
  gastoViaje: GastoViaje = new GastoViaje();
  formGastos: FormGroup;
  formGastosV: FormGroup;
  formOrden: FormGroup;
  idAux: number;
  formValid: boolean = true;
  importeTotal: number = 0;

  //GASTOS
  crearGastoForm: boolean = true;
  nFacturaVacio:boolean = false;
  descripcionVacio:boolean = false;
  importeVacio:boolean = false;
  fotoSeleccionada: File;
  gasto: Gasto = new Gasto();

  // EDITAR ORDEN
  actualizar: boolean = false;
  actualizarViaje: boolean = false;

  checkMP: boolean = false;
  checkME: boolean = false;
  checkPI: boolean = false;

  isG: boolean = false;
  isV:boolean = false;
  isIP:boolean = false;

  // Ver si el select tiene valor para que aparezca el panel de gastos.
  verSeleccionada: string = '';
  //opcionSeleccionada:string = '0';
  checkAvion: boolean = false;
  checkCoche: boolean = false;
  checkTren: boolean = false;
  checkAutobus: boolean = false;
  checkTaxi: boolean = false;
  checkOtros: boolean = false;

  // Usuario logueado
  dniUsuarioLogin: string = "";

  nombreAcreedor: string = "";

  // Ver si el select tiene valor para que aparezca el panel de gastos.
  relacion: string = "";

  /*Ojo cambiar ruta para el backend */
  rutaImagen: string = URL_BACKEND + '/api/imagenes/';
  rutaImagen2: string = URL_BACKEND + '/api/imagenesViaje/';
  //rutaImagen: string = URL_BACKEND + '/api/imagenes/';
  //rutaImagen2: string = URL_BACKEND + '/api/imagenesViaje/';

  constructor(  private ordenService: OrdenService,
    private sesionService: SesionService,
    private usuarioService: UsuarioService,
    private gastoService: GastoService,
    private gastoViajeService: GastoViajeService,
    private acreedorService: AcreedorService,
    private proyectoService: ProyectoService,
    private usuarioProyectoService: UsuarioProyectoService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router) {

      this.formOrden = this.fb.group({
        acronimo: ['', [Validators.maxLength(10)]],
        nif_acreedor: ['', [Validators.maxLength(10)]],
        concepto: ['', [Validators.maxLength(50)]],
        num_contabilidad: ['', [Validators.maxLength(50)]],
        memoria: ['', [Validators.maxLength(50)]],
        relacion: ['', [Validators.max(100000000)]],
        observaciones: ['', [Validators.max(100000000)]],
      });
      this.formGastos = this.fb.group({
        nFactura: [ '', Validators.required], //Nº de Factura
        descripcion: [ '', Validators.required],  //Concepto
        importe: [ '', Validators.required],  //Importe
        //imagen: ['', Validators.required] //Imagen
      });

      this.formGastosV = this.fb.group({
        fechaIda: ['', [Validators.minLength(10), Validators.maxLength(10)]],
        fechaVuelta: ['', [Validators.minLength(10), Validators.maxLength(10)]],
        itinerario: [''],

        avion: [ '', [Validators.maxLength(150)]],  //Concepto
        importeAvion: ['0'],  //Importe

        // Coche
        nkilometros: ['0'],  //nKilometros
        // Preciokilometro es un atributo de la clase, siempre es el mismo.
        importeCoche: ['0'],  //Importe

        //tren
        tren: [ '', [Validators.maxLength(150)]],  //Concepto
        importeTren: ['0'],  //Importe

        //Autobus
        autobus: [ '', [Validators.maxLength(150)]],  //Concepto
        importeAutobus: ['0'],  //Importe

        //Taxi
        taxi: [ '', [Validators.maxLength(150)]],  //Concepto
        importeTaxi: ['0'],  //Importe

        //Otros
        otros: [ '', [Validators.maxLength(150)]],  //Concepto
        importeOtros: ['0'],  //Importe

        // Hotel
        importeHotel: ['0'],  //Importe

        // Manutencion
        nDietas: ['0'],  //nDietas
        precioDieta: ['0'],  //precio
        importeDietas: ['0'],  //Importe

        // Otros gastos
        importeOtrosGastos: ['0'],  //Importe

        otrosAgencia: ['', [Validators.maxLength(50)]],
        checkAgenciaAvion: [''],
        checkAgenciaTren: [''],
        checkAgenciaAlojamiento: [''],

      });
     }

  ngOnInit() {
    if (!this.sesionService.isLogin())
      this.router.navigate(['/login']);
    else {
      this.cargarOrden();
    }
  }

  transportesUtilizadosFuncion(importeAvion:number, importeCoche:number,
    importeTren:number, importeAutobus:number, importeTaxi:number, importeOtros:number) {
      if(importeAvion != 0) this.checkAvion = true;
      if(importeCoche != 0) this.checkCoche = true;
      if(importeTren != 0) this.checkTren = true;
      if(importeAutobus != 0) this.checkAutobus = true;
      if(importeTaxi != 0) this.checkTaxi = true;
      if(importeOtros != 0) this.checkOtros = true;
  }

  capturarValorCheck(valor:string) {
    if(valor == 'avion') {
      if(!this.checkAvion) {
        this.checkAvion = true;
      } else {
        this.checkAvion = false;
      }
    } else if(valor == 'coche') {
      if(!this.checkCoche) {
        this.checkCoche = true;
      } else {
        this.checkCoche = false;
      }
    } else if(valor == 'tren') {
      if(!this.checkTren) {
        this.checkTren = true;
      } else {
        this.checkTren = false;
      }
    } else if(valor == 'autobus') {
      if(!this.checkAutobus) {
        this.checkAutobus = true;
      } else {
        this.checkAutobus = false;
      }
    } else if(valor == 'taxi') {
      if(!this.checkTaxi) {
        this.checkTaxi = true;
      } else {
        this.checkTaxi = false;
      }
    } else if(valor == 'otros') {
      if(!this.checkOtros) {
        this.checkOtros = true;
      } else {
        this.checkOtros = false;
      }
    }
  }

  cargarOrden(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']

    //this.Orden = new Orden();
      if(id!= null) {
      this.ordenService.getOrdenID(id).subscribe(
        (orden) =>{
           this.orden = orden;
           // Proyectos de usuarios, cargamos el dni con el que esta login.
           this.dniUsuarioLogin = this.sesionService.getDni();
           this.isG = this.orden.tipo == 'G';
           this.isV = this.orden.tipo == 'V';
           this.cargarAcreedores();
           if(this.isG)
            this.cargarGastosGenerales(orden.id);
           else
            this.cargarGastoViajes(orden.id);
           this.cargarUsuariosProyecto();
          }
        );
      }
    })

    console.log(this.orden);
  }

  /* CARGAR PROYECTOS DEL USUARIO */
  cargarUsuariosProyecto(): void {

    this.usuarioProyectoService.getProyectosDni(this.dniUsuarioLogin).subscribe(
      (listaInvestigadores) =>{
        this.misProyectos = listaInvestigadores;
        this.cargarRelacionProyecto();
      });
  }

  cargarRelacionCheck(rol: String): void {
    if((rol == "Miembro del proyecto") || (rol == "Investigador Principal")) {

      this.checkMP = true;
      this.checkME = false;
      this.checkPI = false;

    } else if(rol == "Miembro del equipo de trabajo") {

      this.checkME = true;
      this.checkMP = false;
      this.checkPI = false;
    } else if(rol == "Profesor invitado") {

      this.checkPI = true;
      this.checkME = false;
      this.checkMP = false;
    }

    //console.log(this.formOrden.get('checkMP').value);
  }

  // Para ocultar el panel de gastos si no hay un acronimo de proyecto seleccionado.
  capturarValor() {
    //this.opcionSeleccionada = this.formOrden.get('acronimo');
    this.verSeleccionada = this.formOrden.get('acronimo').value;
    this.relacion = this.getRelacionProyecto();
    //console.log(this.verSeleccionada);
  }

  getRelacionProyecto(): string{
    let relacion = "";
    for(let r of this.misProyectos){
    this.misProyectos.splice(this.misProyectos.indexOf(r),1);
    if(this.formOrden.value.acronimo == r.acronimo){
      this.cargarRelacionCheck(r.rol);
      return r.rol;
    }
    }
  }

  // Carga la relación antes de editar.
  cargarRelacionProyecto(): string{
    let relacion = "";
    for(let r of this.misProyectos){
    if(this.orden.acronimo == r.acronimo){
      this.cargarRelacionCheck(r.rol);
      return r.rol;
    }
    }
  }

  cargarGastosGenerales(idOrden: number): void{
    this.gastoService.findByIdOrden(idOrden).subscribe(
      (gastos) => this.gastosGenerales = gastos
    )
  }

  cargarGastoViajes(idOrden: number):void{

    this.gastoViajeService.findByIdOrden(idOrden).subscribe(
      (gasto) => {
        this.gastoViaje = gasto;

        this.importeTotal = this.gastoViaje.importeTotal;


        this.formGastosV = this.fb.group({
          fechaIda: [this.gastoViaje.fechaIda, [Validators.minLength(10), Validators.maxLength(10)]],
          fechaVuelta: [this.gastoViaje.fechaVuelta, [Validators.minLength(10), Validators.maxLength(10)]],
          itinerario: [this.gastoViaje.itinerario],

          importeAvion: [this.gastoViaje.importeAvion],  //Importe

          // Coche
          nkilometros: [this.gastoViaje.nkilometros],  //nkilometros
          // Preciokilometro es un atributo de la clase, siempre es el mismo.
          importeCoche: [this.gastoViaje.importeCoche],  //Importe

          //tren
          importeTren: [this.gastoViaje.importeTren],  //Importe

          //Autobus
          importeAutobus: [this.gastoViaje.importeAutobus],  //Importe

          //Taxi
          importeTaxi: [this.gastoViaje.importeTaxi],  //Importe

          //Otros
          otros: [this.gastoViaje.otros, [Validators.maxLength(150)]],  //Concepto
          importeOtros: [this.gastoViaje.importeOtros],  //Importe

          // Hotel
          importeHotel: [this.gastoViaje.importeHotel],  //Importe

          // Manutencion
          nDietas: [this.gastoViaje.nDietas],  //nDietas
          precioDieta: [this.gastoViaje.precioDieta],  //precio
          importeDietas: [this.gastoViaje.importeDietas],  //Importe

          // Otros gastos
          importeOtrosGastos: [this.gastoViaje.importeOtrosGastos],  //Importe

          otrosAgencia: [this.gastoViaje.otrosAgencia, [Validators.maxLength(50)]],
          checkAgenciaAvion: [this.gastoViaje.checkAgenciaAvion],
          checkAgenciaTren: [this.gastoViaje.checkAgenciaTren],
          checkAgenciaAlojamiento: [this.gastoViaje.checkAgenciaAlojamiento],

        });



        this.transportesUtilizadosFuncion(gasto.importeAvion, gasto.importeAutobus,
          gasto.importeTren, gasto.importeTaxi, gasto.importeOtros, gasto.importeCoche);
      }
    );
  }

  actualizarGastoViaje(): void {

    this.gastoViaje.fechaIda = this.formGastosV.value.fechaIda;

    this.gastoViaje.fechaVuelta = this.formGastosV.value.fechaVuelta;

    this.gastoViaje.itinerario = this.formGastosV.value.itinerario;

    this.gastoViaje.importeAvion = this.formGastosV.value.importeAvion;

    // Coche
    this.gastoViaje.nkilometros = this.formGastosV.value.nkilometros;
    // Preciokilometro es un atributo de la clase, siempre es el mismo.
    this.gastoViaje.importeCoche = this.formGastosV.value.importeCoche;

    //tren
    this.gastoViaje.importeTren = this.formGastosV.value.importeTren;

    //Autobus
    this.gastoViaje.importeAutobus = this.formGastosV.value.importeAutobus;

    //Taxi
    this.gastoViaje.importeTaxi = this.formGastosV.value.importeTaxi;

    //Otros
    this.gastoViaje.otros = this.formGastosV.value.otros;

    this.gastoViaje.importeOtros = this.formGastosV.value.importeOtros;

    // Hotel
    this.gastoViaje.importeHotel = this.formGastosV.value.importeHotel;

    // Manutencion
    this.gastoViaje.nDietas = this.formGastosV.value.nDietas;
    this.gastoViaje.precioDieta = this.formGastosV.value.precioDieta;
    this.gastoViaje.importeDietas = this.formGastosV.value.importeDietas;

    // Otros gastos
    this.gastoViaje.importeOtrosGastos = this.formGastosV.value.importeOtrosGastos;

    this.gastoViaje.otrosAgencia = this.formGastosV.value.otrosAgencia;
    this.gastoViaje.checkAgenciaAvion = this.formGastosV.value.checkAgenciaAvion;
    this.gastoViaje.checkAgenciaTren = this.formGastosV.value.checkAgenciaTren;
    this.gastoViaje.checkAgenciaAlojamiento = this.formGastosV.value.checkAgenciaAlojamiento;

  }

  cargarAcreedores(): void {
    this.acreedorService.getAcreedoresOrden(this.sesionService.getDni()).subscribe(
      acreedores => {
        this.acreedores = acreedores;
        for(let a of acreedores) {
          if(a.nif == this.orden.nif_acreedor) {
             this.nombreAcreedor = a.nombre;
             this.acreedores.splice(this.acreedores.indexOf(a),1);
          }
        }
      }
    );
  }

  verFoto(foto:String): void {

    swal.fire({
      imageUrl: this.rutaImagen + foto,
      imageAlt: 'Custom image',
      animation: false
    })
  }
  verFotoViaje(foto:String): void {
    let ruta =  this.rutaImagen2 + foto;
    if(foto == '' || foto == null){
      swal.fire({
        imageUrl: ruta,
        imageAlt: 'Custom image',
        animation: false
      })
    }
  }

  // EDITAR ORDEN GASTOS GENERALES

    editarOrden(): void {

        if(this.formOrden.valid){

          if(this.formOrden.value.acronimo != "" && this.formOrden.controls['acronimo'].status == 'VALID') {
            this.actualizar = true;
            this.orden.acronimo = this.formOrden.value.acronimo;
          }
          if(this.formOrden.value.nif_acreedor != "" && this.formOrden.controls['nif_acreedor'].status == 'VALID') {
            this.actualizar = true;
            this.orden.nif_acreedor = this.formOrden.value.nif_acreedor;
          }
          if(this.formOrden.value.concepto != "" && this.formOrden.controls['concepto'].status == 'VALID') {
            this.actualizar = true;
            this.orden.concepto = this.formOrden.value.concepto;
          }
          if(this.formOrden.value.num_contabilidad != "" && this.formOrden.controls['num_contabilidad'].status == 'VALID') {
            this.actualizar = true;
            this.orden.num_contabilidad = this.formOrden.value.num_contabilidad;
          }
          if(this.formOrden.value.memoria != "" && this.formOrden.controls['memoria'].status == 'VALID') {
            this.actualizar = true;
            this.orden.memoria = this.formOrden.value.memoria;
          }
          if(this.formOrden.value.relacion != "" && this.formOrden.controls['relacion'].status == 'VALID') {
            this.actualizar = true;
            this.orden.relacion = this.formOrden.value.relacion;
          }
          if(this.formOrden.value.observaciones != "" && this.formOrden.controls['observaciones'].status == 'VALID') {
            this.actualizar = true;
            this.orden.observaciones = this.formOrden.value.observaciones;
          }
            this.orden.estado = 'P';

            if(this.actualizar) {

              this.ordenService.setOrden(this.orden).subscribe(
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
                  if(this.isV) {
                    this.actualizarGastoViaje();
                    this.gastoViaje.importeTotal = this.importeTotal;

                    this.gastoViajeService.setGastoViaje(this.gastoViaje).subscribe(
                      resultado => {

                        if(resultado == null) {
                          const ToastrModule = swal.mixin({
                              toast: true,
                              position: 'top-end',
                              showConfirmButton: false,
                              timer: 5000
                          });
                          swal.fire({
                              type: 'error',
                              title: 'Error!',
                              text: 'El gasto no se ha podido editar',
                          })
                        }
                        this.router.navigate(['vista-ordenes']);
                      }
                    );
                  }
                  this.router.navigate(['vista-ordenes']);
                }else{
                  const ToastrModule = swal.mixin({
                      toast: true,
                      position: 'top-end',
                      showConfirmButton: false,
                      timer: 5000
                  });
                  swal.fire({
                      type: 'error',
                      title: 'Error!',
                      text: 'La orden no se ha podido editar',
                  })
                }
              })

        } else{
          this.formValid = false;
          const Toast = swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000
          });

          Toast.fire({
            type: 'error',
            title: 'No se ha modificado ningún dato de la orden.'
          })
        }
    }
}
// GASTOS
public crearGasto(): void {

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
            this.gastosGenerales.push(gasto);
            console.log(this.gastosGenerales);

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

        this.gasto.id_orden = this.orden.id;

        this.crearGasto();

        //this.gastos.push(this.gasto);
        /*alert(this.formGastos.value + this.gastos);*/
      }
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
            this.gastosGenerales = this.gastosGenerales.filter(gast => gast !== gasto),
            swal.fire(
              'Gasto eliminado',
              `El gasto ha sido eliminado con éxito`,
              'success'
            )
          }
        );

        /*Cogemos el indice */
        var i = this.gastosGenerales.indexOf (gasto);
        /*Quitamos el gasto del array de gastos*/
        this.gastosGenerales.splice(i, 1);
      }
    })
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

  // FUNCIONES CALCULOS
  calculoImporteTotal(campo:string): void {

    if((campo == 'avion') || (campo == 'coche') || (campo == 'tren') || (campo == 'autobus') || (campo == 'taxi') || (campo == 'otros') || (campo == 'hotel') || (campo == 'otrosgastos') || (campo == 'dieta')){
      this.importeTotal = Number(this.formGastosV.get('importeAvion').value) +
      Number(this.formGastosV.get('importeCoche').value) + Number(this.formGastosV.get('importeTren').value)
      + Number(this.formGastosV.get('importeAutobus').value) + Number(this.formGastosV.get('importeTaxi').value)
      + + Number(this.formGastosV.get('importeOtros').value) + Number(this.formGastosV.get('importeHotel').value)
      + Number(this.formGastosV.get('importeDietas').value) + Number(this.formGastosV.get('importeOtrosGastos').value);
      this.actualizar = true;
    }
  }

  calculoImporteCoche(): void {
    let importeCalculado: number;
    let nkm: number = Number(this.formGastosV.get('nkilometros').value);
    importeCalculado = nkm * this.formGastosV.value.precioKilometro;
    this.formGastosV.controls['importeCoche'].setValue(importeCalculado);

    this.calculoImporteTotal('coche');
    //console.log(this.formGastosV.get('importeCoche'))
  }

  calculoImporteDietas(): void {
    let importeCalculadoDietas: number;
    let numDietas: number = Number(this.formGastosV.get('nDietas').value);
    let precioDieta: number = Number(this.formGastosV.get('precioDieta').value);
    importeCalculadoDietas = numDietas * precioDieta;
    this.formGastosV.controls['importeDietas'].setValue(importeCalculadoDietas);

    this.calculoImporteTotal('dieta');
    //console.log(this.formGastosV.get('importeCoche'))
  }

  public cancelar(){
    this.router.navigate(['/vista-ordenes']);
  }

}
