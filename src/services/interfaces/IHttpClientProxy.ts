import { Observable } from 'rxjs/Rx';

export interface IHttpClientProxy {
    get(baseAddress: string, url: string, data:any);
    post(baseAddress: string, url: string, data: any): Observable<Object>;
    put(baseAddress: string, url: string, data: any): Observable<Object>;
    delete(baseAddress: string, url: string) : Observable<Object>;
}