/*Clases Angular*/
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of } from 'rxjs';
/*Clases Propias*/
import {Proyecto} from './proyecto'

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {

  private urlProyecto:string = 'http://localhost:8080/api/proyecto';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(private http: HttpClient) { }

  // Guarda el proyecto
  public guardarProyecto(proyecto:Proyecto): Observable<Proyecto> {
     return this.http.post<Proyecto>(this.urlProyecto, proyecto, {headers: this.httpHeaders});

  }
}
