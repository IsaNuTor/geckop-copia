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
  relacionVacio:boolean = false;
  observacionesVacio:boolean = false;

  idAuxOrden: number;

  // Ver si el select tiene valor para que aparezca el panel de gastos.
  verSeleccionada: string = '';
  //opcionSeleccionada:string = '0';

  // GASTOS
  titulo: string = "Ordenes";
  rutaImagen: string = 'http://localhost:8080/api/imagenes/';
  gastos: Gasto[];
  gastoViaje: GastoViaje = new GastoViaje();
  formGastos: FormGroup;
  formValid: boolean = true;
  fotoSeleccionada: File;
  crearGastoForm: boolean = true;
  nFacturaVacio:boolean = false;
  descripcionVacio:boolean = false;
  importeVacio:boolean = false;
  idAux: number;
  numeracionAux: number;

  precioKilometro = 0.19;

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
            num_contabilidad: ['', [Validators.maxLength(50)]],
            memoria: ['', [Validators.required, Validators.maxLength(50)]],
            relacion: ['', [Validators.required, Validators.max(100000000)]],
            observaciones: ['', [Validators.required, Validators.max(100000000)]],
          });
          this.formGastos = this.fb.group({
            fechaIda: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
            fechaVuelta: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],

            avion: [ '', [Validators.maxLength(150)]],  //Concepto
            importeAvion: [ '', Validators.required],  //Importe

            // Coche
            nKilometros: [ '', Validators.required],  //nKilometros
            // Preciokilometro es un atributo de la clase, siempre es el mismo.
            importeCoche: [ '', Validators.required],  //Importe

            //tren
            tren: [ '', [Validators.maxLength(150)]],  //Concepto
            importeTren: [ '', Validators.required],  //Importe

            //Autobus
            autobus: [ '', [Validators.maxLength(150)]],  //Concepto
            importeAutobus: [ '', Validators.required],  //Importe

            //Taxi
            taxi: [ '', [Validators.maxLength(150)]],  //Concepto
            importeTaxi: [ '', Validators.required],  //Importe
          });

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
    //console.log(this.verSeleccionada);
  }
}
