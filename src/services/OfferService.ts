import { Inject, Injectable } from '@angular/core';

import { OfferDto } from '../dto/OfferDto';
import { IOfferService } from './interfaces/IOfferService';
import { HttpClient } from '@angular/common/http';
import { IHttpClientProxy } from './interfaces/IHttpClientProxy';
import { IConfiguracaoService } from './interfaces/IConfiguracaoService';

const WEBAPI_PATH_OFFERS_FILTER = "/plt_veiculo_oferta_v1/vehicles_offers/filters/items";


@Injectable()
export class OfferService implements IOfferService {

    constructor(
        public http: HttpClient,
        @Inject('HttpClientProxyToken') private httpClientProxy: IHttpClientProxy,
        @Inject('ConfiguracaoServiceToken') private configuracaoService: IConfiguracaoService
    ) { }

    getOffers() : Promise<OfferDto[]> {

        let json = {};

        return new Promise((resolve, reject) => {

            this.httpClientProxy.post(this.configuracaoService.webApiUrl(), WEBAPI_PATH_OFFERS_FILTER, json)
                .subscribe((response: any) => {
                    if (response.data) {

                        resolve(response.data);
                    }
                    else {
                        resolve(null);
                    }
                }, (error) => {
                    console.error("UserService - logar - Erro: ", JSON.stringify(error));
                    reject(null);
                });

        });
    }


}
