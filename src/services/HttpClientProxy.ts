import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/RX';
import 'rxjs/add/operator/timeout';

import { IHttpClientProxy } from './interfaces/IHttpClientProxy';

@Injectable()
export class HttpClientProxy implements IHttpClientProxy {

    constructor(private http: HttpClient) { }

    public get(baseAddress: string, url: string, data: string) {

        let head: any  = { "headers": {"filters": `${data}`}} ;

        return this.http.get(`${baseAddress}${url}`, head);

    }

    public post(baseAddress: string, url: string, data: any): Observable<Object> {

        return this.http.post(`${baseAddress}${url}`, data);
    }
}
