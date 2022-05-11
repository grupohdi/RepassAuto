import { Inject, Injectable } from '@angular/core';

import { CompanyDto } from '../dto/CompanyDto';
import { ICompanyService } from './interfaces/ICompanyService';
import { HttpClient } from '@angular/common/http';
import { IHttpClientProxy } from './interfaces/IHttpClientProxy';
import { IConfiguracaoService } from './interfaces/IConfiguracaoService';
import { ILocalStorageRepository } from '../Repository/interfaces/ILocalStorageRepository';
import { ValidacaoCamposProvider } from 'src/providers/validacao-campos/validacao-campos';

const WEBAPI_PATH_COMPANY = "/plt_company_v1/companies";
const WEBAPI_PATH_COMPANY_FILTER = "/plt_company_v1/companies/filters/items";


@Injectable()
export class CompanyService implements ICompanyService {

    constructor(
        public http: HttpClient,
        public vcProvider: ValidacaoCamposProvider,
        @Inject('LocalStorageRepositoryToken') private localStorageRepository: ILocalStorageRepository,
        @Inject('HttpClientProxyToken') private httpClientProxy: IHttpClientProxy,
        @Inject('ConfiguracaoServiceToken') private configuracaoService: IConfiguracaoService
    ) { }


    get(companyId: string): Promise<any> {

        return new Promise((resolve, reject) => {

            this.httpClientProxy.get(this.configuracaoService.webApiUrl(), `${WEBAPI_PATH_COMPANY}/${companyId}`,null)
                .subscribe((response: any) => {
                    if (response) {

                        this.localStorageRepository.adicionaConfiguracao("company", JSON.stringify(response));

                        resolve(true);
                    }
                    else {
                        resolve(null);
                    }
                }, (error:any) => {
                    console.error("CompanyService - get - Erro: ", JSON.stringify(error));
                    reject(null);
                });

        });
    }

    getByCNPJ(cnpj: string): Promise<any> {
    
        let strJson =  `{"cnpj": "${cnpj}" }`;

        return new Promise((resolve, reject) => {

            this.httpClientProxy.get(this.configuracaoService.webApiUrl(), WEBAPI_PATH_COMPANY_FILTER, strJson)
                .subscribe((response: any) => {
                    if (response) {

                        resolve(response.data[0]);
                    }
                    else {
                        resolve(null);
                    }
                }, (error:any) => {
                    console.error("CompanyService - getByCNPJ - Erro: ", JSON.stringify(error));
                    reject(null);
                });

        });
    }
}
