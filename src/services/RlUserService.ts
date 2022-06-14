import { Inject, Injectable } from '@angular/core';

import { RlUserDto } from '../dto/RlUserDto';
import { IRlUserService } from './interfaces/IRlUserService';
import { HttpClient } from '@angular/common/http';
import { IHttpClientProxy } from './interfaces/IHttpClientProxy';
import { IConfiguracaoService } from './interfaces/IConfiguracaoService';
import { ILocalStorageRepository } from '../Repository/interfaces/ILocalStorageRepository';
import {FunctionsProvider } from 'src/providers/functions/functions';

const WEBAPI_PATH_RLUSER = "/plt_rl_user_v1/user/relationships";
const WEBAPI_PATH_RLUSER_FILTER = "/plt_rl_user_v1/user/relationships/filters/items";
                                   
@Injectable()
export class RlUserService implements IRlUserService {

    constructor(
        public http: HttpClient,
        public vcProvider:FunctionsProvider,
        @Inject('LocalStorageRepositoryToken') private localStorageRepository: ILocalStorageRepository,
        @Inject('HttpClientProxyToken') private httpClientProxy: IHttpClientProxy,
        @Inject('ConfiguracaoServiceToken') private configuracaoService: IConfiguracaoService
    ) { }


    getByUser(userId: string): Promise<any> {

        let strJson: any = { "userId" : userId};

        return new Promise((resolve, reject) => {

            this.httpClientProxy.get(this.configuracaoService.webApiUrl(), WEBAPI_PATH_RLUSER_FILTER,strJson)
                .subscribe((response: any) => {
                    if (response.data) {

                        this.localStorageRepository.adicionaConfiguracao("rlUser", JSON.stringify(response.data[0]));

                        resolve(true);
                    }
                    else {
                        resolve(null);
                    }
                }, (error:any) => {
                    console.error("RlUserService - obter por usuário - Erro: ", JSON.stringify(error));
                    reject(null);
                });

        });
    }

    getByCompany(companyId: string): Promise<any> {

        let strJson: any = { "companyId" : companyId};

        return new Promise((resolve, reject) => {

            this.httpClientProxy.get(this.configuracaoService.webApiUrl(), WEBAPI_PATH_RLUSER_FILTER,strJson)
                .subscribe((response: any) => {
                    if (response.data) {

                        resolve(response.data);
                    }
                    else {
                        resolve(null);
                    }
                }, (error:any) => {
                    console.error("RlUserService - obter por Company- Erro: ", JSON.stringify(error));
                    reject(null);
                });

        });
    }

    create(rlUser: RlUserDto): Promise<any> {

        return new Promise((resolve, reject) => {

            this.httpClientProxy.post(this.configuracaoService.webApiUrl(), WEBAPI_PATH_RLUSER,rlUser)
                .subscribe((response: any) => {
                    if (response.data) {

                        resolve(response.data);
                    }
                    else {
                        resolve(null);
                    }
                }, (error:any) => {
                    console.error("RlUserService - criar Erro: ", JSON.stringify(error));
                    reject(null);
                });

        });
    }

    delete(rlUser: RlUserDto): Promise<any> {

        return new Promise((resolve, reject) => {

            this.httpClientProxy.delete(this.configuracaoService.webApiUrl(), `${WEBAPI_PATH_RLUSER}/${rlUser.id}`)
                .subscribe((response: any) => {
                    if (response.data) {

                        resolve(response.data);
                    }
                    else {
                        resolve(null);
                    }
                }, (error:any) => {
                    console.error("RlUserService - criar Erro: ", JSON.stringify(error));
                    reject(null);
                });

        });
    }


}
