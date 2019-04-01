import { Component, OnInit } from '@angular/core';
import { Acreedor } from './acreedor';
import { AcreedorService } from './acreedor.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form-acreedores',
  templateUrl: './form-acreedores.component.html',
  styleUrls: ['./form-acreedores.component.css']
})
export class FormAcreedoresComponent implements OnInit {

  private acreedor: Acreedor = new Acreedor()
  private titulo:string = "Crear Nuevo Acreedor"

  constructor(private acreedorService: AcreedorService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.cargarAcreedor()
  }
  
  cargarAcreedor(): void {
    this.activatedRoute.params.subscribe(params => {
      let nif = params['nif']
      if(nif) {
        this.acreedorService.getAcreedor(nif).subscribe(
          (acreedor) => this.acreedor = acreedor
        )
      }
    })
  }

  public crearAcreedor(): void {
    this.acreedorService.crearAcreedor(this.acreedor).subscribe(
      response => this.router.navigate(['/acreedores'])
    )
  }
}
