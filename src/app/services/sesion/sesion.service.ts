import { Injectable } from '@angular/core';
import { Usuario} from '../usuario/usuario';
@Injectable({
  providedIn: 'root'
})
export class SesionService {

    public guardarSesion(usuario: Usuario){
      sessionStorage.setItem("isLog", "true"); //OJO SOLO GUARDA STRING NO SE UEDE USAR COMO BOOL
      sessionStorage.setItem("nombre", usuario.nombre);
      sessionStorage.setItem("email", usuario.email);
      sessionStorage.setItem("dni", usuario.dni);
      sessionStorage.setItem("apellido1", usuario.apellido1);
      sessionStorage.setItem("apellido2", usuario.apellido2);
      sessionStorage.setItem("nombreCompleto", usuario.nombre + " " + usuario.apellido1 + " " + usuario.apellido2);
    }

    public cerrarSesion(){
      sessionStorage.removeItem("isLog");
      sessionStorage.removeItem("nombre");
      sessionStorage.removeItem("email");
      sessionStorage.removeItem("dni");
      sessionStorage.removeItem("apellido1");
      sessionStorage.removeItem("apellido2");
      sessionStorage.removeItem("nombreCompleto");
    }

    public isLogin():boolean{
      if( sessionStorage.getItem("isLog") == "true" )
        return true;
      else
        return false;
    }
    public getNombre():string{
      return sessionStorage.getItem("nombre");
    }
/*
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
