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

import {URL} from '../../../config/config';



@Component({
  selector: 'app-editar-orden',
  templateUrl: './editar-orden.component.html',
  styleUrls: ['./editar-orden.component.css']
})
export class EditarOrdenComponent implements OnInit {
  acreedores: Acreedor[];
  orden : Orden= new Orden();
  gastosGenerales: Gasto[] = new Array<Gasto>();
  misProyectos: UsuarioProyecto[];
  gastoViaje: GastoViaje = new GastoViaje();
  formGastos: FormGroup;
  formGastosV: FormGroup;
  formOrden: FormGroup;

  checkMP: boolean = false;
  checkME: boolean = false;
  checkPI: boolean = false;

  isG: boolean = false;
  isV:boolean = false;
  isIP:boolean = false;

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
  rutaImagen: string = URL + 'imagenes/';
  rutaImagen2: string = URL + 'imagenesViaje/';
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
        acronimo: ['', [Validators.required, Validators.maxLength(10)]],
        nif_acreedor: ['', [Validators.required, Validators.maxLength(10)]],
        concepto: ['', [Validators.required, Validators.maxLength(50)]],
        num_contabilidad: ['', [Validators.maxLength(50)]],
        memoria: ['', [Validators.required, Validators.maxLength(50)]],
        relacion: ['', [Validators.required, Validators.max(100000000)]],
        observaciones: ['', [Validators.required, Validators.max(100000000)]],
      });
      this.formGastos = this.fb.group({
        nFactura: [ '', Validators.required], //Nº de Factura
        descripcion: [ '', Validators.required],  //Concepto
        importe: [ '', Validators.required],  //Importe
        //imagen: ['', Validators.required] //Imagen
      });

      this.formGastosV = this.fb.group({
        fechaIda: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
        fechaVuelta: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],

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

      });
     }

  ngOnInit() {
    if (!this.sesionService.isLogin())
      this.router.navigate(['/login']);
    else {
      this.cargarOrden();

      // Proyectos de usuarios, cargamos el dni con el que esta login.
      this.dniUsuarioLogin = this.sesionService.getDni();
      this.cargarUsuariosProyecto();
    }
  }

  transportesUtilizadosFuncion(importeAvion:number, importeCoche:number,
    importeTren:number, importeAutobus:number, importeTaxi:number, importeOtros:number) {
      if(importeAvion != 0) this.checkAvion = true;
      if(importeCoche != 0) this.checkAvion = true;
      if(importeTren != 0) this.checkAvion = true;
      if(importeAutobus != 0) this.checkAvion = true;
      if(importeTaxi != 0) this.checkAvion = true;
      if(importeOtros != 0) this.checkAvion = true;
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
           this.isG = this.orden.tipo == 'G';
           this.isV = this.orden.tipo == 'V';
           this.cargarAcreedores();
           this.cargarGastoViajes(orden.id);
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

  getRelacionProyecto(): string{
    let relacion = "";
    for(let r of this.misProyectos){
    if(this.formOrden.value.acronimo == r.acronimo){
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
        this.transportesUtilizadosFuncion(gasto.importeAvion, gasto.importeAutobus,
          gasto.importeTren, gasto.importeTaxi, gasto.importeOtros, gasto.importeCoche);
      }
    );
  }

  cargarAcreedores(): void {
    this.acreedorService.getAcreedoresOrden(this.sesionService.getDni()).subscribe(
      acreedores => {
        this.acreedores = acreedores;
        for(let a of acreedores) {
          if(a.nif == this.orden.nif_acreedor) {
             this.nombreAcreedor = this.sesionService.getNombre();
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
  seleccionarFoto(event, s:string) {}
}
