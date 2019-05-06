import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';

import { Proyecto } from '../../../services/proyecto/proyecto';
import { ProyectoService } from '../../../services/proyecto/proyecto.service';
import { UsuarioProyectoService } from '../../../services/usuario-proyecto/usuario-proyecto.service';
import { UsuarioService } from '../../../services/usuario/usuario.service';
import { Usuario } from '../../../services/usuario/usuario';
import { SesionService } from '../../../services/sesion/sesion.service';

@Component({
  selector: 'app-form-proyectos',
  templateUrl: './form-proyectos.component.html',
  styleUrls: ['./form-proyectos.component.css']
})
export class FormProyectosComponent implements OnInit {

  proyecto: Proyecto = new Proyecto();
  formProyecto: FormGroup;
  tituloProyectos:string = "Crear Nuevo Proyecto";
  formValid: boolean = true;

  nombreIP1:string = "";
  usuarios: Usuario[];
  usuarios_anadidos: Usuario[];
  


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
        //nContabilidad: ['', [Validators.required, Validators.max(100000000)]],
        nContabilidad: ['', [Validators.required, Validators.max(100000000)]],
        ip1: ['', [Validators.maxLength(50)]],
        ip2: ['', [Validators.maxLength(50)]]
      });
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

    this.usuarios.splice(this.usuarios.indexOf(usuario), 1);
    this.usuarios_anadidos.push(usuario);
  }
  public quitarInvestigador(usuario: Usuario): void{
    this.usuarios_anadidos.splice(this.usuarios_anadidos.indexOf(usuario), 1);
    this.usuarios.push(usuario);
  }

  public cancelar(){
    this.router.navigate(['/proyectos']);
  }

  public crearProyecto(){
    //post proyecto
    this.proyecto.ip1 = this.sesionService.getDni();

    this.formValid = (this.formProyecto.status == 'VALID') && ( this.proyecto.fechaInicio < this.proyecto.fechaCierre) 
    this.proyecto = this.formProyecto.value;

   

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
                this.usuarioProyectoService.insertarUsuariosProyecto(this.proyecto.ip1, this.proyecto.acronimo).subscribe();
                while( this.usuarios_anadidos.length > 0){
                      this.usuarioProyectoService.insertarUsuariosProyecto(this.usuarios_anadidos.pop().dni, this.proyecto.acronimo).subscribe();
                  }
                  this.router.navigate(['/proyectos']);
                    location.reload();  
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
