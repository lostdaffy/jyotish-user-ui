import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LocalStorageService, SessionStorageService } from 'angular-web-storage';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // public live: BehaviorSubject<{ type: string, data?: any }> = new BehaviorSubject({ type: '' });
  public authorization: any;
  category = new BehaviorSubject([]);
  private projectPath = environment.base;
  public serviceBase: string = this.projectPath + '';
  matchList = new BehaviorSubject([]);
  data: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    public local: LocalStorageService,
    public session: SessionStorageService,
    private toastrService: ToastrService
  ) {}

  get(url :any, httpOptions?:any) {
    return this.http.get(this.serviceBase + url, httpOptions);
  }


  post(url:any, data:any, httpOptions?:any) {
    return this.http.post(this.serviceBase + url, data, httpOptions);
  }


  goTo(page:any) {
    this.router.navigate([page]).then();
  }



  showError(msg:any) {
    this.toastrService.error(msg);
  }
  showSuccess(msg:any) {
    this.toastrService.success(msg);
  }

  showValidation(msg:any) {
    this.toastrService.error(msg);
  }
}
