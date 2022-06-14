import { Inject, Injectable } from '@angular/core';

import { PerimetroDto } from '../dto/PerimetroDto';
import { IPerimetroService } from './interfaces/IPerimetroService';
import { HttpClient } from '@angular/common/http';
import { IHttpClientProxy } from './interfaces/IHttpClientProxy';
import { IConfiguracaoService } from './interfaces/IConfiguracaoService';
import { ILocalStorageRepository } from '../Repository/interfaces/ILocalStorageRepository';
import {FunctionsProvider } from 'src/providers/functions/functions';

const WEBAPI_PATH_PERIMETER = "/plt_perimetro_v1/perimeters";
const WEBAPI_PATH_PERIMETER_FILTER = "/plt_perimetro_v1/perimeters/filters/items";


@Injectable()
export class PerimetroService implements IPerimetroService {

    constructor(
        public http: HttpClient,
        public vcProvider:FunctionsProvider,
        @Inject('LocalStorageRepositoryToken') private localStorageRepository: ILocalStorageRepository,
        @Inject('HttpClientProxyToken') private httpClientProxy: IHttpClientProxy,
        @Inject('ConfiguracaoServiceToken') private configuracaoService: IConfiguracaoService
    ) { }


    public getById(perimeterId: string): Promise<any> {

        return new Promise((resolve, reject) => {

            this.httpClientProxy.get(this.configuracaoService.webApiUrl(), `${WEBAPI_PATH_PERIMETER}/${perimeterId}`,null)
                .subscribe((response: any) => {
                    if (response) {

                        console.log("---------getById----------------------------",response);
                        resolve(response);
                    }
                    else {
                        resolve(null);
                    }
                }, (error:any) => {
                    console.error("VeiculoService - get - Erro: ", JSON.stringify(error));
                    reject(null);
                });

        });
    }

    public getAll(companyId: string, userId: string): Promise<any> {

        const strJson:any = { "companyId": companyId, "userId": userId};

        return new Promise((resolve, reject) => {

            this.httpClientProxy.get(this.configuracaoService.webApiUrl(), WEBAPI_PATH_PERIMETER_FILTER, strJson)
                .subscribe((response: any) => {
                    if (response) {

                        resolve(response.data);
                    }
                    else {
                        resolve(null);
                    }
                }, (error:any) => {
                    console.error("PerimetroService - get - Erro: ", JSON.stringify(error));
                    reject(null);
                });

        });
    
    }
    
    public save(perimetroDto: PerimetroDto): Promise<PerimetroDto> {

        return new Promise((resolve, reject) => {

            if (perimetroDto.id == "") {
                this.httpClientProxy.post(this.configuracaoService.webApiUrl(), WEBAPI_PATH_PERIMETER, perimetroDto)
                .subscribe((response: any) => {
                    if (response) {

                        resolve(response);
                    }
                    else {
                        resolve(null);
                    }
                }, (error:any) => {
                    console.error("PerimetroService - salvar - Erro: ", JSON.stringify(error));
                    reject(null);
                });
            }
            else {

                this.httpClientProxy.put(this.configuracaoService.webApiUrl(), `${WEBAPI_PATH_PERIMETER}/${perimetroDto.id}`, perimetroDto)
                .subscribe((response: any) => {
                    if (response) {

                        resolve(response);
                    }
                    else {
                        resolve(null);
                    }
                }, (error:any) => {
                    console.error("PerimetroService - salvar - Erro: ", JSON.stringify(error));
                    reject(null);
                });
            }

        });
    }
    
    public delete(perimetroId: string): Promise<PerimetroDto> {

        return new Promise((resolve, reject) => {


                this.httpClientProxy.delete(this.configuracaoService.webApiUrl(), `${WEBAPI_PATH_PERIMETER}/${perimetroId}`)
                .subscribe((response: any) => {
                    if (response) {

                        resolve(response);
                    }
                    else {
                        resolve(null);
                    }
                }, (error:any) => {
                    console.error("PerimetroService - salvar - Erro: ", JSON.stringify(error));
                    reject(null);
                });

        });
    }
}
