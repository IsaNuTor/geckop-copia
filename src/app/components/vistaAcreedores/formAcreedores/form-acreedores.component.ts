import { Component, OnInit } from '@angular/core';
import { Acreedor } from '../../../services/acreedor/acreedor';
import { AcreedorService } from '../../../services/acreedor/acreedor.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2'

@Component({
  selector: 'app-form-acreedores',
  templateUrl: './form-acreedores.component.html',
  styleUrls: ['./form-acreedores.component.css']
})
export class FormAcreedoresComponent implements OnInit {

  private acreedor: Acreedor = new Acreedor()
  private titulo:string = "Crear Nuevo Acreedor"
  botonCrear:boolean;

  constructor(private acreedorService: AcreedorService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {

    }

  ngOnInit() {
    this.cargarAcreedor();
  }

  cargarAcreedor(): void {
    this.activatedRoute.params.subscribe(params => {
      let nif = params['nif']
      if(nif) {
        this.botonCrear = true; // AÑADIDO PARA QUE CAMBIE EL BOTÓN Y LA ACCIÓN EN EL FORMULARIO
        //console.log(this.botonCrear);
        this.acreedorService.getAcreedor(nif).subscribe(
          (acreedor) => this.acreedor = acreedor
        )
      }
    })
  }

  public crearAcreedor(): void {
    this.acreedorService.crearAcreedor(this.acreedor).subscribe(
      acreedor =>
      {
        this.router.navigate(['/acreedores'])
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
      }
    )
  }

  actualizarAcreedor(): void {
    this.acreedorService.actualizarAcreedor(this.acreedor).subscribe(
      acreedor => {
        this.router.navigate(['/acreedores'])
        swal.fire('Actualizar acreedor', `Acreedor ${acreedor.nombre} editado con éxito`, 'success')
      }
    )
  }
}
