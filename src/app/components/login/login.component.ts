import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../usuario/usuario';
import { UsuarioService } from '../../usuario/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.usuarioService.login('05464654K', 'pass').subscribe(
        res => {
          console.log(res);
        ///  alert(res);
        }

    );

  }

}
