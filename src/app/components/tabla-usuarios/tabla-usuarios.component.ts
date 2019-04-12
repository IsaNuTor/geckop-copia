import { Component, OnInit } from '@angular/core';
import { Usuario } from '../usuario/usuario';
import {UsuarioService} from '../usuario/usuario.service';

@Component({
  selector: 'app-tabla-usuarios',
  templateUrl: './tabla-usuarios.component.html',
  styleUrls: ['./tabla-usuarios.component.css']
})
export class TablaUsuariosComponent implements OnInit {

  usuarios: Usuario[];
  usuarios_anadidos: Usuario[];

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.usuarioService.getUsuarios().subscribe(
      usuarios => this.usuarios = usuarios
    );
  }

  public anadirInvestigador(): void{
    let aux: Usuario = new Usuario();
    aux.nombre = usuario.nombre;
    aux.email = usuario.email;
    aux.apellido1 = usuario.apellido1;
    usuarios_anadidos.push(aux);

  }

}
