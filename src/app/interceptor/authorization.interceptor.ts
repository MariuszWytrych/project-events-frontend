import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpHeaders
} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const jwt = localStorage.getItem('jwt');
    if (jwt !== null) {
      if (!request.url.includes('/register')) {
        request = request.clone({
          setHeaders: {
            Authorization: 'Bearer ' + jwt
          }
        });
      }
    }
    return next.handle(request);
  }
}
