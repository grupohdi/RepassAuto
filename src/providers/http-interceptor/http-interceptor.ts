import { HttpErrorResponse, HttpParams, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/do'
import { ILocalStorageRepository } from '../../Repository/interfaces/ILocalStorageRepository';


@Injectable()
export class HttpInterceptorProvider implements HttpInterceptor {

  public user: any;
  public sessionToken: string;

  constructor(@Inject('LocalStorageRepositoryToken') public localStorageRepository: ILocalStorageRepository) {

  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let user = this.localStorageRepository.recuperaConfiguracaoPorChave('user');
    if (user) {
      this.user = JSON.parse(user);
    }
    let sessionToken = this.localStorageRepository.recuperaConfiguracaoPorChave('sessionToken');
    if (sessionToken) {
      this.sessionToken = sessionToken;
    }


    //let headers = new HttpHeaders();
    let headers = request.headers;
    let params = new HttpParams();

    if (!request.url.includes("/sessions")) {

      if (this.sessionToken) {
        headers = headers.append('Authorization', `Bearer ${this.sessionToken}`);
      }

      if (request.url.includes("/filters/items")) {
        params = params.append('limit', '1000');
        params = params.append('page', '1');
      }
    }

    headers = headers.append("content-type", "application/json");
    headers = headers.append("access-control-allow-origin", "*");

    // headers = headers.append('Accept', '*/*');

    // headers = headers.append("vary", "Accept-Encoding");
    // headers = headers.append("x-aspnet-version", "4.0.30319");
    // headers = headers.append("x-aspnetmvc-version", "5.2");
    // headers = headers.append("x-frame-options", "sameorigin");
    // headers = headers.append("server", "cloudflare");
    // headers = headers.append("authority", "veiculos.fipe.org.br");
    // headers = headers.append("Referrer-Policy", "no-referrer, strict-origin-when-cross-origin");

    // headers = headers.append('Access-Control-Allow-Headers', '*');
    // headers = headers.append('Access-Control-Allow-Header', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    // headers = headers.append("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");



    //headers = headers.append('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept');
    //headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');
    //headers = headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');



    //      // headers = headers.append('Server', 'Cowboy');
    //       //headers = headers.append('Connection', 'keep-alive');
    //      //headers = headers.append('"X-Powered-By', 'Express');
    //       //headers = headers.append('Content-Length', '226');
    //       //headers = headers.append('Etag', 'W/\"e2-z/MtBDkFOUrrPcYxv4ps7adQ3qM\"');
    //       //headers = headers.append('Date', 'Mon, 21 Dec 2020 21:41:29 GMT');
    // //      headers = headers.append('', '');
    // //      headers = headers.append('', '');


    // console.log("headers=====================", headers);
    // console.log("params=====================", params);
    // debugger;

    request = request.clone({
      headers: headers,
      params: params
    });
    //console.log('request:',request);
    return this.handleReq(request, next);
  }
  handleReq(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).do(evt => {
      if (evt instanceof HttpResponse) {
      }
    },
      error => {

      });
  }
}