import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { SesionService } from '../../services/sesion/sesion.service';
import swal from 'sweetalert2';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

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
      passOriginal: ['', [Validators.required]],
      passNueva: ['', [Validators.required]],
      passNueva2: ['', [Validators.required]] });
  }

  public modificarEmail(): void{
    if(this.formEmail.valid){
      this.email = this.formEmail.value.email;
      //cambiar email usuario Service
     // this.usuarioService.setEmail(this.dni, this.email);
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
    this.pass = this.formPass.value;
  


    if(this.formPass.valid){
      if(true){//comprobar contraseña en back this.usuarioService.comprobarPass(this.dni, this.passOriginal)
        //this.usuarioService.setPass(this.dni, this.passNueva)
      }else{
        //Contraseñas no coinciden
        this.passAntigua = false;
      }
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
