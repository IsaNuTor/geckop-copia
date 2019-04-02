export class Usuario {
  dni: string;
  password: string;
  nombre:string;
  apellido1:string;
  apellido2:string;
  email:string;

  
  public getDni():string{
    return this.dni;
  }
  public getEmail():string{
    return this.email;
  }
  public getNombre():string{
    return this.nombre;
  }
  public getNombreCompleto():string{
    return this.nombre + " " + this.apellido1 + " " + this.apellido2;
  }
}
