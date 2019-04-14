import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { Proyecto } from '../../../services/proyecto/proyecto';
import { ProyectoService } from '../../../services/proyecto/proyecto.service';
import { UsuarioProyectoService } from '../../../services/usuario-proyecto/usuario-proyecto.service';
import { UsuarioProyecto } from '../../../services/usuario-proyecto/usuario-proyecto';
import { UsuarioService } from '../../../services/usuario/usuario.service';
import { Usuario } from '../../../services/usuario/usuario';
import {SesionService} from '../../../services/sesion/sesion.service';
import { ToastrModule } from 'ngx-toastr';

@Component({
  selector: 'app-form-proyectos',
  templateUrl: './form-proyectos.component.html',
  styleUrls: ['./form-proyectos.component.css']
})
export class FormProyectosComponent implements OnInit {

  proyecto: Proyecto = new Proyecto();
  tituloProyectos:string = "Crear Nuevo Proyecto";

  sesion: SesionService = new SesionService();
  nombreIP1:string = this.sesion.getNombreCompleto();
  usuarios: Usuario[];
  usuarios_anadidos: Usuario[];

  constructor(
               private proyectoService: ProyectoService,
               private usuarioService: UsuarioService,
               private usuarioProyectoService: UsuarioProyectoService,
               private sesionService: SesionService,
               private router: Router,
               private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.usuarioService.getUsuarios().subscribe(
      usuarios => this.usuarios = usuarios
    );
    this.usuarios_anadidos = new Array<Usuario>();
  }

  public anadirInvestigador(usuario: Usuario): void{
    //Podemos hacer que se quite de la otra lista
    this.usuarios_anadidos.push(usuario);
  }

/*  public anadirInvestigadores(): void{
      this.usuarioProyecto.guardarUsuariosProyecto(this.usuarios_anadidos, "AAA");
  }*/


  public crearProyecto(){
    //post proyecto
    this.proyecto.ip1 = this.sesionService.getDni();
    this.proyectoService.insertarProyecto(this.proyecto).subscribe(
        res => {
          if(res != null){
            const ToastrModule = swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                  });

                  ToastrModule.fire({
                    type: 'success',
                    title: 'Guardado '+res.acronimo
                  })
            }
          });
    //post inv-proyecto

    while( this.usuarios_anadidos.length > 0){
          this.usuarioProyectoService.insertarUsuariosProyecto(this.usuarios_anadidos.pop().dni, this.proyecto.acronimo).subscribe();
      }

      alert("Sale del bucle de usuarios");
  }
}
