import { Component, OnInit } from '@angular/core';
import { Usuario } from '../usuario/usuario';
import {UsuarioService} from '../usuario/usuario.service';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
@Component({
  selector: 'app-tabla-usuarios',
  templateUrl: './tabla-usuarios.component.html',
  styleUrls: ['./tabla-usuarios.component.css']
})

export class TablaUsuariosComponent implements OnInit {

  usuarios: Usuario[];
  usuarios_anadidos: Usuario[];

  constructor( usuarioService: UsuarioService) { }

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

  public getListaInvestigadoresAnadidos(): Usuario[]{
      return this.usuarios_anadidos;
  }

}
