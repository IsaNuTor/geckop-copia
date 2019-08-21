import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import swal from 'sweetalert2';

import { Component, OnInit } from '@angular/core';
import { Proyecto } from 'src/app/services/proyecto/proyecto';
import { ProyectoService } from 'src/app/services/proyecto/proyecto.service';
import { UsuarioProyectoService } from 'src/app/services/usuario-proyecto/usuario-proyecto.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Orden } from 'src/app/services/orden/orden';
import { UsuarioProyecto } from 'src/app/services/usuario-proyecto/usuario-proyecto';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { Usuario } from 'src/app/services/usuario/usuario';



@Component({
  selector: 'app-ver-proyecto',
  templateUrl: './ver-proyecto.component.html',
  styleUrls: ['./ver-proyecto.component.css']
})
export class VerProyectoComponent implements OnInit {


  /*Vista */
  proyecto: Proyecto = new Proyecto();
  ordenesPendientes: Orden;
  investigadoresProyecto: UsuarioProyecto[];
  nombresInvestigadores: String[];//Array<String>;
  usuarioAux: Usuario;
  editarFechaActiva: Boolean = false;
  /*formFecha */
  formFecha: FormGroup;
  fechaAntigua: Date;
  /*Nuevos Usuarios */
  usuarios: Usuario[];
  editarUsuarios: Boolean = false;



  constructor(
    private proyectoService: ProyectoService,
    private usuarioService: UsuarioService,
    private usuariosProyectoService: UsuarioProyectoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public fb: FormBuilder
  ) { 
      this.formFecha = this.fb.group({
        fechaCierre: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]]
      });
    }
              
  ngOnInit() {
    
    this.cargarProyecto();
    this.cargarUsuariosProyecto();
    
  }


  cargarProyecto(): void {
      this.activatedRoute.params.subscribe(params => {
      let acronimo = params['acronimo']

      //this.proyecto = new Proyecto();
      if(acronimo) {
      //alert(acronimo);
      /*this.proyectoService.getProyecto(acronimo).subscribe(
          (proyecto) => this.proyecto = proyecto
        )*/
        this.proyectoService.getProyecto(acronimo).subscribe((proyecto) => this.proyecto = proyecto);
      }
    })
  }

  cargarUsuariosProyecto(): void {

    this.activatedRoute.params.subscribe(params => {
        let acronimo = params['acronimo']

        //this.proyecto = new Proyecto();
        if(acronimo) {
        //alert(acronimo);
        /*this.proyectoService.getProyecto(acronimo).subscribe(
            (proyecto) => this.proyecto = proyecto
          )*/
          this.usuariosProyectoService.getInvestigadoresProyecto(acronimo).subscribe( 
            (listaInvestigadores) =>{
              this.investigadoresProyecto = listaInvestigadores;
              this.cargarNombres();
              
            });
        }
      }) 
  }

  verUsuarios(): void{
    this.cargarUsuariosProyecto();
  }

  getNombre(dni: String): void{
      
      this.usuarioService.getNombreUsuario(dni).subscribe( (result) => {
        this.usuarioAux = result;
        this.nombresInvestigadores.push(result.nombre + " " + result.apellido1 +" "+ result.apellido2);
      });
    
  }

  cargarNombres():void{  
    this.nombresInvestigadores = new Array<String>();  
    for (let user of this.investigadoresProyecto) {
      this.getNombre(user.dni);
      
    }
   //alert(this.nombresInvestigadores);
  }

  editarFecha():void{
    this.editarFechaActiva = !this.editarFechaActiva;
  }

  guardarFecha():void{
    this.editarFechaActiva = !this.editarFechaActiva;
    this.fechaAntigua =  this.formFecha.value.fechaCierre;
    this.proyecto.fechaCierre = this.formFecha.value.fechaCierre;
    this.proyectoService.actualizarProyecto(this.proyecto).subscribe(
        result => {
          if(result != null){
            const ToastrModule = swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 5000
            });

            ToastrModule.fire({
              type: 'success',
              title: 'Guardado '+result.acronimo
            })
          }else{
            const ToastrModule = swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 5000
            });

            ToastrModule.fire({
              type: 'error',
              title: 'Error al cambiar la fecha'
            })
            this.proyecto.fechaCierre = this.fechaAntigua;

          }
            
        }
    );

    
  }

  cargarNuevosUsuarios():void{
    this.editarUsuarios = !this.editarUsuarios;
    this.usuarioService.getUsuarios().subscribe(
      usuarios => {
         this.usuarios = usuarios;
         for (let inv of this.investigadoresProyecto) {
          for (let user of usuarios){
            if(inv.dni == user.dni)
              this.usuarios.splice(this.usuarios.indexOf(user), 1);
              
          }
              
        }
      }
    );
  }

  editarInvestigadores():void{
    
  }
}
