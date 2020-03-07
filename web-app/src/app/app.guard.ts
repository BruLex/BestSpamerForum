import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { EnvService } from './env.service';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class AppGuard implements CanActivate, CanActivateChild {
  constructor(
    private evnSrv: EnvService,
    private apiSrv: ApiService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
   return this.checkSID();
  }

  checkSID() {
    if (!!this.evnSrv.getSID()) {
      return this.apiSrv.get('whoami').pipe( map(resp => {
        console.log(resp);
        if (resp.success) {
          this.evnSrv.setUser(resp.data);
          return true;
        }
        this.router.navigate(['/login']);
        this.message();
        return false;
      }));
    }
    this.message();
    this.router.navigate(['/login']);
    return false;
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkSID();
  }

  message() {
    this.snackBar.open('Please authorize',  'Close', {
      duration: 3000,
    });
  }

}
