import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
/*Clases Propias*/
import {UsuarioProyecto} from './usuario-proyecto';

@Injectable({
  providedIn: 'root'
})

export class UsuarioProyectoService {
  usuariosProyecto: UsuarioProyecto[] = new Array<UsuarioProyecto>();
  urlUsuarioProyecto:string = 'http://localhost:8080/api/usuarioproyecto';
  //urlUsuarioProyecto:string = URL_BACKEND + '/api/usuarioproyecto';
  httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(private http: HttpClient) { }

  public insertarUsuariosProyecto(inv: UsuarioProyecto): Observable<UsuarioProyecto>{
    return  this.http.post<UsuarioProyecto>(this.urlUsuarioProyecto, inv, {headers: this.httpHeaders});
  }


}
