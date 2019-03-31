import { Component, OnInit } from '@angular/core';
import { Usuario } from '../usuario/usuario';
import { UsuarioService } from '../usuario/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private usuario: Usuario = new Usuario();
  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
  }

  public login(): void{
    this.usuarioService.login(this.usuario).subscribe(
        res => {
        //  console.log(res);
          alert(res);
        });
  }


}
