import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { Usuario } from '../../services/usuario/usuario';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import swal from 'sweetalert2';


@Component({
  selector: 'app-form-registro-usuarios',
  templateUrl: './form-registro-usuarios.component.html',
  styleUrls: ['./form-registro-usuarios.css']
})
export class FormRegistroUsuariosComponent implements OnInit{


  private usuario: Usuario = new Usuario();
  formRegistro: FormGroup;
  private formValid: boolean = true;
  //forma: FormGroup;

/*  constructor(private usuarioService: UsuarioService) {
    this.forma = new FormGroup({
      dni: new FormControl('', Validators.required),
      nombre: new FormControl('', Validators.required),
      apellido1: new FormControl('', Validators.required),
      apellido2: new FormControl('', Validators.required),
      correo: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
      password: new FormControl('', Validators.required)
    });
  }*/



  constructor(private usuarioService: UsuarioService,
          public fb: FormBuilder,
          private router: Router,
  ){
    this.formRegistro = this.fb.group({
      dni: ['', [Validators.required, Validators.pattern, Validators.minLength(9), Validators.maxLength(20)]],
      nombre: ['', [Validators.required, Validators.maxLength(20)]],
      apellido1: ['', [Validators.required, Validators.maxLength(20)]],
      apellido2: ['', [Validators.required, Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
    });
  }

  ngOnInit() { 
    this.formValid = true;
  }

  /*Obtendremos la información del usuario después de validarlo todo*/
  saveData() {
    console.log(this.formRegistro.value);
    this.usuario = this.formRegistro.value
    console.log(this.usuario);
  }

  public registro(): void{
    //console.log(this.forma.value);
    //console.log(this.forma);
    this.formValid = this.formRegistro.status == 'VALID'
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
          }
            
        });
    }

  }

}
