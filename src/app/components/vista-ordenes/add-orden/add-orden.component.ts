import { Component, OnInit } from '@angular/core';
import { Acreedor } from 'src/app/services/acreedor/acreedor';
import { AcreedorService } from 'src/app/services/acreedor/acreedor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-orden',
  templateUrl: './add-orden.component.html',
  styleUrls: ['./add-orden.component.css']
})
export class AddOrdenComponent implements OnInit {

  acreedores: Acreedor[];
  constructor(private acreedorService: AcreedorService,
        private router: Router) { }

  ngOnInit() {
    this.acreedorService.getAcreedores().subscribe(
      acreedores => this.acreedores = acreedores
    );
  }
  public cancelar(){
    this.router.navigate(['vista-ordenes']);
  }

}
