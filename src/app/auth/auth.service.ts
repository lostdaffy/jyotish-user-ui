import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from './user';
import { ApiService } from '../service/api.service';
import { LocalStorageService, SessionStorageService } from 'angular-web-storage';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public loggedIn = new BehaviorSubject<Object>(JSON.parse(this.session.get('user')));

  constructor(public httpClientService: ApiService, public local: LocalStorageService, public session: SessionStorageService) {
  }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  checkAuth() {
    if(this.session.get('token')){
      return true;
    }else{
      return false;
    }
  }

  login(user:any) {
    let self = this;
      this.httpClientService.post('auth/user/login', user).subscribe((res: any) => {
        if (res.status) {
          self.setSessionData(res.data.user, res.data.token);
        }
      });
  }
  setSessionData(data:any, token:any) {
    this.httpClientService.authorization = token;
    var d = new Date();
    this.session.set('expire_at', Math.round(d.getTime() / 1000));
    this.session.set('token', token);
    this.session.set('user', JSON.stringify(data));
    this.loggedIn.next(data);
    this.httpClientService.goTo('/home');
  }

  async logout() {
    if (this.session.get('user')) {
      this.httpClientService.get('auth/logout').subscribe((res: any) => { });
      // this.loggedIn.next(null);
      this.session.remove('expire_at');
      this.session.remove('user');
      this.session.remove('token');
      this.session.clear();
      for (var i = 1; i < 99999; i++) {
        window.clearInterval(i);
      }
      
      this.httpClientService.goTo('/login');
    }
  }

}
