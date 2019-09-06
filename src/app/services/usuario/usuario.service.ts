import { Injectable } from '@angular/core';
import { Usuario } from './usuario';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {URL} from '../../config/config';
import { variable } from '@angular/compiler/src/output/output_ast';



@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

  urlLogin:string = URL + '/login';
  urlRegistro:string = URL +'/registro';
  urlEndPoint:string = URL + '/usuario';
  urlComprobarPass:string = URL + '/comprobarPass';
  urlSetPass:string = URL + '/setPass';
  urlSetUsuario:string = URL + '/setUsuario';
  urlGetNombre:string = URL + '/getNombre';



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
  public getNombreUsuario(dni: String ):Observable<Usuario>{
    try {
      return this.http.post<Usuario>(this.urlGetNombre, dni, {headers: this.httpHeaders});
   
    } catch (error) {
      alert("Ha habido un error")
    }
    
  }

}
