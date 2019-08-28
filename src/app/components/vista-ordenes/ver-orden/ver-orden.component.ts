import { Component, OnInit } from '@angular/core';
import { Orden } from 'src/app/services/orden/orden';
import { OrdenService } from 'src/app/services/orden/orden.service';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ver-orden',
  templateUrl: './ver-orden.component.html',
  styleUrls: ['./ver-orden.component.css']
})
export class VerOrdenComponent implements OnInit {

  orden : Orden= new Orden();


  constructor(
    private ordenService: OrdenService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {

    this.cargarOrden();

  }



  cargarOrden(): void {
    this.activatedRoute.params.subscribe(params => {
    let id = params['id']

    //this.Orden = new Orden();
    if(id!= null) {
      this.ordenService.getOrdenID(id).subscribe((orden) => this.orden = orden);
    }
  })
}
}
