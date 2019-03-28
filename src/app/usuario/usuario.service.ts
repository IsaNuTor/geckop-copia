import { Injectable } from '@angular/core';
import { Usuario } from './usuario';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

  private urlEndPoint:string = 'http://localhost:8080/api/usuario';

  constructor(private http: HttpClient) { }

  // Nos devuelve los clientes.
  login(usuario:string, pass:string): Observable<Usuario> {
     return this.http.post<Usuario>(this.urlEndPoint, {
        dni: usuario,
        password: pass
     });
  }
}
