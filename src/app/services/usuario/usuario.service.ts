import { Injectable } from '@angular/core';
import { Usuario } from './usuario';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {URL_BACKEND} from '../../config/config';
import { variable } from '@angular/compiler/src/output/output_ast';



@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

  urlLogin:string = 'http://localhost:8080/api/login';
  urlRegistro:string = 'http://localhost:8080/api/registro';
  urlEndPoint:string = 'http://localhost:8080/api/usuario';
  urlComprobarPass:string = 'http://localhost:8080/api/comprobarPass';
  urlSetPass:string = 'http://localhost:8080/api/setPass';
  urlSetUsuario:string = 'http://localhost:8080/api/setUsuario';




  /*urlLogin:string = URL_BACKEND + '/api/login';
  urlRegistro:string = URL_BACKEND + '/api/registro';
  urlEndPoint:string = URL_BACKEND + '/api/usuario';
  urlComprobarPass:string = URL_BACKEND + '/api/comprobarPass';
  urlSetPass:string = URL_BACKEND + '/api/setPass';
  urlSetEmail:string = URL_BACKEND + '/api/setEmail';

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
/*
  setEmail(nif:string, email:string): Observable<Boolean> {
    var variables: String[] = [nif, email];
   return this.http.post<Boolean>(this.urlSetEmail, variables, {headers: this.httpHeaders});
  }
  */
/*
  setPass(nif:string, pass:string): Observable<Boolean> {
   var variables: String[] = [nif, pass];
   return this.http.post<Boolean>(this.urlSetPass, variables, {headers: this.httpHeaders});
  }*/

  comprobarContrasena(nif:string, pass:string): Observable<Boolean> {
   var variables: String[] = [nif, pass];
   return this.http.post<Boolean>(this.urlComprobarPass, variables, {headers: this.httpHeaders});
  }


  setUsuario(user: Usuario): Observable<Boolean>{
    return this.http.post<Boolean>(this.urlSetUsuario, user, {headers: this.httpHeaders});
   
  }

}
