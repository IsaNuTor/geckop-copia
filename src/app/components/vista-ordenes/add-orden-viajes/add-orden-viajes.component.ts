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

// GASTO
import { Gasto } from 'src/app/services/gasto/gasto';
import { GastoService } from 'src/app/services/gasto/gasto.service';

import { GastoViaje } from 'src/app/services/gasto-viaje/gasto-viaje';
import { GastoViajeService } from 'src/app/services/gasto-viaje/gasto-viaje.service';


@Component({
  selector: 'app-add-orden-viajes',
  templateUrl: './add-orden-viajes.component.html',
  styleUrls: ['./add-orden-viajes.component.css']
})
export class AddOrdenViajesComponent implements OnInit {

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
  observacionesVacio:boolean = false;

  idAuxOrden: number;
  idAux: number;

  // Ver si el select tiene valor para que aparezca el panel de gastos.
  verSeleccionada: string = '';
  //opcionSeleccionada:string = '0';
  checkAvion: boolean = false;
  checkCoche: boolean = false;
  checkTren: boolean = false;
  checkAutobus: boolean = false;
  checkTaxi: boolean = false;
  checkOtros: boolean = false;

  // GASTOS
  titulo: string = "Ordenes";
  rutaImagen: string = 'http://localhost:8080/api/imagenes/';
  gastos: Gasto[];
  gastoViaje: GastoViaje;
  formGastos: FormGroup;
  formValid: boolean = true;
  fotos: File[];
  fotoSeleccionada: File;
  crearGastoForm: boolean = true;

  fechaIdaVacio:boolean = false;
  fechaVueltaVacio:boolean = false;
  avionVacio:boolean = false;
  importeAvionVacio:boolean = false;
  nKilometrosVacio:boolean = false;
  importeCocheVacio:boolean = false;
  trenVacio:boolean = false;
  importeTrenVacio:boolean = false;
  autobusVacio:boolean = false;
  importeAutobusVacio:boolean = false;
  taxiVacio:boolean = false;
  importeTaxiVacio:boolean = false;
  otrosVacio:boolean = false;
  importeOtrosVacio:boolean = false;
  importeHotelVacio:boolean = false;
  nDietasVacio:boolean = false;
  precioDietasVacio:boolean = false;
  importeDietasVacio:boolean = false;
  importeOtrosGastosVacio:boolean = false;

  // Importe total
  importeTotal: number = 0;

  numeracionAux: number;
  relacion: string = "";

  precioKilometro = 0.19;

  constructor(private acreedorService: AcreedorService,
        private router: Router,
        private ordenService: OrdenService,
        private usuarioProyectoService: UsuarioProyectoService,
        private proyectoService: ProyectoService,
        private fb: FormBuilder,
        private activatedRoute: ActivatedRoute,
        private sesionService: SesionService,
        private gastoViajeService: GastoViajeService
        ) {

          this.formOrden = this.fb.group({
            acronimo: ['', [Validators.required, Validators.maxLength(10)]],
            nif_acreedor: ['', [Validators.required, Validators.maxLength(10)]],
            concepto: ['', [Validators.required, Validators.maxLength(50)]],
            num_contabilidad: ['', [Validators.maxLength(50)]],
            memoria: ['', [Validators.required, Validators.maxLength(50)]],
            observaciones: ['', [Validators.required, Validators.max(100000000)]],
          });

          this.formGastos = this.fb.group({
            fechaIda: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
            fechaVuelta: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],

            avion: [ '', [Validators.maxLength(150)]],  //Concepto
            importeAvion: ['0'],  //Importe

            // Coche
            nKilometros: ['0'],  //nKilometros
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
            precioDietas: ['0'],  //precio
            importeDietas: ['0'],  //Importe

            // Otros gastos
            importeOtrosGastos: ['0'],  //Importe

          });

          //numeracion: number;
          //estado: string;

          //fechaOrden: Date;

        }

  ngOnInit() {

    if (!this.sesionService.isLogin())
      this.router.navigate(['/login']);
    else{
      // Cargamos selector de acreedores.
      this.acreedorService.getAcreedores().subscribe(
        acreedores => this.acreedores = acreedores
      );

      // Cargamos selector de proyectos.
      this.proyectoService.getProyectos().subscribe(
        proyectos => this.proyectos = proyectos
      );

      // Proyectos de usuarios, cargamos el dni con el que esta login.
      this.dniUsuarioLogin = this.sesionService.getDni();

      this.cargarUsuariosProyecto();

      this.fotos = new Array<File>();

      // GASTOS
      /*
      this.gastoService.getGastos().subscribe(
        gastos => this.gastos = gastos
      );*/

      this.gastoViaje = new GastoViaje();
    }
  }

  /* CARGAR PROYECTOS DEL USUARIO */
  cargarUsuariosProyecto(): void {

    this.usuarioProyectoService.getProyectosDni(this.dniUsuarioLogin).subscribe(
      (listaInvestigadores) =>{
        this.misProyectos = listaInvestigadores;
      });

  }

  // Para ocultar el panel de gastos si no hay un acronimo de proyecto seleccionado.
  capturarValor() {
    //this.opcionSeleccionada = this.formOrden.get('acronimo');
    this.verSeleccionada = this.formOrden.get('acronimo').value;
    this.relacion = this.getRelacionProyecto();
    //console.log(this.verSeleccionada);
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

// Crear orden
public crearOrden(): void {
    //console.log(this.gasto);

    console.log(this.gastoViaje);

    if(this.formOrden.valid){

      //si falta algun dato marcamos el fallo y NO creamos la nueva Orden
      if(this.formOrden.value.acronimo == ""){this.proyectoVacio = true; this.crear = false;}
      if(this.formOrden.value.acreedor == ""){this.acreedorVacio = true; this.crear = false;}
      if(this.formOrden.value.concepto == ""){this.conceptoVacio = true; this.crear = false;}
      if(this.formOrden.value.numContabilidad == ""){this.numContabilidadVacio = true; this.crear = false;}
      if(this.formOrden.value.memoria == ""){this.memoriaVacio = true; this.crear = false;}
      if(this.formOrden.value.observaciones == ""){this.observacionesVacio = true; this.crear = false;}

      if(this.crear){
        this.orden = this.formOrden.value;
        // Los datos que no coge del formulario.
        this.orden.nif_user = this.dniUsuarioLogin;
        this.orden.estado = "P"; // Pendiente
        this.orden.fechaOrden = new Date();
        this.orden.numeracion = this.numeracionAux;
        this.orden.tipo = "V";
        this.orden.relacion = this.relacion;

        /*if(this.orden.tipo == 'V')
          this.orden.relacion = this.getRelacionProyecto();
        else
          this.orden.relacion = this.formOrden.value.relacion;
        */

        this.ordenService.crearOrden(this.orden).subscribe(
          orden =>
          {
            this.router.navigate(['vista-ordenes'])
            if(orden != null){

              this.idAuxOrden = orden.id;
              // GASTOS VIAJES
              this.crearGastoViajes();
              //alert(orden.id);
              //alert("pasa por aqui");

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

/* CARGAR la numeracion segun el acronimo del proyecto */
cargarNumProyectoOrden(): number {
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

getRelacionProyecto(): string{
  let relacion = "";
  for(let r of this.misProyectos){
  if(this.formOrden.value.acronimo == r.acronimo)
    return r.rol;
  }
}

// GASTOS
public crearGastoViajes(): void {

  if(this.formGastos.valid){
    //si falta algun dato marcamos el fallo y NO creamos el nuevo gasto
    if(this.formGastos.value.fechaIda == ""){this.fechaIdaVacio = true; this.crearGastoForm = false;}
    if(this.formGastos.value.fechaVuelta == ""){this.fechaVueltaVacio = true; this.crearGastoForm = false;}
    if(this.crearGastoForm){
      this.gastoViaje = this.formGastos.value;
      this.gastoViaje.id_orden = this.idAuxOrden;
      this.gastoViajeService.crearGasto(this.gastoViaje).subscribe(
        gastoViaje =>
        {

          if(gastoViaje != null){

            this.idAux = gastoViaje.id;

            if(this.gastoViaje.fotoAvion != null)
              this.gastoViaje.fotoAvion=this.idAux + "_" + this.gastoViaje.fotoAvion;
            this.subirFoto(this.idAux);
            //gasto.foto = this.idAux + "_" + this.fotoSeleccionada.name;
            //this.gastos.push(gasto);
            //console.log(this.gastos);

            const ToastrModule = swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 5000
                  });

                  ToastrModule.fire({
                    type: 'success',
                    title: 'Guardado gasto ',

                  })

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

seleccionarFoto(event, s:string) {
  this.fotoSeleccionada = event.target.files[0];
  console.log(this.fotoSeleccionada);

  // Validamos que sea una foto y no otro archivo.
  // si no se encuentra una extensión de imagen, va a devolver la función menor que cero.
  if(this.fotoSeleccionada.type.indexOf('image') < 0) {
    swal.fire('Error', `El archivo seleccionado debe ser del tipo imagen`, 'error');
    this.fotoSeleccionada = null;
  } else {
    if(s=='avion') {
      this.gastoViaje.fotoAvion = this.fotoSeleccionada.name;
    }
    this.fotos.push(this.fotoSeleccionada);

  }

}

subirFoto(idAux: number) {

  for(let f of this.fotos) {
    this.gastoViajeService.subirImagen(f, idAux).subscribe(
      gastoViaje => {
          if(gastoViaje)
          alert("Todo correcto!");
          //swal.fire('Exito', `La foto se ha subido correctamente`, 'success');
      });
  }
}

// FUNCIONES CALCULOS
public calculoImporteTotal(importe:number): void {
  this.importeTotal = this.importeTotal + importe;
}

}
