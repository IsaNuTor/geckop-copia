import { Injectable } from '@angular/core';
import { Orden } from './orden';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {URL_BACKEND} from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class OrdenService {

  urlOrden:string = 'http://localhost:8080/api/ordenes';
  //urlGasto:string = URL_BACKEND + '/api/proyecto';
  httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  crearOrden(orden: Orden) : Observable<Orden> {
    return this.http.post<Orden>(`${this.urlOrden}`, orden, {headers: this.httpHeaders});
  }

  getOrdenes(): Observable<Orden[]> {
       return this.http.get<Orden[]>(this.urlOrden);
  }
}
