import { Injectable } from '@angular/core';
import { Usuario } from './usuario';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

  private urlEndPoint:string = 'http://localhost:8080/api/usuario';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(private http: HttpClient) { }

  // Nos devuelve los clientes.
  public login(usuario:Usuario): Observable<Usuario> {
     return this.http.post<Usuario>(this.urlEndPoint, usuario,  {headers: this.httpHeaders});
  }
}
