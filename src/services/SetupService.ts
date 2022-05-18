import { Inject, Injectable } from '@angular/core';

import { ISetupService } from './interfaces/ISetupService';
import { HttpClient } from '@angular/common/http';
import { IHttpClientProxy } from './interfaces/IHttpClientProxy';
import { IConfiguracaoService } from './interfaces/IConfiguracaoService';
import { ILocalStorageRepository } from '../Repository/interfaces/ILocalStorageRepository';
import { ValidacaoCamposProvider } from 'src/providers/validacao-campos/validacao-campos';

const WEBAPI_PATH_SETUP = "/plt_setup_v1/setups";
const WEBAPI_PATH_ONBOARDING_COMPANY = "/plt_setup_v1/onboarding/setup/company";

@Injectable()
export class SetupService implements ISetupService {

    constructor(
        public http: HttpClient,
        public vcProvider: ValidacaoCamposProvider,
        @Inject('LocalStorageRepositoryToken') private localStorageRepository: ILocalStorageRepository,
        @Inject('HttpClientProxyToken') private httpClientProxy: IHttpClientProxy,
        @Inject('ConfiguracaoServiceToken') private configuracaoService: IConfiguracaoService
    ) { }

    createCompanyData(companyData: any): Promise<any> {
        return new Promise((resolve, reject) => {

            this.httpClientProxy.post(this.configuracaoService.webApiUrl(), WEBAPI_PATH_ONBOARDING_COMPANY, companyData)
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
