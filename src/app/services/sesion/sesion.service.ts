import { Injectable } from '@angular/core';
import { Usuario} from '../../components/usuario/usuario';
@Injectable({
  providedIn: 'root'
})
export class SesionService {

    public guardarSesion(usuario: Usuario){
      sessionStorage.setItem("isLog", "true"); //OJO SOLO GUARDA STRING NO SE UEDE USAR COMO BOOL
      sessionStorage.setItem("nombre", usuario.nombre);
      sessionStorage.setItem("email", usuario.email);
      sessionStorage.setItem("dni", usuario.dni);
      //localStorage.setItem("nombreCompleto", usuario.getNombreCompleto());
    }

    /*
    public isLogged():boolean{
      return this.isLog;
    }

    public getDni():string{
      return this.usuario.getDni();
    }

    public getEmail():string{
      return this.usuario.getEmail();
    }
    public getNombre():string{
      return this.usuario.getNombre();
    }
    public getNombreCompleto():string{
      return this.usuario.getNombreCompleto();
    }
    */

}
