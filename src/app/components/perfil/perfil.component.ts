import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, EmailValidator} from '@angular/forms';
import { SesionService } from '../../services/sesion/sesion.service';
import swal from 'sweetalert2';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { Subscriber } from 'rxjs';
import { Usuario } from 'src/app/services/usuario/usuario';

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

  emailValido:boolean=true;
  ibanValido:boolean=true;
  passIguales:boolean=true;
  passValida:boolean=true;
  passAntigua:boolean=true;
  modificar = false;

  pass: string = "";
  passNueva:string = "";


  constructor(private sesionService: SesionService,
              private usuarioService: UsuarioService,
              private fbPerfil: FormBuilder
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
    this.rellenaUser();
    this.ibanUsuario = this.sesionService.getIban();
    this.nombreCompleto = this.sesionService.getNombreCompleto();
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
  }

  modificarUsuario(){

    //Revisa campos rellenos y los modifica en el usuario
    if(this.formPerfil.value.email != "" ){this.user.email = this.formPerfil.value.email; this.modificar = true}
    if(this.formPerfil.value.telefono != ""){ this.user.telefono = this.formPerfil.value.telefono; this.modificar = true};
    if(this.formPerfil.value.departamento != ""){ this.user.departamento = this.formPerfil.value.departamento; this.modificar = true}
    if(this.formPerfil.value.centro != "" ){ this.user.centro = this.formPerfil.value.centro; this.modificar = true}
    //if(this.formPerfil.value.passNueva != "" ){ this.user.password = this.formPerfil.value. passNueva;this.modificar = true}

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
                this.modificarUsuario();
                this.modificarIban();
              }else{
                this.passAntigua = false;
              }
          });
        }else{
          this.passIguales = false;
        }
      } else {
        this.modificarUsuario()
        this.modificarIban();
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

    
  }


}
/*if(this.formEmail.valid){
  this.usuario = this.formEmail.value.email;
  //cambiar email usuario Service
  this.usuarioService.setEmail(this.sesionService.getDni(), this.email).subscribe(
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
        this.formEmail.setValue({email: ""});
        this.emailUsuario = this.email;
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
  this.emailValido = false;
}
  /*
  public modificarEmail(): void{
    if(this.formEmail.valid){
      this.usuar = this.formEmail.value.email;
      //cambiar email usuario Service
      this.usuarioService.setEmail(this.sesionService.getDni(), this.email).subscribe(
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
            this.formEmail.setValue({email: ""});
            this.emailUsuario = this.email;
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
      this.emailValido = false;
    }
   
  }
*//*
 modificarIban(): void{}
  /*
    if(this.formIban.valid){
        //cambiar iban usuario service
      /*¡¡if(this.acreedorService.hayOrdenesIban() ){
        //this.acreedorService.añadirAcreedor(this.dni, this.iban);
      }else{
        //this.acreedorService.editarAcreedor(this.dni, this.iban);
      }
    }else{
      this.ibanValido = false;
    }
    //cambiar iban usuario service
    if(this.acreedorService.hayOrdenesIban() ){
       //this.acreedorService.añadirAcreedor(this.dni, this.iban);
    }else{
      //this.acreedorService.editarAcreedor(this.dni, this.iban);
    }

  

  


 * //setUsuario(){}

*/



