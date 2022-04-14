import { Inject, Injectable } from '@angular/core';

import { RlUserDto } from '../dto/RlUserDto';
import { IRlUserService } from './interfaces/IRlUserService';
import { HttpClient } from '@angular/common/http';
import { IHttpClientProxy } from './interfaces/IHttpClientProxy';
import { IConfiguracaoService } from './interfaces/IConfiguracaoService';
import { ILocalStorageRepository } from '../Repository/interfaces/ILocalStorageRepository';
import { ValidacaoCamposProvider } from 'src/providers/validacao-campos/validacao-campos';

const WEBAPI_PATH_RLUSER_FILTER = "/plt_rl_user_v1/user/relationships/filters/items";
                                   
@Injectable()
export class RlUserService implements IRlUserService {

    constructor(
        public http: HttpClient,
        public vcProvider: ValidacaoCamposProvider,
        @Inject('LocalStorageRepositoryToken') private localStorageRepository: ILocalStorageRepository,
        @Inject('HttpClientProxyToken') private httpClientProxy: IHttpClientProxy,
        @Inject('ConfiguracaoServiceToken') private configuracaoService: IConfiguracaoService
    ) { }


    getByUser(userId: string): Promise<any> {

        let strJson: string = `{ "userId" : "${userId}"}`;

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


}
