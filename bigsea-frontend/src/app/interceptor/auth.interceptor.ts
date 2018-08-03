import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

export class AuthInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const loggedUser = JSON.parse(localStorage.getItem('bigseaUser'));
    if (loggedUser && loggedUser.email) {
      request = request.clone({
        setHeaders: {
          Authorization: `${loggedUser.email}`
        }
      });

      // console.log(request);
    }

    return next.handle(request);
  }

}
