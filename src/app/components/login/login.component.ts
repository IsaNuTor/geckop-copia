import { Component, OnInit } from '@angular/core';
import { Usuario } from '../usuario/usuario';
import { UsuarioService } from '../usuario/usuario.service';
import {SesionService} from '../../services/sesion/sesion.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private usuario: Usuario = new Usuario();
  constructor(private usuarioService: UsuarioService, private sesionService: SesionService) { }

  ngOnInit() {
  }

  public login(): void{
    this.usuarioService.login(this.usuario).subscribe(
        res => {
          if(res != null){
            /*Se me ocurre usar la clase sesion para implementar metodos que controlen esto de manera mas eficiente */
            //sessionStorage.setItem("nombre", res.nombre);
            this.sesionService.guardarSesion(res);
            alert("Se ha iniciado sesion correctamente");
          }else{
            alert("No se ha iniciado sesion");
          }
        });
  }


}
