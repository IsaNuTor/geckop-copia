import { Injectable } from '@angular/core';
import { GastoViaje } from './gasto-viaje';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {URL_BACKEND} from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class GastoViajeService {

  urlGastoViaje:string = URL_BACKEND +'/api/gastosViaje';
  urlGastoViajeUpdate:string = URL_BACKEND + '/api/gastosViaje/update';
  urlGastoImagen:string = URL_BACKEND + '/api/gastosViaje/subirImagen';
  urlGastoByOrden:string = URL_BACKEND + '/api/gastosViaje/byidorden';

  //urlGastoViaje:string = URL_BACKEND + '/api/gastosViaje';
  //urlGastoViajeUpdate:string = URL_BACKEND + '/gastosViaje/update';
  //urlGastoImagen:string = URL_BACKEND + '/api/gastosViaje/subirImagen';
  //urlGastoByOrden:string = URL_BACKEND + '/api/gastos/byidorden';

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

  subirIdOrden(gastoViaje: GastoViaje): Observable<Boolean> {
    return this.http.post<Boolean>(`${this.urlGastoViajeUpdate}`, gastoViaje, {headers: this.httpHeaders});
  }

  // Subir imagen
  subirImagen(archivo: File, id): Observable<GastoViaje> {
    let formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("id", id);
    return this.http.post<GastoViaje>(`${this.urlGastoImagen}`, formData);
  }

  findByIdOrden(id_o: number): Observable<GastoViaje>{
    return this.http.post<GastoViaje>(this.urlGastoByOrden, id_o, {headers: this.httpHeaders});
	}

}
