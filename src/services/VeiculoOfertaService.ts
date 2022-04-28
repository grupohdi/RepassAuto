import { Inject, Injectable } from '@angular/core';

import { VeiculoOfertaDto } from '../dto/VeiculoOfertaDto';
import { IVeiculoOfertaService } from './interfaces/IVeiculoOfertaService';
import { HttpClient } from '@angular/common/http';
import { IHttpClientProxy } from './interfaces/IHttpClientProxy';
import { IConfiguracaoService } from './interfaces/IConfiguracaoService';

const WEBAPI_PATH_OFFERS_FILTER = "/plt_veiculo_oferta_v1/vehicles_offers/filters/items";


@Injectable()
export class VeiculoOfertaService implements IVeiculoOfertaService {

    constructor(
        public http: HttpClient,
        @Inject('HttpClientProxyToken') private httpClientProxy: IHttpClientProxy,
        @Inject('ConfiguracaoServiceToken') private configuracaoService: IConfiguracaoService
    ) { }

    getOffers() : Promise<VeiculoOfertaDto[]> {

        let strJson: string = "{}";

        return new Promise((resolve, reject) => {

            this.httpClientProxy.get(this.configuracaoService.webApiUrl(), WEBAPI_PATH_OFFERS_FILTER, strJson)
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
