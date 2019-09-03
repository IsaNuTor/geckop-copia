import { Injectable } from '@angular/core';
import { GastoViaje } from './gasto-viaje';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {URL_BACKEND} from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class GastoViajeService {

  urlGastoViaje:string = 'http://localhost:8080/api/gastosViaje';

  //urlGastoViaje:string = URL_BACKEND + '/api/gastosViaje';
  httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  getGastosViaje(): Observable<GastoViaje[]> {
    return this.http.get<GastoViaje[]>(this.urlGastoViaje);
  }

  crearGasto(gastoViaje: GastoViaje) : Observable<GastoViaje> {
    return this.http.post<GastoViaje>(`${this.urlGastoViaje}`, gastoViaje, {headers: this.httpHeaders});
  }

  // Devuelve gasto mediante el id del gasto
  getGasto(id:number): Observable<GastoViaje> {
    return this.http.get<GastoViaje>(`${this.urlGastoViaje}/${id}`);
  }

}
