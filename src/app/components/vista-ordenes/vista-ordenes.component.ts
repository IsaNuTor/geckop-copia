import { Component, OnInit } from '@angular/core';
import { Orden } from '../../services/orden/orden';
import { OrdenService } from '../../services/orden/orden.service';
import swal from 'sweetalert2';
import { Pipe, PipeTransform } from '@angular/core';

@Component({
  selector: 'app-vista-ordenes',
  templateUrl: './vista-ordenes.component.html',
  styleUrls: ['./vista-ordenes.component.css']
})
export class VistaOrdenesComponent implements OnInit {

  ordenes: Orden[];

  constructor(private ordenService: OrdenService) { }

  ngOnInit() {
    this.ordenService.getOrdenes().subscribe(
      ordenes => this.ordenes = ordenes
    );
  }

}
