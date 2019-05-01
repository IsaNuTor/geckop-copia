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
    this.email = this.formEmail.value;
   // this.usuarioService.setEmail(this.email);
    
  }

  public modificarIban(): void{
  }

  public modificarPass(): void{
  }


  ngOnInit() {
    this.nombreUsuario = this.sesionService.getNombreCompleto();
    this.ibanUsuario = this.sesionService.getIban();
    this.emailUsuario = this.sesionService.getEmail(); 
  }

}
