import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AlertService } from '../components/alert/service/alert.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private alertService: AlertService) { }
  // constructor(private accountService: AccountService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {

      // if ([401, 403].includes(err.status) && this.accountService.userValue) {
      //   // auto logout if 401 or 403 response returned from api
      //   this.accountService.logout();
      // }

      const error = err.error?.message || err.statusText;
      this.alertService.error(error);
      console.error("Alert with error: ", err);
      return throwError(error);
    }))
  }
}
