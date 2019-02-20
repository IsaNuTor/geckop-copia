import { Injectable } from '@angular/core';
import {Router, ActivatedRouteSnapshot,
        RouterStateSnapshot, CanActivate} from "@angular/router";

import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private auth: AuthService) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    if(this.auth.isAuthenticated()) {
      return true;
    } else {
      return false;
    }
  } 
}
