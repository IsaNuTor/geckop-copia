import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { Gasto } from '../../../../../services/gasto/gasto';
import { GastoService } from '../../../../../services/gasto/gasto.service';

@Component({
  selector: 'app-form-gastos',
  templateUrl: './form-gastos.component.html'
})
export class FormGastosComponent implements OnInit {

  private gasto: Gasto = new Gasto()

  constructor(private router: Router,
  private activatedRoute: ActivatedRoute,
  private gastoService: GastoService) { }

  ngOnInit() {
  }

  public cancelar(){
    this.router.navigate(['vista-ordenes/add-orden/add-orden.component']);
  }

  public crearGasto(): void {
    //console.log(this.gasto);
    this.gastoService.crearGasto(this.gasto).subscribe(
      gasto =>
      {
        this.router.navigate(['/vista-ordenes/add-orden/add-orden.component'])
        if(gasto != null){
          const ToastrModule = swal.mixin({
                  toast: true,
                  position: 'top-end',
                  showConfirmButton: false,
                  timer: 5000
                });

                ToastrModule.fire({
                  type: 'success',
                  title: 'Guardado gasto',

                })
          }else{
            swal.fire({
                        type: 'error',
                        title: 'Error!',
                        text: 'El gasto no se ha podido crear',
                        onClose: () => {
                              location.reload();
                            }
                      })
          }
      }
    )
  }
}
