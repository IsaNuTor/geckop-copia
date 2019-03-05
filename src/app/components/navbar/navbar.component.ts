import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent {

  constructor() {
  }

  login() {

  }

  salir() {
    // Función para salir, cerrar sesión.
  }

  registrar() {
    console.log('Hola');
  }

}
