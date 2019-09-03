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

@Component({
  selector: 'app-ver-orden',
  templateUrl: './ver-orden.component.html',
  styleUrls: ['./ver-orden.component.css']
})
export class VerOrdenComponent implements OnInit {

  orden : Orden= new Orden();
  ip: Usuario = new Usuario();
  acreedor: Acreedor = new Acreedor();
  gastosGenerales: Gasto[] = new Array<Gasto>();;


  constructor(
    private ordenService: OrdenService,
    private sesionService: SesionService,
    private usuarioService: UsuarioService,
    private gastoService: GastoService,
    private acreedorService: AcreedorService,
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
           this.cargarDatosIP(this.orden.nif_user);
           /*Solo para pruebas */
           this.cargarGastosGenerales(1);
           this.cargarAcreedor('05464654K');


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


}
