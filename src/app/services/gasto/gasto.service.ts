import { Injectable } from '@angular/core';
import { Gasto } from './gasto';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {URL_BACKEND} from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class GastoService {

  urlGasto:string = URL_BACKEND + '/api/gastos';
  urlGastoImagen:string = URL_BACKEND + '/api/gastos/subirImagen';
  urlGastoUpdate:string = URL_BACKEND +'/api/setGasto';
  urlGastoByOrden:string = URL_BACKEND + '/api/gastos/byidorden';
  urlBorrarNull:string = URL_BACKEND + '/api/gastos/borrarnull';


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

  // Subir imagen
  subirImagen(archivo: File, id): Observable<Gasto> {
    let formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("id", id);
    return this.http.post<Gasto>(`${this.urlGastoImagen}`, formData);
  }

  subirIdOrden(gasto: Gasto): Observable<Boolean> {
    return this.http.post<Boolean>(`${this.urlGastoUpdate}`, gasto, {headers: this.httpHeaders});
  }

  findByIdOrden(id_o: number): Observable<Gasto[]>{
    return this.http.post<Gasto[]>(this.urlGastoByOrden, id_o, {headers: this.httpHeaders});
	}

  borrarGastoNull(id_o: number): Observable<Gasto[]>{
    return this.http.post<Gasto[]>(this.urlBorrarNull, id_o, {headers: this.httpHeaders});
	}
}
