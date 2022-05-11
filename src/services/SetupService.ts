import { Inject, Injectable } from '@angular/core';

import { ISetupService } from './interfaces/ISetupService';
import { HttpClient } from '@angular/common/http';
import { IHttpClientProxy } from './interfaces/IHttpClientProxy';
import { IConfiguracaoService } from './interfaces/IConfiguracaoService';
import { ILocalStorageRepository } from '../Repository/interfaces/ILocalStorageRepository';
import { ValidacaoCamposProvider } from 'src/providers/validacao-campos/validacao-campos';

const WEBAPI_PATH_SETUP = "/plt_setup_v1/setups";


@Injectable()
export class SetupService implements ISetupService {

    constructor(
        public http: HttpClient,
        public vcProvider: ValidacaoCamposProvider,
        @Inject('LocalStorageRepositoryToken') private localStorageRepository: ILocalStorageRepository,
        @Inject('HttpClientProxyToken') private httpClientProxy: IHttpClientProxy,
        @Inject('ConfiguracaoServiceToken') private configuracaoService: IConfiguracaoService
    ) { }


    save(companyInit: any): Promise<any> {

        return new Promise((resolve, reject) => {

            this.httpClientProxy.get(this.configuracaoService.webApiUrl(), WEBAPI_PATH_SETUP, companyInit)
                .subscribe((response: any) => {
                    if (response) {

                        resolve(response);
                    }
                    else {
                        resolve(null);
                    }
                }, (error:any) => {
                    console.error("SetupService - get - Erro: ", JSON.stringify(error));
                    reject(null);
                });

        });
    }


}
