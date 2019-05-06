import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { SesionService } from '../../services/sesion/sesion.service';
import swal from 'sweetalert2';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { Subscriber } from 'rxjs';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {


  formEmail: FormGroup;
  formIban: FormGroup;
  formPass: FormGroup;

  email:string;
  iban:string;
  pass:string;
  passNueva:string;

  nombreUsuario:string = "";
  ibanUsuario:string = "";
  emailUsuario:string = "";

  emailValido:boolean=true;
  ibanValido:boolean=true;
  passIguales:boolean=true;
  passValida:boolean=true;
  passAntigua:boolean=true;


  constructor(private sesionService: SesionService,
              private usuarioService: UsuarioService,
              private fbEmail: FormBuilder,
              private fbIban: FormBuilder,
              private fbPass: FormBuilder
    ) {
  
    this.formEmail = this.fbEmail.group({ 
      email: ['', [Validators.required, Validators.email]],});
    
    this.formIban = this.fbIban.group({
      iban: ['', [Validators.required]]});

    this.formPass = this.fbPass.group({
      passOriginal: ['', [Validators.required]],//, Validators.minLength(5)]],
      passNueva: ['', [Validators.required, Validators.minLength(5)]],
      passNueva2: ['', [Validators.required, Validators.minLength(5)]] });
  }

  public modificarEmail(): void{
    if(this.formEmail.valid){
      this.email = this.formEmail.value.email;
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

  public modificarIban(): void{
    if(this.formIban.valid){
        //cambiar iban usuario service
      /*if(this.acreedorService.hayOrdenesIban() ){
        //this.acreedorService.añadirAcreedor(this.dni, this.iban);
      }else{
        //this.acreedorService.editarAcreedor(this.dni, this.iban);
      }*/
    }else{
      this.ibanValido = false;
    }
    //cambiar iban usuario service
    /*if(this.acreedorService.hayOrdenesIban() ){
       //this.acreedorService.añadirAcreedor(this.dni, this.iban);
    }else{
      //this.acreedorService.editarAcreedor(this.dni, this.iban);
    }*/

  }

  public modificarPass(): void{
    if(this.formPass.valid){
      this.pass = this.formPass.value.passOriginal;
      this.passNueva =this.formPass.value.passNueva;


      this.usuarioService.comprobarContrasena(this.sesionService.getDni(), this.pass).subscribe( 
      result=>{
          if(result){//comprobar contraseña en back this.usuarioService.comprobarPass(this.dni, this.passOriginal)
            this.usuarioService.setPass(this.sesionService.getDni(), this.passNueva).subscribe(
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
                  this.formPass.setValue({passOriginal: "", passNueva: "", passNueva2: "" });
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
            this.passAntigua = false;
          }
      });
    }else{
      this.passValida=false;
      if(this.formPass.value.passNueva == this.formPass.value.passNueva2){
        this.passIguales=false;

      }
    }
  }


  ngOnInit() {
    this.nombreUsuario = this.sesionService.getNombreCompleto();
    this.ibanUsuario = this.sesionService.getIban();
    this.emailUsuario = this.sesionService.getEmail(); 
  }

}
