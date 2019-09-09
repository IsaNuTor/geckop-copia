/*Clases Angular*/
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of } from 'rxjs';

/*Clases Propias*/
import {Proyecto} from './proyecto'
import {URL_BACKEND} from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {

  urlProyecto:string = URL_BACKEND + '/api/proyecto';
  urlActualizarProyecto:string = URL_BACKEND + '/api/actualizarProyecto';
  urlProyectoVista:string = URL_BACKEND + '/api/vistaProyectos/verProyecto';
  urlProyectosUsuario:string = URL_BACKEND +'/api/proyectosUsuario';
  urlBorrarProyecto:string = URL_BACKEND +'/api/borrarProyecto';
  //urlProyecto:string = URL_BACKEND + '/api/proyecto';
  httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(private http: HttpClient) { }

  // Guarda el proyecto
  insertarProyecto(proyecto:Proyecto): Observable<Proyecto> {
     return this.http.post<Proyecto>(this.urlProyecto, proyecto, {headers: this.httpHeaders});
  }
  actualizarProyecto(proyecto:Proyecto): Observable<Proyecto> {
    return this.http.post<Proyecto>(this.urlActualizarProyecto, proyecto, {headers: this.httpHeaders});
  }
  getProyectos(): Observable<Proyecto[]> {
       return this.http.get<Proyecto[]>(this.urlProyecto);
  }

  getProyecto(acronimo:String): Observable<Proyecto> {
       return this.http.get<Proyecto>(`${this.urlProyectoVista}/${acronimo}`);
  }

  borrarProyecto(proyecto: Proyecto): Observable<Boolean> {
      return this.http.post<Boolean>(this.urlBorrarProyecto, proyecto, {headers: this.httpHeaders});
    }

  getProyectosUsuario(dni:String): Observable<Proyecto[]> {
      return this.http.post<Proyecto[]>(this.urlProyectosUsuario, dni, {headers: this.httpHeaders});
   }
}
