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
  urlUsuarioProyecto:string = 'http://localhost:8080/api/usuarioproyecto';
  httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(private http: HttpClient) { }

  public insertarUsuariosProyecto(dni: string, acronimo: string): Observable<UsuarioProyecto>{
    alert(dni + " " + acronimo);
    var usuarioProyecto: UsuarioProyecto = new UsuarioProyecto();
    usuarioProyecto.dni = dni; usuarioProyecto.acronimo = acronimo;
    alert(usuarioProyecto.dni + " " + usuarioProyecto.acronimo);

      return  this.http.post<UsuarioProyecto>(this.urlUsuarioProyecto, usuarioProyecto, {headers: this.httpHeaders});



  }
}
