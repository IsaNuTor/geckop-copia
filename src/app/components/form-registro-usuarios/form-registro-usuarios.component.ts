import { Component} from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Usuario } from '../../services/usuario/usuario';
import { UsuarioService } from '../../services/usuario/usuario.service';


@Component({
  selector: 'app-form-registro-usuarios',
  templateUrl: './form-registro-usuarios.component.html',
  styleUrls: ['./form-registro-usuarios.css']
})
export class FormRegistroUsuariosComponent {


  private usuario: Usuario = new Usuario();
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

  constructor(private usuarioService: UsuarioService){}

  public registro(): void{
    //console.log(this.forma.value);
    //console.log(this.forma);

    this.usuarioService.registro(this.usuario).subscribe(
        res => {
        //  console.log(res);
          alert(res);
        });

  }

}
