import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as CryptoJS from 'crypto-js';


@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor() { }

  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


    var headers = new HttpHeaders({
      "content-type": "application/json"
  });
  var key = sessionStorage.getItem('key') || "";
  var shared_secret = sessionStorage.getItem('shared_secret') || "";
  var cadena = "[{key:"+key+",X-Route:"+req.url+"}]";
  let hash = CryptoJS.HmacSHA256(cadena, shared_secret).toString(CryptoJS.enc.Hex);       

  headers = headers.set("X-Key",key);
  headers = headers.set("X-Route", "/"+req.url || "");
  headers = headers.set("X-Signature", hash || "");


    const reqClone = req.clone({headers});

    return next.handle(reqClone);
  }

  
}
