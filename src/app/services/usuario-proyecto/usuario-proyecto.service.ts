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
  urlUsuarioProyecto:string = 'http://localhost:8080/api/usuariosproyecto';
  httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(private http: HttpClient) { }

  public guardarUsuariosProyecto(usuarios: Usuario[], acronimo: string){
    let ok = true;
    while(ok && usuarios.length > 0){
        let usuarioProyecto: UsuarioProyecto = new UsuarioProyecto(usuarios.pop().dni, acronimo);
        if( this.http.post<UsuarioProyecto>(this.urlUsuarioProyecto, usuarioProyecto, {headers: this.httpHeaders}) == null)
          ok=false;
    }

    alert("Sale del bucle de usuarios");

  }
}
