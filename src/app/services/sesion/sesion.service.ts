import { Injectable } from '@angular/core';
import { Usuario} from '../usuario/usuario';
@Injectable({
  providedIn: 'root'
})
export class SesionService {
    user: Usuario = new Usuario();

    public guardarSesion(usuario: Usuario){
      sessionStorage.setItem("isLog", "true"); //OJO SOLO GUARDA STRING NO SE UEDE USAR COMO BOOL
      sessionStorage.setItem("nombre", usuario.nombre);
      sessionStorage.setItem("email", usuario.email);
      sessionStorage.setItem("dni", usuario.dni);
      sessionStorage.setItem("apellido1", usuario.apellido1);
      sessionStorage.setItem("apellido2", usuario.apellido2);
      sessionStorage.setItem("nombreCompleto", usuario.nombre + " " + usuario.apellido1 + " " + usuario.apellido2);
      sessionStorage.setItem("telefono", usuario.telefono);
      sessionStorage.setItem("departamento", usuario.departamento);
      sessionStorage.setItem("centro", usuario.centro);


    
    
    }

    public cerrarSesion(){
      sessionStorage.removeItem("isLog");
      sessionStorage.removeItem("nombre");
      sessionStorage.removeItem("email");
      sessionStorage.removeItem("dni");
      sessionStorage.removeItem("apellido1");
      sessionStorage.removeItem("apellido2");
      sessionStorage.removeItem("nombreCompleto");
      sessionStorage.removeItem("telefono");
      sessionStorage.removeItem("departamento");
      sessionStorage.removeItem("centro");

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

    public getNombreCompleto():string{
      return sessionStorage.getItem("nombre") + " " + sessionStorage.getItem("apellido1") + " " + sessionStorage.getItem("apellido2")  ;
    }
    public getApellido1():string{
      return sessionStorage.getItem("apellido1");
    }
    public getApellido2():string{
      return sessionStorage.getItem("apellido2")  ;
    }
    public getDni():string{
      return sessionStorage.getItem("dni");
    }

    public getEmail():string{
      return sessionStorage.getItem("email");
    }
    
    public getIban():string{
      return sessionStorage.getItem("iban");    
    }
    
    public getTelefono():string{
      return sessionStorage.getItem("telefono");
    }

    public getDepartamento():string{
      return sessionStorage.getItem("departamento");
    }

    public getCentro():string{
      return sessionStorage.getItem("centro");
    }

    public getPassword():string{
      return sessionStorage.getItem("password");
    }
/*
    public getUsuario():Usuario{
      this.user.nombre = this.getNombre();
      this.user.apellido1 = this.getApellido1();
      this.user.apellido2 = this.getApellido2();
      this.user.dni = this.getDni();
      this.user.email = this.getEmail();
      this.user.telefono = this.getTelefono();
      this.user.departamento = this.getDepartamento();
      this.user.centro = this.getCentro();
      return this.user;
    }

*/
    public setIban(iban:string){
      sessionStorage.setItem("iban", iban);
    }
    
/*
    public setTelefono(telefono:string){
      sessionStorage.setItem("telefono", telefono);
    }

    public setDepartamento(departamento:string){
      sessionStorage.setItem("departamento", departamento);
    }

    public setCentro(centro:string){
      sessionStorage.setItem("centro", centro);
    }
*/
}
