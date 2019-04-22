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

  urlProyecto:string = 'http://localhost:8080/api/proyecto';
  httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(private http: HttpClient) { }

  // Guarda el proyecto
  public insertarProyecto(proyecto:Proyecto): Observable<Proyecto> {
     return this.http.post<Proyecto>(this.urlProyecto, proyecto, {headers: this.httpHeaders});
  }
  public getProyectos(): Observable<Proyecto[]> {
       return this.http.get<Proyecto[]>(this.urlProyecto);
    }

  public borrarProyecto(proyecto: Proyecto): Observable<Proyecto> {
      return this.http.delete<Proyecto>(`${this.urlProyecto}/${proyecto.acronimo}`, {headers: this.httpHeaders});
    }
}
