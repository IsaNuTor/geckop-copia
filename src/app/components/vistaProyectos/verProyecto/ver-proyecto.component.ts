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
import { SesionService } from 'src/app/services/sesion/sesion.service';
import { OrdenService } from 'src/app/services/orden/orden.service';



@Component({
  selector: 'app-ver-proyecto',
  templateUrl: './ver-proyecto.component.html',
  styleUrls: ['./ver-proyecto.component.css']
})
export class VerProyectoComponent implements OnInit {


  /*Vista */
  proyecto: Proyecto = new Proyecto();
  ordenes: Orden[];
  investigadoresProyecto: UsuarioProyecto[];
  nombresInvestigadores: String[];//Array<String>;
  usuarioAux: Usuario;
  editarFechaActiva: Boolean = false;
  editarNCActiva: Boolean = false;
  /*form */
  form: FormGroup;
  fechaAntigua: Date;
  NCAntigua: number;
  /*Nuevos Usuarios */
  usuarios: Usuario[];
  editarUsuarios: Boolean = false;
  formInvestigador: FormGroup;
  permitirEdicion: Boolean = false;
  


  constructor(
    private proyectoService: ProyectoService,
    private usuarioService: UsuarioService,
    private usuariosProyectoService: UsuarioProyectoService,
    private ordenService: OrdenService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private sesionService: SesionService,
    public fb: FormBuilder
  ) { 
      this.form = this.fb.group({
        fechaCierre: ['', [Validators.minLength(10), Validators.maxLength(10)]],
        nContabilidad:['', [Validators.minLength(1), Validators.maxLength(20)]]
      });
      this.formInvestigador = this.fb.group({
        rol: ['Miembro del proyecto', Validators.required]  //rol del select
      });
    }
              
  ngOnInit() {
    if (!this.sesionService.isLogin())
      this.router.navigate(['/login']);
    else{
      this.elementos = new Array<number[]>(1);
      this.elementos[0] = new Array<number>();
    
      this.cargarProyecto();
      this.cargarUsuariosProyecto();
      this.cargarOrdenesProyecto();
    }
    
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
        this.proyectoService.getProyecto(acronimo).subscribe((proyecto) => {
          this.proyecto = proyecto;
          this.permitirEdicion = this.proyecto.ip1 == this.sesionService.getDni() || this.proyecto.ip2 == this.sesionService.getDni();
        });
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

  cargarOrdenesProyecto(): void{
    this.activatedRoute.params.subscribe(params => {
      let acronimo = params['acronimo']

      if(acronimo) {
        this.ordenService.getOrdenPorProyecto(acronimo).subscribe( 
          (ordenes) =>{
            this.ordenes = ordenes;
            this.inicializarArrayNElementos( this.elementosPorPagina<this.ordenes.length ? this.elementosPorPagina : this.ordenes.length, 0);
            this.orderByFecha() 
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
  editarNC():void{
    this.editarNCActiva = !this.editarNCActiva;
  }
 

  guardarFecha():void{
    if(this.form.valid){
      this.editarFechaActiva = !this.editarFechaActiva;
      this.fechaAntigua =  this.form.value.fechaCierre;
      this.proyecto.fechaCierre = this.form.value.fechaCierre;
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
        });
    }

    
  }
  guardarNC():void{
    if(this.form.valid){
      this.editarNCActiva = !this.editarNCActiva;
      this.NCAntigua =  this.form.value.nContabilidad;
      this.proyecto.nContabilidad = this.form.value.nContabilidad
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
              title: 'Error al cambiar el Nº de Contabilidad'
            })
            this.proyecto.nContabilidad = this.NCAntigua;

          } 
        });
    }

    
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

  anadirInvestigador(usuario:Usuario):void{
  
    if(this.formInvestigador.valid){
      let inv  = new UsuarioProyecto();
      inv.acronimo = this.proyecto.acronimo;
      inv.dni = usuario.dni;
      inv.rol = this.formInvestigador.value.rol;

      this.usuariosProyectoService.insertarUsuariosProyecto(inv).subscribe();
      this.investigadoresProyecto.push(inv);
      this.nombresInvestigadores.push(usuario.nombre + " " + usuario.apellido1 +" "+ usuario.apellido2);
      this.usuarios.splice(this.usuarios.indexOf(usuario), 1);  

    }
    
  }

  elementosPorPagina: number = 5; //numero MAXIMO de elementos a mostrar por pagina
  paginaActual: number = 0;  
  elementos: number[][]; 

  //Devuelve la siguiente pagina con el array de mostrado actulizado por si es pagina final y hay menos elementos que mostrar
  siguiente(actual:number, longitud:number, a:number):number{
    let ultimaPagina = Math.trunc(longitud/this.elementosPorPagina);
    
    if(longitud%this.elementosPorPagina == 0){
      ultimaPagina--;
      if(actual < ultimaPagina)
        actual++;
    }else{
      if(actual < ultimaPagina)
        actual++;
      if(actual == ultimaPagina)
        this.inicializarArrayNElementos(longitud%this.elementosPorPagina, a)
    }
    return actual;
    
  }
  //Devuelve la anterior pagina con el array de mostrado actulizado por si es pagina final y hay menos elementos que mostrar
  anterior(actual: number, longitud:number, a:number):number{
    let ultimaPagina = Math.trunc(longitud/this.elementosPorPagina);
    
    if(longitud%this.elementosPorPagina ==0)
      ultimaPagina--;

    if(actual == ultimaPagina)
      this.inicializarArrayNElementos(this.elementosPorPagina < longitud ? this.elementosPorPagina : longitud , a)
    
    if(actual >0)
        actual--;
    
    return actual;
  }

  //Marca el array de mostrado con los elementos correspondientes
  inicializarArrayNElementos(n:number, a:number):void{
    this.elementos[a]=new Array<number>();

    for(let i = 0; i< n; i++)
      this.elementos[a].push(i); 
  }

  

  getOrdenPagindoIndex(a:number, actual:number):number{
    return a+actual*this.elementosPorPagina;
  }

  eliminarInvestigador(usuario:UsuarioProyecto):void{
    let i = this.investigadoresProyecto.indexOf(usuario);
    this.investigadoresProyecto.splice(i, 1);
    this.nombresInvestigadores.splice(i, 1);

      this.usuariosProyectoService.eliminarUsuariosProyecto(usuario).subscribe(
        result => {
          if(result){
            const ToastrModule = swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 5000
            });

            ToastrModule.fire({
              type: 'success',
              title: 'Eliminado Correctamente' 
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
              title: 'Error al Eliminar el Usuario'
            })
            location.reload();
            

          } 
        }
      );
    }

    noEditar():void{
      this.editarUsuarios = !this.editarUsuarios;
    }


    borrarProyecto(): void{
     if(this.ordenes.length == 0)
        this.proyectoService.borrarProyecto(this.proyecto).subscribe(
          (result) => {
            if(result ){
              const ToastrModule = swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 5000
              });
  
              ToastrModule.fire({
                type: 'success',
                title: 'Eliminado Correctamente' 
              })
              this.eliminarInvestigadores();
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
                title: 'Error al Eliminar el proyecto'
              })
              
  
            } 
          }
        )
        else{
          const ToastrModule = swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 5000
          });

          ToastrModule.fire({
            type: 'error',
            title: 'El proyecto tiene ordenes emitidas y no se puede eliminar.'
          })
          

        } 
      }



      eliminarProyecto(): void{

        swal.fire({
          title: '¿Estás seguro?',
          text: `¿Seguro que desea eliminar al proyecto ${this.proyecto.acronimo}?`,
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sí, eliminarlo',
          cancelButtonText: 'No, cancelar',
         }).then((result) => {
          this.borrarProyecto();
          });

      }


      eliminarInvestigadores(): void{
        console.log(this.investigadoresProyecto);
        let investigadores = new Array<UsuarioProyecto>();
        
        for(let inv of this.investigadoresProyecto){
          investigadores.push(inv);
        }

        for(let inv of investigadores){
          this.eliminarInvestigador(inv);
        }
      }

      orderByFecha():void{
        this.ordenes.sort(
          function (a, b) {
            if (a.fechaOrden > b.fechaOrden) {
              return 1;
            }
            if (a.fechaOrden < b.fechaOrden) {
              return -1;
            }
            // a must be equal to b
            return 0;
          }
        );
      }

}
