import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let auth = undefined
        if (this.authService.getToken()) {
            auth = `Bearer ${this.authService.getToken()}`
        }
        req = req.clone({
            setHeaders: (auth) ? {
                'Content-Type': 'application/json; charset=utf-8',
                'Accept': 'application/json',
                'Authorization': auth
            } : {
                'Content-Type': 'application/json; charset=utf-8',
                'Accept': 'application/json'
            },
        });

        return next.handle(req);
    }
}