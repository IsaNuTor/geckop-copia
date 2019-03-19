import { Injectable } from '@angular/core';
import { Acreedor } from './acreedor';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AcreedorService {

  private urlEndPoint:string = 'http://localhost:8080/api/acreedores';

  constructor(private http: HttpClient) { }

  // Nos devuelve los clientes.
  getAcreedores(): Observable<Acreedor[]> {
     return this.http.get<Acreedor[]>(this.urlEndPoint);
  }
}
