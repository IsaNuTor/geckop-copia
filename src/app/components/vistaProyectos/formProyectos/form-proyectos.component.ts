import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import {FormArray, FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';

import { Proyecto } from '../../../services/proyecto/proyecto';
import { ProyectoService } from '../../../services/proyecto/proyecto.service';
import { UsuarioProyectoService } from '../../../services/usuario-proyecto/usuario-proyecto.service';
import { UsuarioService } from '../../../services/usuario/usuario.service';
import { Usuario } from '../../../services/usuario/usuario';
import { SesionService } from '../../../services/sesion/sesion.service';
import { UsuarioProyecto } from 'src/app/services/usuario-proyecto/usuario-proyecto';

@Component({
  selector: 'app-form-proyectos',
  templateUrl: './form-proyectos.component.html',
  styleUrls: ['./form-proyectos.component.css']
})
export class FormProyectosComponent implements OnInit {

  //inv: UsuarioProyecto =new UsuarioProyecto();
  proyecto: Proyecto = new Proyecto();
  formProyecto: FormGroup;
  tituloProyectos:string = "Crear Nuevo Proyecto";
  formValid: boolean = true;


  nombreIP1:string = "";
  usuarios: Usuario[];
  usuarios_anadidos: Usuario[];
  investigadores: UsuarioProyecto[];
  invForm: FormArray;



  constructor(
      private proyectoService: ProyectoService,
      private usuarioService: UsuarioService,
      private usuarioProyectoService: UsuarioProyectoService,
      private sesionService: SesionService,
      private router: Router,
      private activatedRoute: ActivatedRoute,
      public fb: FormBuilder
   )
   {
      this.formProyecto = this.fb.group({
        fechaInicio: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
        fechaCierre: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
        nombre: ['', [Validators.required, Validators.maxLength(50)]],
        acronimo: ['', [Validators.required, Validators.maxLength(50)]],
        presupuesto: ['', [Validators.required, Validators.max(100000000)]],
        nContabilidad: ['', [Validators.required, Validators.max(100000000)]],
        ip1: ['', [Validators.maxLength(50)]],
        ip2: ['', [Validators.maxLength(50)]],
        investigadores: this.fb.array([''])
      });


      this.invForm = this.formProyecto.get('investigadores') as FormArray;
     //como no me deja inicializar el array a vacio añado un usuario vacio y lo quito al momento
      this.removeInvestigador(0);
    }

  //Crea un subformulario para cada investigador que luego transformaremos en un array de investigadores
  crearInvestigador(dni: string): FormGroup{
    return this.fb.group({
      dni: [ dni, Validators.required], //Dni del investigador
      rol: ['Miembro del proyecto', Validators.required]  //rol del select
    });
  }

  //Rellena algunos campos con el titulo del usuario que hemos añadido
  addInvestigador(dni: string) {
    this.invForm.push(this.crearInvestigador(dni));
  }

  removeInvestigador(index) {
    this.invForm.removeAt(index); //Index en la tabla
  }

  get listaInvestigadores() {
    return this.formProyecto.get('investigadores') as FormArray; // Devuelve los contactos añadidos al form
  }



  saveData() {
    console.log(this.formProyecto.value);
    this.proyecto = this.formProyecto.value;
    console.log(this.proyecto);
  }

  ngOnInit() {
    this.usuarioService.getUsuarios().subscribe(
      usuarios =>{
        this.usuarios = usuarios;
         //quita el usuario logueado de la lista a mostrar
        var user: Usuario =  this.usuarios.find(usuario => usuario.dni === this.sesionService.getDni() )

        this.nombreIP1 = user.nombre;
        this.usuarios.splice(this.usuarios.indexOf (user), 1);
      }

    );
    this.usuarios_anadidos = new Array<Usuario>();
  }

  public anadirInvestigador(usuario: Usuario): void{
    //Podemos hacer que se quite de la otra lista

    this.addInvestigador(usuario.dni);

    this.usuarios.splice(this.usuarios.indexOf(usuario), 1);
    this.usuarios_anadidos.push(usuario);


    this.invForm = this.listaInvestigadores;
    //alert(this.invForm.value);

  }
  public quitarInvestigador(usuario:Usuario): void{
    this.removeInvestigador(this.usuarios_anadidos.indexOf(usuario));

    this.usuarios_anadidos.splice(this.usuarios_anadidos.indexOf(usuario), 1);
    this.usuarios.push(usuario);

    this.invForm = this.listaInvestigadores;
    //alert(this.invForm.value);

  }


  public actualizaRol(){
    this.invForm = this.listaInvestigadores;
  }


  public cancelar(){
    this.router.navigate(['/proyectos']);
  }

  public crearProyecto(){
    //post proyecto


    this.formValid = (this.formProyecto.status == 'VALID') && ( this.proyecto.fechaInicio < this.proyecto.fechaCierre)
    this.proyecto = this.formProyecto.value;
    this.proyecto.ip1 = this.sesionService.getDni();
    this.investigadores = this.listaInvestigadores.value;


    if(this.formValid){
      this.proyectoService.insertarProyecto(this.proyecto).subscribe(
          res => {
            if(res){
              const ToastrModule = swal.mixin({
                      toast: true,
                      position: 'top-end',
                      showConfirmButton: false,
                      timer: 5000
                    });

                    ToastrModule.fire({
                      type: 'success',
                      title: 'Guardado '+res.acronimo
                    })
                    //post inv-proyecto

                var inv = new UsuarioProyecto();
                inv.dni = this.proyecto.ip1,
                inv.acronimo = this.proyecto.acronimo;
                inv.rol = "Miembro del proyecto";

                this.usuarioProyectoService.insertarUsuariosProyecto(inv).subscribe();

                while(this.investigadores.length > 0){
                      var aux = this.investigadores.pop();
                      aux.acronimo = this.proyecto.acronimo;
                      this.usuarioProyectoService.insertarUsuariosProyecto(aux).subscribe();
                  }
                  this.router.navigate(['/proyectos']);

            }else{
              const ToastrModule = swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 5000
              });

              ToastrModule.fire({
                type: 'error',
                title: 'El proyecto ya existe'
              })
            }

          });
    }
  }
}
