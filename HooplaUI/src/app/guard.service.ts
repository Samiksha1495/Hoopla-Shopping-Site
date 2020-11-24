import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/login/user';
import { Router } from '@angular/router';

@Injectable()
export class GuardService implements CanActivate {

  canActivate(route: ActivatedRouteSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    // implement according to your need
    let loggedUser = new User();
    loggedUser.uCredentials.uEmail = sessionStorage.getItem('uEmail');
    if ( loggedUser.uCredentials.uEmail ){
    return true;
    }
    else {
      this.router.navigate(['/login']);
    }
  }
  constructor(public router:Router) { }
}
