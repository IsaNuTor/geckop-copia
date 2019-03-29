import { Component, OnInit } from '@angular/core';
import { Acreedor } from './acreedor';
import { AcreedorService } from './acreedor.service';

@Component({
  selector: 'app-acreedores',
  templateUrl: './acreedores.component.html',
  styleUrls: ['./acreedores.component.css']
})
export class AcreedoresComponent implements OnInit {

  acreedores: Acreedor[];
  constructor(private acreedorService: AcreedorService) { }

  ngOnInit() {
    this.acreedorService.getAcreedores().subscribe(
      acreedores => this.acreedores = acreedores
    );
  }

}
