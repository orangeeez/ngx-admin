import { Injectable } from '@angular/core';

import { HttpRequest, HttpInterceptor, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NbAuthService, NbAuthToken } from '@nebular/auth';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private authService: NbAuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.getToken().pipe(
      switchMap((token: NbAuthToken) => {
        const JWT = `Bearer ${token.getValue()}`;
        req = req.clone({
          setHeaders: {
            Authorization: JWT,
          },
        });
        return next.handle(req);
      }),
    );
  }
}