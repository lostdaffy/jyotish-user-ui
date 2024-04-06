import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map, take } from 'rxjs/operators';
import { ApiService } from '../service/api.service';
import { LocalStorageService, SessionStorageService } from 'angular-web-storage';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public httpClientService: ApiService,
    public local: LocalStorageService,
    public session: SessionStorageService
  ) {
  }

  getProfile(userOldData) {
    var self = this;
    var url = window.location.pathname.split('/');
    this.httpClientService.get("auth/me").subscribe((res: any) => {
      console.log(res); 
        if (!res.status) {
          self.authService.logout();
        } else {
          var userData = res.data.user;
          self.router.navigate(['/home']);
        }
      

    });
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let self = this;

    return this.authService.isLoggedIn
      .pipe(take(1))
      .pipe(map((isLoggedIn: object) => {
        var self = this;
        setTimeout(() => {
          var url = window.location.pathname.split('/');
          var urlArray = ['login', 'register', 'forgot-password', 'otp','home'];
          var isNotAuthUrl = urlArray.indexOf(url[1]);

          if (isLoggedIn && isNotAuthUrl > -1) {
            self.router.navigate(['home']);
            self.getProfile(JSON.parse(self.session.get("user")));

          } else if (isLoggedIn == null && isNotAuthUrl == -1) {
            self.router.navigate(['login']);
          }
          
          return true;
        }, 10);
        return true;
      }));
  }

}
