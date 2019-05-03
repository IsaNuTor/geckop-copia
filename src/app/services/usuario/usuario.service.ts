import { Injectable } from '@angular/core';
import { Usuario } from './usuario';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {URL_BACKEND} from '../../config/config';


@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

  urlLogin:string = 'http://localhost:8080/api/login';
  urlRegistro:string = 'http://localhost:8080/api/registro';
  urlEndPoint:string = 'http://localhost:8080/api/usuario';
  /*urlLogin:string = URL_BACKEND + '/api/login';
  urlRegistro:string = URL_BACKEND + '/api/registro';
  urlEndPoint:string = URL_BACKEND + '/api/usuario';
  */
  httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(private http: HttpClient) { }

  // Nos devuelve el usuario.
  public login(usuario:Usuario): Observable<Usuario> {

     return this.http.post<Usuario>(this.urlLogin, usuario, {headers: this.httpHeaders});

  }
  // Nos devuelve el usuario.
  public registro(usuario:Usuario): Observable<Usuario> {
     return this.http.post<Usuario>(this.urlRegistro, usuario,  {headers: this.httpHeaders});
  }

  // Nos devuelve los usuariso.
  getUsuarios(): Observable<Usuario[]> {
     return this.http.get<Usuario[]>(this.urlEndPoint);
  }

  /*setEmail(nif:string, email:string): Observable<Usuario> {
     return this.http.get<Usuario>(this.urlEndPoint);
  }*/


}
