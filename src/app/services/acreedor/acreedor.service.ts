import { Injectable } from '@angular/core';
import { Acreedor } from './acreedor';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {URL_BACKEND} from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class AcreedorService {

  urlEndPoint:string = 'http://localhost:8080/api/acreedores';
  urlSetAcreedor:string = 'http://localhost:8080/api/setAcreedor';
  urlCrearAcreedor:string = 'http://localhost:8080/api/crearAcreedor';

  //urlEndPoint:string = URL_BACKEND + '/api/acreedores';
  httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) {}
  // Nos devuelve los acreedores.
  getAcreedores(): Observable<Acreedor[]> {
     return this.http.get<Acreedor[]>(this.urlEndPoint);
  }

  crearAcreedor(acreedor: Acreedor) : Observable<Acreedor> {
    return this.http.post<Acreedor>(this.urlCrearAcreedor, acreedor, {headers: this.httpHeaders});
  }

  // Devuelve acreedor mediante el nif
  getAcreedor(nif:string): Observable<Acreedor> {
    return this.http.get<Acreedor>(`${this.urlEndPoint}/${nif}`);
  }

  actualizarAcreedor(acreedor: Acreedor): Observable<Boolean> {
    return this.http.post<Boolean>(this.urlSetAcreedor, acreedor, {headers: this.httpHeaders});
  }

  borrarAcreedor(nif: String): Observable<Acreedor> {
    return this.http.delete<Acreedor>(`${this.urlEndPoint}/${nif}`, {headers: this.httpHeaders});
  }
}
