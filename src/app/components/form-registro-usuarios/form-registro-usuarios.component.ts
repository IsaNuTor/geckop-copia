import { Component} from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-form-registro-usuarios',
  templateUrl: './form-registro-usuarios.component.html',
  styleUrls: ['./form-registro-usuarios.css']
})
export class FormRegistroUsuariosComponent {

  forma: FormGroup;

  constructor() {
    this.forma = new FormGroup({
      nombre: new FormControl('', Validators.required),
      apellidos: new FormControl('', Validators.required),
      correo: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
      password: new FormControl('', Validators.required)
    });
  }

  guardarCambios() {
    console.log(this.forma.value);
    console.log(this.forma);
  }

}
