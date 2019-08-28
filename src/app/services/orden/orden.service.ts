import { Injectable } from '@angular/core';
import { Orden } from './orden';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdenService {

  ordenes: Orden[] = new Array<Orden>();
  urlOrden:string = 'http://localhost:8080/api/ordenes';
  urlMisOrdenes:string = 'http://localhost:8080/api/buscarordenesnif';
  urlNumAcronimo:string = 'http://localhost:8080/api/buscarnumacronimo';
  urlOrdenesIP:string = 'http://localhost:8080/api/ordenesdeip';
  //urlGasto:string = URL_BACKEND + '/api/proyecto';
  httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  crearOrden(orden: Orden) : Observable<Orden> {
    return this.http.post<Orden>(`${this.urlOrden}`, orden, {headers: this.httpHeaders});
  }

  getOrdenes(): Observable<Orden[]> {
       return this.http.get<Orden[]>(this.urlOrden);
  }

  // Devuelve mis ordenes
  getOrdenesNif(n: String): Observable<Orden[]>{
    return this.http.post<Orden[]>(this.urlMisOrdenes, n, {headers: this.httpHeaders})
  }

  borrarOrden(orden: Orden): Observable<Orden> {
      return this.http.delete<Orden>(`${this.urlOrden}/${orden.id}`, {headers: this.httpHeaders});
    }

  getOrdenesPendientesDeFirmaDeIP(ip: String): Observable<Orden[]>{
    return this.http.post<Orden[]>(this.urlOrdenesIP, ip, {headers: this.httpHeaders})
  }

  // Devuelve la numeracion segun el proyecto, para saber cuantas ordenes se han hecho de ese proyecto.
  getNumAcronimo(a: String): Observable<number>{
    return this.http.post<number>(this.urlNumAcronimo, a, {headers: this.httpHeaders})
  }
}
