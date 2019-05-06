import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Gasto } from '../../../../../services/gasto/gasto';
import { GastoService } from '../../../../../services/gasto/gasto.service';

@Component({
  selector: 'app-ver-gasto',
  templateUrl: './ver-gasto.component.html',
})
export class VerGastoComponent implements OnInit {

  private gasto: Gasto = new Gasto()

  constructor(private router: Router,
  private activatedRoute: ActivatedRoute,
  private gastoService: GastoService) { }

  ngOnInit() {
    this.cargarGasto();
  }

  cargarGasto(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if(id) {
        //console.log(this.botonCrear);
        this.gastoService.getGasto(id).subscribe(
          (gasto) => this.gasto = gasto
        )
      }
    })
  }

  public cancelar(){
    this.router.navigate(['vista-ordenes/add-orden/add-orden.component']);
  }

}
