import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, EmailValidator} from '@angular/forms';
import { SesionService } from '../../services/sesion/sesion.service';
import swal from 'sweetalert2';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { Subscriber } from 'rxjs';
import { Usuario } from 'src/app/services/usuario/usuario';
import { Router, ActivatedRoute } from '@angular/router';
import { Acreedor } from 'src/app/services/acreedor/acreedor';
import { AcreedorService } from 'src/app/services/acreedor/acreedor.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {


  user: Usuario = new Usuario();

  formPerfil: FormGroup;
  ibanUsuario:string = "";
  nombreCompleto: string = "";
  existeIban: boolean = false;

  emailValido:boolean=true;
  ibanValido:boolean=true;
  passIguales:boolean=true;
  passValida:boolean=true;
  passAntigua:boolean=true;
  modificar:boolean = false;
  modifiban:boolean = false;

  pass: string = "";
  passNueva:string = "";


  constructor(private sesionService: SesionService,
              private usuarioService: UsuarioService,
              private acreedorService: AcreedorService,
              private fbPerfil: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute
    ) {

    this.formPerfil = this.fbPerfil.group({
      email: ['', [Validators.email]],
      iban: [''],
      passOriginal: ['', [Validators.minLength(5)]],//, Validators.minLength(5)]],
      passNueva: ['',[Validators.minLength(5)]],
      passNueva2: ['', [Validators.minLength(5)]],
      telefono:[''],
      departamento:[''],
      centro:['']
    });
  }

  ngOnInit() {
    if (!this.sesionService.isLogin())
      this.router.navigate(['/login']);
    else{
      this.rellenaUser();
      this.acreedorService.getAcreedor(this.sesionService.getDni()).subscribe(
        (result) =>{
          if(result != null){
            this.existeIban = true;
            this.ibanUsuario = result.iban;
          }else{
            this.ibanUsuario = "Aun no existe IBAN asignado al usuario";
          }

        }
      );

      this.nombreCompleto = this.sesionService.getNombreCompleto();
    }
  }

  rellenaUser(){
    this.user.nombre = this.sesionService.getNombre();
    this.user.apellido1 = this.sesionService.getApellido1();
    this.user.apellido2 = this.sesionService.getApellido2();
    this.user.dni = this.sesionService.getDni();
    this.user.email = this.sesionService.getEmail();
    this.user.telefono = this.sesionService.getTelefono();
    this.user.departamento = this.sesionService.getDepartamento();
    this.user.centro = this.sesionService.getCentro();
    this.user.password = ""; //OJO REVISAR CON PASS ENCRIPTADAS
  }

  modificarUsuario(){

    //Revisa campos rellenos y los modifica en el usuario
    if(this.formPerfil.value.email != "" ){this.user.email = this.formPerfil.value.email; this.modificar = true}
    if(this.formPerfil.value.telefono != ""){ this.user.telefono = this.formPerfil.value.telefono; this.modificar = true};
    if(this.formPerfil.value.departamento != ""){ this.user.departamento = this.formPerfil.value.departamento; this.modificar = true}
    if(this.formPerfil.value.centro != "" ){ this.user.centro = this.formPerfil.value.centro; this.modificar = true}
    if(this.formPerfil.value.passNueva != "" ){ this.user.password = this.formPerfil.value.passNueva;this.modificar = true}

    if(this.modificar){
      this.usuarioService.setUsuario(this.user).subscribe(
        res =>{
          if(res){
            const ToastrModule = swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 5000
            });

            ToastrModule.fire({
              type: 'success',
              title: 'Guardado correctamente'

            })
            //Vacia los input y resetea los validadores
            this.passValida = true;
            this.passIguales = true;
            this.emailValido = true;
            this.modificar = false;
            this.formPerfil.setValue({email: "", iban: "", telefono: "", departamento: "", centro: "", passOriginal: "", passNueva: "", passNueva2: "" });
            //Actuliza la sesion
            this.sesionService.guardarSesion(this.user);
          }else{
            const ToastrModule = swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 5000
            });

            ToastrModule.fire({
              type: 'error',
              title: 'Fallo al guardar los cambios'

            })
          }
        });
    }
   }


   modificarDatos(): void{
    if(this.formPerfil.value.iban != "" ){ this.ibanUsuario = this.formPerfil.value.iban; this.modifiban = true; ;this.modificar = true}

    if(this.formPerfil.valid){
      //Comprobamos pass
      if(this.formPerfil.value.passNueva != ""){
        if(this.formPerfil.value.passNueva == this.formPerfil.value.passNueva2){
          this.usuarioService.comprobarContrasena(this.sesionService.getDni(), this.formPerfil.value.passOriginal).subscribe(
          result=>{
              if(result){//comprobar contraseña en back this.usuarioService.comprobarPass(this.dni, this.passOriginal)
                //set usuario
                this.modificar = true;
                this.user.password = this.formPerfil.value.passNueva;
                if(this.modifiban)
                  this.modificarIban();
                this.modificarUsuario();
              }else{
                this.passAntigua = false;
              }
          });
        }else{
          this.passIguales = false;
        }
      } else {
        if(this.modifiban)
          this.modificarIban();
        this.modificarUsuario();
      }

    }else{ //Booleanos de validacion

      if(this.formPerfil.get('passNueva').hasError('minlength') ||  this.formPerfil.get('passNueva').hasError('minlength')) this.passValida=false;
      if(this.formPerfil.value.passNueva == this.formPerfil.value.passNueva2){
        this.passIguales=false;
      }
      if (this.formPerfil.get('email').hasError('email') ) this.emailValido = false;
    }

  }

  modificarIban(): void{
    let a  = new Acreedor();
    a.iban = this.formPerfil.value.iban;
    a.nif = this.user.dni;
    a.nombre = this.sesionService.getNombreCompleto();

    if(this.existeIban){
     this.acreedorService.actualizarAcreedor(a).subscribe(
        (ok) => {
          if(ok){
            const ToastrModule = swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 5000
            });

            ToastrModule.fire({
              type: 'success',
              title: 'Guardado correctamente'

            })
            this.existeIban = true;
            this.formPerfil.value.iban = "";
          }else{
            const ToastrModule = swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 5000
            });

            ToastrModule.fire({
              type: 'error',
              title: 'Fallo al guardar los cambios'
            })
          }
      });


    }else{
      this.acreedorService.crearAcreedor(a).subscribe(
        (ok) => {
          if(ok != null){
            const ToastrModule = swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 5000
            });

            ToastrModule.fire({
              type: 'success',
              title: 'Guardado correctamente'

            })
            this.existeIban = true;
            this.formPerfil.value.iban = "";

          }else{
            const ToastrModule = swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 5000
            });

            ToastrModule.fire({
              type: 'error',
              title: 'Fallo al guardar los cambios'
            })
          }
      });
    }
  }

/*
  probarEncriptamiento(){
    this.user.password;
    var encrypted = CryptoJS.AES(
  }
*/

}
