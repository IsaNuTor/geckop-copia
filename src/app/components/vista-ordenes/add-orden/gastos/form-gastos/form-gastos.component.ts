import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form-gastos',
  templateUrl: './form-gastos.component.html'
})
export class FormGastosComponent implements OnInit {

  constructor(private router: Router,
  private activatedRoute: ActivatedRoute ) { }

  ngOnInit() {
  }

  public cancelar(){
    this.router.navigate(['vista-ordenes/add-orden/add-orden.component']);
  }
}
