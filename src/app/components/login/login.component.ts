import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../services/usuario/usuario';
import { UsuarioService } from '../../services/usuario/usuario.service';
import {SesionService} from '../../services/sesion/sesion.service';
import { ToastrModule } from 'ngx-toastr';

import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: Usuario = new Usuario();
  constructor(private usuarioService: UsuarioService,
    private sesionService: SesionService,
    private router: Router,
    private activatedRoute: ActivatedRoute
    ){}

  ngOnInit() {
    if (this.sesionService.isLogin())
      this.router.navigate(['/perfil']);
  }

  public login(): void{
    this.usuarioService.login(this.usuario).subscribe(
        res => {
          if(res != null){
            this.sesionService.guardarSesion(res);
            swal.fire({
                        type: 'success',
                        title: 'Bienvenido '+ this.sesionService.getNombre(),
                        /*text: 'Te has logueado correctamente',*/
                        onClose: () => {
                              location.reload();
                            }
                      })
            this.router.navigate(['/home']);
          }else{
            swal.fire({
                      type: 'error',
                      title: 'Oops...',
                      text: 'Algo ha fallado!'
                    })
          }
        }, error => {
          if(error.status == 500) {
            swal.fire('Error Login', 'Usuario o contraseña incorrectas', 'error');
          }
        }
      );
  }
}
