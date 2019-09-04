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

@Component({
  selector: 'app-ver-orden',
  templateUrl: './ver-orden.component.html',
  styleUrls: ['./ver-orden.component.css']
})
export class VerOrdenComponent implements OnInit {

  orden : Orden= new Orden();
  ip: Usuario = new Usuario();
  usuario: Usuario = new Usuario();
  acreedor: Acreedor = new Acreedor();
  gastosGenerales: Gasto[] = new Array<Gasto>();
  firmada: boolean =  false; 
  isG: boolean = false;
  isV:boolean = false;
  isIP:boolean = false;


  constructor(
    private ordenService: OrdenService,
    private sesionService: SesionService,
    private usuarioService: UsuarioService,
    private gastoService: GastoService,
    private acreedorService: AcreedorService,
    private proyectoService: ProyectoService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

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
           this.firmada = this.orden.estado != 'P';
           this.isG = this.orden.tipo == 'G';
           this.isV = this.orden.tipo == 'V';

           if(this.firmada)
            this.cargarDatosIP(this.orden.nif_IP);
           /*Solo para pruebas */
           this.cargarGastosGenerales(1);
           this.cargarAcreedor('05464654K');
           this.comprobarIP(this.orden.acronimo);


           /*Cambiar fuera de pruebas
           this.cargarGastosGenerales(this.orden.id);
           this.cargarAcreedor(this.orden.nif_acreedor);
            */
          } 
        );
      }
    })

   
  }
  cargarDatosIP(dni: string): void{
    this.usuarioService.getNombreUsuario(dni).subscribe(
      (usuario) => this.ip = usuario
    )
  }
  cargarDatosUsuario(dni: string): void{
    this.usuarioService.getNombreUsuario(dni).subscribe(
      (usuario) => this.usuario = usuario
    )
  }


  cargarGastosGenerales(idOrden: number): void{
    this.gastoService.findByIdOrden(idOrden).subscribe(
      (gastos) => this.gastosGenerales = gastos
    )
  }

  cargarAcreedor(nif: string):void{
    this.acreedorService.getAcreedor(nif).subscribe(
      (acreedor) => this.acreedor = acreedor
    )

  }
  aceptarOrden():void{
    this.orden.estado = 'A';
    this.orden.nif_IP = this.sesionService.getDni();
    this.orden.iban = this.acreedor.iban;
    
    this.ordenService.setOrden(this.orden).subscribe(
      (orden) => this.orden = orden
     
    );
    location.reload();
  }
  rechazarOrden():void{
    this.orden.estado = 'R';
    this.orden.nif_IP = this.sesionService.getDni();
    
    this.ordenService.setOrden(this.orden).subscribe(
      (orden) => this.orden = orden
    );
    location.reload();

  }

  comprobarIP(acronimo:string):void{
    this.proyectoService.getProyecto(acronimo).subscribe(
      (proyecto) => this.isIP = proyecto.ip1 == this.sesionService.getDni() || proyecto.ip2 == this.sesionService.getDni()
    );

  }

}
