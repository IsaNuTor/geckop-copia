import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of } from 'rxjs';
/*Clases Propias*/
import {UsuarioProyecto} from './usuario-proyecto';
import {Usuario} from '../usuario/usuario';

@Injectable({
  providedIn: 'root'
})

export class UsuarioProyectoService {
  usuariosProyecto: UsuarioProyecto[] = new Array<UsuarioProyecto>();
  constructor() { }

  public guardarUsuariosProyecto(usuarios: Usuario[], acronimo: string){
    let ok = true;
    /*  while(ok){
        let usuarioProyecto: UsuariosProyecto = new UsuarioProyecto(usuarios.pop(), acronimo);
        this.usuariosProyecto.push(usuarioProyecto);
        //if( this.http.post<UsuarioProyecto>(this.urlProyecto, proyecto, {headers: this.httpHeaders}) != null)
      }*/

      for ( ;usuarios.length > 0; ){
          this.usuariosProyecto.push(new UsuarioProyecto(usuarios.pop().dni, acronimo));//Construye un Array de UsuariosProyecto
      }
      alert(this.usuariosProyecto);

  }
}
