import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
/*Clases Propias*/
import {UsuarioProyecto} from './usuario-proyecto';
import {URL} from '../../config/config';

@Injectable({
  providedIn: 'root'
})

export class UsuarioProyectoService {
  usuariosProyecto: UsuarioProyecto[] = new Array<UsuarioProyecto>();
  urlUsuarioProyecto:string = URL + '/usuarioproyecto';
  urlUsuariosProyecto:string = URL + '/buscarusuariosproyecto';
  urlBorrarUsuarioProyecto:string = URL + '/borrarusuarioproyecto';
  urlDniProyecto:string = URL +'/buscarproyectosdni';
  //urlUsuarioProyecto:string = URL_BACKEND + '/api/usuarioproyecto';
  httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(private http: HttpClient) { }

  public insertarUsuariosProyecto(inv: UsuarioProyecto): Observable<UsuarioProyecto>{
    return  this.http.post<UsuarioProyecto>(this.urlUsuarioProyecto, inv, {headers: this.httpHeaders});
  }
  public eliminarUsuariosProyecto(inv: UsuarioProyecto): Observable<UsuarioProyecto>{
    return  this.http.post<UsuarioProyecto>(this.urlBorrarUsuarioProyecto, inv, {headers: this.httpHeaders});
  }

  public getInvestigadoresProyecto(p: String): Observable<UsuarioProyecto[]>{
    return this.http.post<UsuarioProyecto[]>(this.urlUsuariosProyecto, p, {headers: this.httpHeaders})
  }

  public getNombreInvestigador(dni: String ):String{
    return "Hola soy: " + dni;
  }

  // Devuelve la lista con los proyectos del dni para orden
  public getProyectosDni(p: String): Observable<UsuarioProyecto[]>{
    return this.http.post<UsuarioProyecto[]>(this.urlDniProyecto, p, {headers: this.httpHeaders})
  }
}
