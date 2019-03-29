import { Component, OnInit } from '@angular/core';
import { Acreedor } from './acreedor';
import { AcreedorService } from './acreedor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-acreedores',
  templateUrl: './form-acreedores.component.html',
  styleUrls: ['./form-acreedores.component.css']
})
export class FormAcreedoresComponent implements OnInit {

  private acreedor: Acreedor = new Acreedor()
  private titulo:string = "Crear Nuevo Acreedor"

  constructor(private acreedorService: AcreedorService, private router: Router) { }

  ngOnInit() {
  }

  public crearAcreedor(): void {
    this.acreedorService.crearAcreedor(this.acreedor).subscribe(
      response => this.router.navigate(['/acreedores'])
    )
  }
}
