import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private router: Router
  ) { }

  canActivate(): boolean {
    if (!(sessionStorage.getItem('isClickedAuthor'))) {
      this.router.navigate(['home']);
      return false;
    } else { return true; }
  }
}
