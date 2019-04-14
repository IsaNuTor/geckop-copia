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


@Component({
  selector: 'app-form-proyectos',
  templateUrl: './form-proyectos.component.html',
  styleUrls: ['./form-proyectos.component.css']
})
export class FormProyectosComponent implements OnInit {

  proyecto: Proyecto = new Proyecto();

  tituloProyectos:string = "Crear Nuevo Proyecto";
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
    this.proyectoService.insertarProyecto(this.proyecto).subscribe(
        res => {
          if(res != null)
          alert("proyecto guardado" + res.acronimo);
          else
          alert("proyecto no guardado" + res.acronimo);
        });
    //post inv-proyecto

    while( this.usuarios_anadidos.length > 0){
          this.usuarioProyectoService.insertarUsuariosProyecto(this.usuarios_anadidos.pop().dni, this.proyecto.acronimo).subscribe();
      }

      alert("Sale del bucle de usuarios");
  }
}
