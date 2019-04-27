import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Usuario } from '../../services/usuario/usuario';
import { SesionService } from '../../services/sesion/sesion.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  perfilUser: FormGroup;
  nombreUsuario:string = "";
  ibanUsuario:string = "";
  emailUsuario:string = "";
  cambiarIban:boolean = false;
  cambiarEmail:boolean = false;


  constructor(private sesionService: SesionService) {
    this.perfilUser = new FormGroup({
      nombre: new FormControl('', Validators.required),
      nif: new FormControl('', Validators.required),
      correo: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
      iban: new FormControl('', Validators.required)
    });
  }

  public modificar(): void {
    console.log(this.perfilUser.value);
    console.log(this.perfilUser);
  }

  public modificarIban(): void{
    this.cambiarIban = true;
    
  }

  public modificarEmail(): void{
    this.cambiarEmail = true;
  }
  ngOnInit() {
    this.nombreUsuario = this.sesionService.getNombreCompleto();
    //this.ibanUsuario = this.sesionService.getIban();
    this.emailUsuario = this.sesionService.getEmail();

    //
    /*if (window.localStorage) {
        var nombre = sessionStorage.getItem("nombre");
        if(nombre != null){
          swal.fire({
                      type: 'success',
                      title: 'Hola '+ nombre,
                      text: 'Te has logueado correctamente'
                    })
        }else {
            swal.fire({
                        type: 'error',
                        title: 'Oops...',
                        text: 'No te has logueado aun!'
                      })
      }
    }else{
        swal.fire({
                  type: 'error',
                  title: 'Oops...',
                  text: 'Tu Browser no soporta nuestra App!'
                })
      }*/
    }

}
