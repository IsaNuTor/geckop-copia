import { Component, OnInit } from '@angular/core';
import { SesionService } from '../../services/sesion/sesion.service';

import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  title:string = 'Geckop'
  isLog:boolean = this.sesionService.isLogin();
  constructor(
    private sesionService: SesionService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  login() {

  }

  salir() {
    this.sesionService.cerrarSesion();
    swal.fire({
                type: 'success',
                title: 'Sesion cerrada!',
                text: 'Has cerrado sesion',
                onClose: () => {
                      location.reload();
                    }
                })
    this.router.navigate(['/login'])

  }

  registrar() {
    console.log('Hola');
  }

  ngOnInit(){
      this.isLog = this.sesionService.isLogin();
  }
}
