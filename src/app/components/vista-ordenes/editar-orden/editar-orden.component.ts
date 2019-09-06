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
import swal from 'sweetalert2';


@Component({
  selector: 'app-editar-orden',
  templateUrl: './editar-orden.component.html',
  styleUrls: ['./editar-orden.component.css']
})
export class EditarOrdenComponent implements OnInit {
  orden : Orden= new Orden();
  gastosGenerales: Gasto[] = new Array<Gasto>();
  gastoViaje: GastoViaje = new GastoViaje();
  formGastos: FormGroup;
  formGastosV: FormGroup;
  formOrden: FormGroup;

  isG: boolean = false;
  isV:boolean = false;
  isIP:boolean = false;
  /*Ojo cambiar ruta para el backend */
  rutaImagen: string = 'http://localhost:8080/api/imagenes/';
  rutaImagen2: string = 'http://localhost:8080/api/imagenesViaje/';
  //rutaImagen: string = URL_BACKEND + '/api/imagenes/';
  //rutaImagen2: string = URL_BACKEND + '/api/imagenesViaje/';

  constructor(  private ordenService: OrdenService,
    private sesionService: SesionService,
    private usuarioService: UsuarioService,
    private gastoService: GastoService,
    private gastoViajeService: GastoViajeService,
    private acreedorService: AcreedorService,
    private proyectoService: ProyectoService,
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
    else
     this.cargarOrden();
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
          }
        );
      }
    })

    console.log(this.orden);
  }

  cargarGastosGenerales(idOrden: number): void{
    this.gastoService.findByIdOrden(idOrden).subscribe(
      (gastos) => this.gastosGenerales = gastos
    )
  }

  cargarGastoViajes(idOrden: number):void{
    this.gastoViajeService.findByIdOrden(idOrden).subscribe(
      (gasto) => this.gastoViaje = gasto
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
}
