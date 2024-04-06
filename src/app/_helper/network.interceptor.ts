import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiService } from '../service/api.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth/auth.service';


@Injectable()
export class NetworkInterceptor implements HttpInterceptor {

  constructor( private toastrService: ToastrService  , private authService: AuthService, private apiService: ApiService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    request = request.clone({
      headers: request.headers.set('Authorization', 'Bearer ' + this.apiService.authorization)
    });

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          if (event.body) {
            if (event.body.hasOwnProperty('status') && event.body.status == true) {
              if (event.body.hasOwnProperty('message') && event.body.message != null) {
                this.toastrService.success(event.body.message);
              }
            } else {
              if (event.body.hasOwnProperty('message') && event.body.message != null) {
                this.toastrService.error(event.body.message);
              }
            }
          }
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 422) {
          if (error.error.hasOwnProperty('errors')) {
            const errors = error.error.errors;
            for (const e of errors) {
              this.toastrService.error((e.field + ' - ' + e.message));
            }
          }
        } else if (error.status === 401) {
          var url = window.location.pathname.split('/');
          this.authService.logout();
        }
        return throwError(error);
      })
    );
  }

}
