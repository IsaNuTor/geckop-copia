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
  rutaImagen: string = URL_BACKEND + '/api/imagenes/';
  gastos: Gasto[];
  gastoViaje: GastoViaje;
  formGastos: FormGroup;
  formValid: boolean = true;

  fotos: File[];
  favion:string = "";
  fcoche:string = "";
  ftren:string = "";
  fautobus:string = "";
  ftaxi:string = "";
  fotros:string = "";
  fhotel:string = "";
  fmanutencion:string = "";
  fotrosgastos:string = "";

  fotoSeleccionada: File;
  crearGastoForm: boolean = true;

  fechaIdaVacio:boolean = false;
  fechaVueltaVacio:boolean = false;
  itinerarioVacio:boolean = false;
  ibanRegistrado:boolean = true;

  checkMP: boolean = false;
  checkME: boolean = false;
  checkPI: boolean = false;

  // Importe total
  importeTotal: number = 0;
  num_contabilidad: string = "";

  numeracionAux: number;
  relacion: string = "";

  precioKilometro: number = 0.19;

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
            acronimo: ['', [Validators.maxLength(10)]],
            nif_acreedor: ['', [Validators.required, Validators.maxLength(10)]],
            concepto: ['', [Validators.required, Validators.maxLength(50)]],
            num_contabilidad: ['', [Validators.maxLength(50)]],
            memoria: ['', [Validators.required, Validators.maxLength(50)]],
            observaciones: ['', [Validators.required, Validators.max(100000000)]],
          });

          this.formGastos = this.fb.group({
            fechaIda: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
            fechaVuelta: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
            itinerario: ['', [Validators.required]],

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
            checkAgenciaAvion: [false],
            checkAgenciaTren: [false],
            checkAgenciaAlojamiento: [false],
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
      this.acreedorService.getAcreedoresOrden(this.sesionService.getDni()).subscribe(
        acreedores =>{ 
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
    this.proyectoService.getProyecto(this.formOrden.value.acronimo).subscribe(
      (result) =>  this.num_contabilidad = result.nContabilidad.toString()
    );
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
        this.orden.num_contabilidad = this.num_contabilidad;

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
  if(this.formOrden.value.acronimo == r.acronimo){
    this.cargarRelacionCheck(r.rol);
    return r.rol;
  }
  }
}

// GASTOS
public crearGastoViajes(): void {

  if(this.formGastos.valid){
    //si falta algun dato marcamos el fallo y NO creamos el nuevo gasto
    if(this.formGastos.value.fechaIda == ""){this.fechaIdaVacio = true; this.crearGastoForm = false;}
    if(this.formGastos.value.fechaVuelta == ""){this.fechaVueltaVacio = true; this.crearGastoForm = false;}
    if(this.formGastos.value.itinerario == ""){this.itinerarioVacio = true; this.crearGastoForm = false;}
    if(this.crearGastoForm){
      this.gastoViaje = this.formGastos.value;
      this.gastoViaje.precioKilometro = this.precioKilometro;
      this.gastoViaje.importeTotal = this.importeTotal;
      this.gastoViaje.id_orden = this.idAuxOrden;
      this.rellenarFotos(this.idAuxOrden.toString());

      this.gastoViajeService.crearGasto(this.gastoViaje).subscribe(
        gastoViaje =>
        {

          if(gastoViaje != null){

            this.idAux = gastoViaje.id;
            this.subirFoto(this.idAuxOrden);
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
                    title: 'Creada con éxito ',

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
      this.favion= this.fotoSeleccionada.name;
    }else  if(s=='coche') {
      this.fcoche = this.fotoSeleccionada.name;
    }else  if(s=='tren') {
      this.ftren = this.fotoSeleccionada.name;
    }else  if(s=='autobus') {
      this.fautobus = this.fotoSeleccionada.name;
    }else  if(s=='taxi') {
      this.ftaxi = this.fotoSeleccionada.name;
    }else  if(s=='otros') {
      this.fotros = this.fotoSeleccionada.name;
    }else  if(s=='hotel') {
      this.fhotel = this.fotoSeleccionada.name;
    }else  if(s=='otrosgastos') {
      this.fotrosgastos = this.fotoSeleccionada.name;
    }
    this.fotos.push(this.fotoSeleccionada);

  }

}

rellenarFotos(id:string):void{
  if(this.favion != ""){
    this.gastoViaje.fotoAvion = id+"_"+this.favion;
  }
  if(this.fcoche != ""){
    this.gastoViaje.fotoCoche = id+"_"+this.fcoche;
  }
  if(this.ftren != ""){
    this.gastoViaje.fotoTren = id+"_"+this.ftren;
  }if(this.fautobus!= ""){
    this.gastoViaje.fotoAutobus = id+"_"+this.fautobus;
  }if(this.ftaxi!= ""){
    this.gastoViaje.fotoTaxi = id+"_"+this.ftaxi;
  }if(this.fotros!= ""){
    this.gastoViaje.fotoOtros = id+"_"+this.fotros;
  }if(this.fhotel!= ""){
    this.gastoViaje.fotoHotel = id+"_"+this.fhotel;
  }if(this.fotrosgastos!= ""){
    this.gastoViaje.fotoOtrosGastos = id+"_"+this.fotrosgastos;
  }

}

  subirFoto(idAux: number) {

    for(let f of this.fotos) {
      this.gastoViajeService.subirImagen(f, idAux).subscribe();
    }
  }

  // FUNCIONES CALCULOS
  calculoImporteTotal(campo:string): void {

    if((campo == 'avion') || (campo == 'coche') || (campo == 'tren') || (campo == 'autobus') || (campo == 'taxi') || (campo == 'otros') || (campo == 'hotel') || (campo == 'otrosgastos') || (campo == 'dieta')){
      this.importeTotal =  Number(this.formGastos.get('importeAvion').value) +
      Number(this.formGastos.get('importeCoche').value) + Number(this.formGastos.get('importeTren').value)
      + Number(this.formGastos.get('importeAutobus').value) + Number(this.formGastos.get('importeTaxi').value)
      + + Number(this.formGastos.get('importeOtros').value) + Number(this.formGastos.get('importeHotel').value)
      + Number(this.formGastos.get('importeDietas').value) + Number(this.formGastos.get('importeOtrosGastos').value);
    }
  }

  calculoImporteCoche(): void {
    let importeCalculado: number;
    let nkm: number = Number(this.formGastos.get('nkilometros').value);
    importeCalculado = nkm * this.precioKilometro;
    this.formGastos.controls['importeCoche'].setValue(importeCalculado);

    this.calculoImporteTotal('coche');
    //console.log(this.formGastos.get('importeCoche'))
  }

  calculoImporteDietas(): void {
    let importeCalculadoDietas: number;
    let numDietas: number = Number(this.formGastos.get('nDietas').value);
    let precioDieta: number = Number(this.formGastos.get('precioDieta').value);
    importeCalculadoDietas = numDietas * precioDieta;
    this.formGastos.controls['importeDietas'].setValue(importeCalculadoDietas);

    this.calculoImporteTotal('dieta');
    //console.log(this.formGastos.get('importeCoche'))
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

  public cancelar(){
    this.router.navigate(['/vista-ordenes/vista-orden-boton']);
  }

}
