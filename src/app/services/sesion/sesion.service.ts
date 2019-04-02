import { Injectable } from '@angular/core';
import { Usuario} from '../../components/usuario/usuario';
@Injectable({
  providedIn: 'root'
})
export class SesionService {
  usuario: Usuario;
  isLog: boolean;

  constructor(user: Usuario) {
      this.isLog = true;
      this.usuario = new Usuario();
   }

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


}
