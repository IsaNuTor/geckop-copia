import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Usuario } from '../../services/usuario/usuario';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { SesionService } from 'src/app/services/sesion/sesion.service';


@Component({
  selector: 'app-form-registro-usuarios',
  templateUrl: './form-registro-usuarios.component.html',
  styleUrls: ['./form-registro-usuarios.css']
})
export class FormRegistroUsuariosComponent implements OnInit{


  usuario: Usuario = new Usuario();
  formRegistro: FormGroup;
  formValid: boolean = true;

  constructor(private usuarioService: UsuarioService,
          private sesionService: SesionService,
          public fb: FormBuilder,
          private router: Router,
  ){
    this.formRegistro = this.fb.group({
      dni: ['', [Validators.required, Validators.pattern, Validators.minLength(9)]],
      nombre: ['', [Validators.required]],
      apellido1: ['', [Validators.required]],
      apellido2: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      telefono:[''],
      departamento: [''],
      centro:[''],
      tyc:['', Validators.requiredTrue]
    });
  }

  ngOnInit() {
    if (this.sesionService.isLogin())
      this.router.navigate(['/perfil']);
    else
     this.formValid = true;
  }

  public registro(): void{
    //console.log(this.forma.value);
    //console.log(this.forma);
    this.formValid = this.formRegistro.status == 'VALID';
    if(this.formValid){
      this.usuario = this.formRegistro.value;
      this.usuarioService.registro(this.usuario).subscribe(
          res => {
            if(res != null){
              const ToastrModule = swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 2500
              });
              ToastrModule.fire({
                type: 'success',
                title: 'Registrado con éxito'
              })
              this.router.navigate(['/login']);
            }else{
              const ToastrModule = swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 2500
              });
              ToastrModule.fire({
                type: 'error',
                title: 'No se ha podido registrar. El usuario ya existe'
              })

            }

          });
    }

  }

}
