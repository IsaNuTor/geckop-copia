import { Injectable } from '@angular/core';
import { Orden } from './orden';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {URL_BACKEND} from '../../config/config';
import { Usuario } from '../usuario/usuario';
import { Gasto } from '../gasto/gasto';
import { GastoViaje } from '../gasto-viaje/gasto-viaje';

@Injectable({
  providedIn: 'root'
})
export class OrdenService {

  ordenes: Orden[] = new Array<Orden>();

  urlOrden:string = URL_BACKEND + '/api/ordenes';
  urlMisOrdenes:string = URL_BACKEND + '/api/buscarordenesnif';
  urlNumAcronimo:string = URL_BACKEND + '/api/buscarnumacronimo';
  urlOrdenesIP:string = URL_BACKEND + '/api/ordenesdeip';
  urlGetOrdenId:string = URL_BACKEND +'/api/getordenid';
  urlSetOrden: string = URL_BACKEND + '/api/setorden';
  urlgetOrdenPorProyecto:string = URL_BACKEND +'/api/getordenproyecto';
  urlGenerarPDF:  string= URL_BACKEND +'/api/generarPDF';
  urlRellenarIPPDF:  string= URL_BACKEND +'/api/rellenarIPPDF';
  urlRellenarIPPDFV:  string= URL_BACKEND +'/api/rellenarIPPDFV';
  urlRellenarGastoPDF:  string= URL_BACKEND +'/api/rellenarGastosPDF';
  urlRellenarGastoPDFV:  string= URL_BACKEND +'/api/rellenarGastoPDFV';

/* urlOrden:string = URL + '/ordenes';
  urlMisOrdenes:string = URL + '/buscarordenesnif';
  urlNumAcronimo:string = URL + '/buscarnumacronimo';
  urlOrdenesIP:string = URL + '/ordenesdeip';
  urlGetOrdenId:string = URL +'/getordenid';
  urlSetOrden: string = URL + '/setorden';
  urlgetOrdenPorProyecto:string = URL +'/getordenproyecto';
  urlGenerarPDF:  string= URL +'/generarPDF';
  urlRellenarIPPDF:  string= URL +'/rellenarIPPDF';
  urlRellenarIPPDFV:  string= URL +'/rellenarIPPDFV';
  urlRellenarGastoPDF:  string= URL +'/rellenarGastosPDF';
  urlRellenarGastoPDFV:  string= URL +'/rellenarGastoPDFV';
  urlProbar: string = URL + '/probarRuta';
*/

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

  getOrdenID(id: number): Observable<Orden>{
    return this.http.post<Orden>(this.urlGetOrdenId, id, {headers: this.httpHeaders})
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

  setOrden(o: Orden):Observable<Orden>{
    return this.http.post<Orden>(this.urlSetOrden, o, {headers: this.httpHeaders})
  }
  getOrdenPorProyecto(acronimo: string): Observable<Orden[]>{
    return this.http.post<Orden[]>(this.urlgetOrdenPorProyecto, acronimo, {headers: this.httpHeaders})
  }

  generarPDF(o: Orden):Observable<Number>{
    return this.http.post<Number>(this.urlGenerarPDF, o, {headers: this.httpHeaders});
  }
  rellenarDatosIP(ip: Usuario):Observable<Number>{
    return this.http.post<Number>(this.urlRellenarIPPDF, ip, {headers: this.httpHeaders});
  }

  rellenarDatosIPV(ip: Usuario):Observable<Number>{
    return this.http.post<Number>(this.urlRellenarIPPDFV, ip, {headers: this.httpHeaders});
  }

  rellenarGastosPDF(gastos: Gasto[]):Observable<Number>{
    return this.http.post<Number>(this.urlRellenarGastoPDF, gastos, {headers: this.httpHeaders});
  }

  rellenarGastosPDFV(gastos: GastoViaje):Observable<Number>{
    return this.http.post<Number>(this.urlRellenarGastoPDFV, gastos, {headers: this.httpHeaders});
  }

  probarRutas():Observable<Number> {
    return this.http.post<Number>(this.urlProbar,{headers: this.httpHeaders});
  }
  
} 

