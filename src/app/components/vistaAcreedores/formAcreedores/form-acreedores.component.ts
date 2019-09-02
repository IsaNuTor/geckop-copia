import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';

import { Acreedor } from '../../../services/acreedor/acreedor';
import { AcreedorService } from '../../../services/acreedor/acreedor.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2'
import { SesionService } from 'src/app/services/sesion/sesion.service';

@Component({
  selector: 'app-form-acreedores',
  templateUrl: './form-acreedores.component.html',
  styleUrls: ['./form-acreedores.component.css']
})
export class FormAcreedoresComponent implements OnInit {

  acreedor: Acreedor = new Acreedor()
  titulo:string = "Crear Nuevo Acreedor"
  botonCrear:boolean;
  formAcreedores: FormGroup;
  formValid: boolean = true;
  actualizar: boolean = false;
  crear: boolean = true;
  ibanVacio:boolean = false;
  nombreVacio:boolean = false;
  nifVacio:boolean = false;

  constructor(private acreedorService: AcreedorService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private sesionService: SesionService,
    public fb: FormBuilder
  ) {
      this.formAcreedores = this.fb.group({
      nif: ['', [ Validators.pattern, Validators.minLength(9)]],
      nombre: [''],
      iban: ['', [Validators.minLength(20)]],
    });
    }

  ngOnInit() {
    if (!this.sesionService.isLogin())
      this.router.navigate(['/login']);
    else
      this.cargarAcreedor();
  }



  cargarAcreedor(): void {
    this.activatedRoute.params.subscribe(params => {
      let nif = params['nif']
      if(nif) {
        this.botonCrear = true;
        this.formAcreedores.value.nif = this.acreedor.nif; // AÑADIDO PARA QUE CAMBIE EL BOTÓN Y LA ACCIÓN EN EL FORMULARIO
        //console.log(this.botonCrear);
        this.acreedorService.getAcreedor(nif).subscribe(
          (acreedor) => this.acreedor = acreedor
        )
      }
    })
  }

  public crearAcreedor(): void {

    if(this.formAcreedores.valid){
      //si falta algun dato marcamos el fallo y NO creamos el nuevo acreedor
      if(this.formAcreedores.value.nombre == ""){this.nombreVacio = true; this.crear = false;}
      if(this.formAcreedores.value.iban == ""){this.ibanVacio = true; this.crear = false;}
      if(this.formAcreedores.value.nif == ""){this.nifVacio = true; this.crear = false;}
      if(this.crear){
        this.acreedor = this.formAcreedores.value;
        this.acreedorService.crearAcreedor(this.acreedor).subscribe(
          acreedor =>
          {
            if(acreedor != null){
              const ToastrModule = swal.mixin({
                      toast: true,
                      position: 'top-end',
                      showConfirmButton: false,
                      timer: 5000
                    });

                    ToastrModule.fire({
                      type: 'success',
                      title: 'Guardado '+acreedor.nombre,

                    })
                    
              this.router.navigate(['/acreedores'])
              }else{
                swal.fire({
                            type: 'error',
                            title: 'Error!',
                            text: 'El acreedor no se ha podido crear',
                            onClose: () => {
                                  location.reload();
                                }
                          })
              }
        })
      }
    }else{
      this.formValid = false;
    }
  }

  actualizarAcreedor(): void {
    //alert("nombre:" +this.acreedor.nombre +"nif: "+ this.acreedor.nif +"iban"+ this.acreedor.iban)
    if(this.formAcreedores.valid){
      this.formAcreedores.value.nif = this.acreedor.nif;
      //si nombre o iban tienen datos actualizamos nuestro acreedor y activamos la actualizacion
      if(this.formAcreedores.value.nombre != ""){
          this.actualizar = true; 
          this.acreedor.nombre = this.formAcreedores.value.nombre;
      }else{ this.formAcreedores.value.nombre = this.acreedor.nombre  }
      
      if(this.formAcreedores.value.iban != ""){
        this.actualizar = true; 
        this.acreedor.iban = this.formAcreedores.value.iban;
      }else{ this.formAcreedores.value.iban = this.acreedor.iban  }
     
      if(this.actualizar){ 
        this.acreedorService.actualizarAcreedor(this.acreedor).subscribe(
          resultado => {
            if(resultado){
            const ToastrModule = swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 5000
            });

            ToastrModule.fire({
              type: 'success',
              title: 'Guardado con exito',

            })
            
            this.router.navigate(['/acreedores'])
          }else{ 
            const ToastrModule = swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 5000
            });
            swal.fire({
                type: 'error',
                title: 'Error!',
                text: 'El acreedor no se ha podido editar',
                onClose: () => {
                      location.reload();
                    }
            })
          }
        })
      }else{
        this.formValid = false;
        const Toast = swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000
        });
        
        Toast.fire({
          type: 'error',
          title: 'No se ha modificado ningún dato. '
        })
      }
    }else{
      this.formValid = false;
    }
  }

  
  public cancelar(){
    this.router.navigate(['/acreedores']);
  }
}
