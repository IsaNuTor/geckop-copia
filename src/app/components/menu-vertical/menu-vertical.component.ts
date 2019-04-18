import { Component, OnInit } from '@angular/core';
import { SesionService } from '../../services/sesion/sesion.service';

@Component({
  selector: 'app-menu-vertical',
  templateUrl: './menu-vertical.component.html',
  styleUrls: ['./menu-vertical.component.css']
})
export class MenuVerticalComponent implements OnInit {

  isLog:boolean = this.sesionService.isLogin();
  constructor(private sesionService: SesionService) {
      }

  ngOnInit() {
    this.isLog = this.sesionService.isLogin();
  }

}
