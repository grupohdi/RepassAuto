import { Inject, Injectable } from '@angular/core';

import { VeiculoDto } from '../dto/VeiculoDto';
import { IVeiculoService } from './interfaces/IVeiculoService';
import { HttpClient } from '@angular/common/http';
import { IHttpClientProxy } from './interfaces/IHttpClientProxy';
import { IConfiguracaoService } from './interfaces/IConfiguracaoService';
import { ILocalStorageRepository } from '../Repository/interfaces/ILocalStorageRepository';
import { ValidacaoCamposProvider } from 'src/providers/validacao-campos/validacao-campos';

const WEBAPI_PATH_VEHICLE = "/plt_veiculo_v1/vehicles";
const WEBAPI_PATH_VEHICLE_FILTER = "/plt_veiculo_v1/vehicles/filters/items";


@Injectable()
export class VeiculoService implements IVeiculoService {

    constructor(
        public http: HttpClient,
        public vcProvider: ValidacaoCamposProvider,
        @Inject('LocalStorageRepositoryToken') private localStorageRepository: ILocalStorageRepository,
        @Inject('HttpClientProxyToken') private httpClientProxy: IHttpClientProxy,
        @Inject('ConfiguracaoServiceToken') private configuracaoService: IConfiguracaoService
    ) { }


    getById(veiculoId: string): Promise<VeiculoDto> {

        return new Promise((resolve, reject) => {

            this.httpClientProxy.get(this.configuracaoService.webApiUrl(), `${WEBAPI_PATH_VEHICLE}/${veiculoId}`,null)
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

    getMyVehicle(companyId: string, userId: string): Promise<any> {

        const strJson = `{ "companyId": "${companyId}", "userId": "${userId}"}`;

        return new Promise((resolve, reject) => {

            this.httpClientProxy.get(this.configuracaoService.webApiUrl(), WEBAPI_PATH_VEHICLE_FILTER, strJson)
                .subscribe((response: any) => {
                    if (response) {

                        resolve(response.data);
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
    
    save(vehicle: VeiculoDto): Promise<VeiculoDto> {

        return new Promise((resolve, reject) => {

            if (vehicle.id == "") {
                this.httpClientProxy.post(this.configuracaoService.webApiUrl(), WEBAPI_PATH_VEHICLE, vehicle)
                .subscribe((response: any) => {
                    if (response) {

                        resolve(response);
                    }
                    else {
                        resolve(null);
                    }
                }, (error:any) => {
                    console.error("VeiculoService - salvar - Erro: ", JSON.stringify(error));
                    reject(null);
                });
            }
            else {

                this.httpClientProxy.put(this.configuracaoService.webApiUrl(), `${WEBAPI_PATH_VEHICLE}/${vehicle.id}`, vehicle)
                .subscribe((response: any) => {
                    if (response) {

                        resolve(response);
                    }
                    else {
                        resolve(null);
                    }
                }, (error:any) => {
                    console.error("VeiculoService - salvar - Erro: ", JSON.stringify(error));
                    reject(null);
                });
            }

        });
    }
    
}
