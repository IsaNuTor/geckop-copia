export class Usuario {
  dni: string;
  password: string;
  nombre:string;
  apellido1:string;
  apellido2:string;
  email:string;
  tipo: string;


  public getDni(): string{
    return this.dni;
  }
}
