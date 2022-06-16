import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {tap} from 'rxjs/operators';
import { Router } from '@angular/router';

import { Observable } from "rxjs";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private router: Router) {}


    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      
      var request : HttpRequest<any>
      if(req.headers.get("Authorization")){
        request = req.clone({
          headers: req.headers
            .set("Access-Control-Allow-Origin", "*")
        });
      }else{
        request = req.clone({
          headers: req.headers
            .set("Authorization", "Bearer "+ localStorage.getItem("token"))
            .set("Access-Control-Allow-Origin", "*")
        });
      }
      

      return next.handle(request).pipe( tap(() => {},
        (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status !== 401) {
           return;
          }
          this.router.navigate(['login']);
        }
      }));
    }
}