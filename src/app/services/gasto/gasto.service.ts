import { Injectable } from '@angular/core';
import { Gasto } from './gasto';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {URL_BACKEND} from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class GastoService {

  urlGasto:string = 'http://localhost:8080/api/gastos';
  //urlGasto:string = URL_BACKEND + '/api/proyecto';
  httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  getGastos(): Observable<Gasto[]> {
    return this.http.get<Gasto[]>(this.urlGasto);
  }

  crearGasto(gasto: Gasto) : Observable<Gasto> {
    return this.http.post<Gasto>(`${this.urlGasto}`, gasto, {headers: this.httpHeaders});
  }

  // Devuelve gasto mediante el id del gasto
  getGasto(id:number): Observable<Gasto> {
    return this.http.get<Gasto>(`${this.urlGasto}/${id}`);
  }

  borrarGasto(id: number): Observable<Gasto> {
    return this.http.delete<Gasto>(`${this.urlGasto}/${id}`, {headers: this.httpHeaders});
  }
}
