import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  perfilUser: FormGroup;

  constructor() {
    this.perfilUser = new FormGroup({
      nombre: new FormControl('', Validators.required),
      nif: new FormControl('', Validators.required),
      correo: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
      iban: new FormControl('', Validators.required)
    });
  }

  modificar() {
    console.log(this.perfilUser.value);
    console.log(this.perfilUser);
  }

  ngOnInit() {
    if (window.localStorage) {
        var nombre = sessionStorage.getItem("nombre");
        if(nombre != null){
          swal.fire({
                      type: 'success',
                      title: 'Hola '+ nombre,
                      text: 'Te has logueado correctamente'
                    })
        }else {
            swal.fire({
                        type: 'error',
                        title: 'Oops...',
                        text: 'No te has logueado aun!'
                      })
      }
    }else{
        swal.fire({
                  type: 'error',
                  title: 'Oops...',
                  text: 'Tu Browser no soporta nuestra App!'
                })
      }
    }

}
