import { Inject, Injectable } from '@angular/core';

import { IFipeService } from './interfaces/IFipeService';
import { HttpClient } from '@angular/common/http';
import { IHttpClientProxy } from './interfaces/IHttpClientProxy';
import { IConfiguracaoService } from './interfaces/IConfiguracaoService';
import { ILocalStorageRepository } from '../Repository/interfaces/ILocalStorageRepository';
import {FunctionsProvider } from 'src/providers/functions/functions';

const WEBAPI_PATH_TABELA_REFERENCIA = "/plt_veiculo_v1/fipe/tabelaReferencia";
const WEBAPI_PATH_MARCA = "/plt_veiculo_v1/fipe/marcas";
const WEBAPI_PATH_MODELO = "/plt_veiculo_v1/fipe/modelos";
const WEBAPI_PATH_ANOMODELO = "/plt_veiculo_v1/fipe/anoModelo";
const WEBAPI_PATH_VALOR = "/plt_veiculo_v1/fipe/valor";


@Injectable()
export class FipeService implements IFipeService {

    constructor(
        public http: HttpClient,
        public vcProvider:FunctionsProvider,
        @Inject('LocalStorageRepositoryToken') private localStorageRepository: ILocalStorageRepository,
        @Inject('HttpClientProxyToken') private httpClientProxy: IHttpClientProxy,
        @Inject('ConfiguracaoServiceToken') private configuracaoService: IConfiguracaoService
    ) { }


    obterTabelaReferencia(): Promise<any> {

        return new Promise((resolve, reject) => {

            const json = {};


            this.httpClientProxy.post(this.configuracaoService.webApiUrl(), WEBAPI_PATH_TABELA_REFERENCIA, json)
                .subscribe((response: any) => {
                    if (response) {

                        //console.log("-------------------------------------",response);
                        resolve(response);
                    }
                    else {
                        resolve(null);
                    }
                }, (error: any) => {
                    console.error("FipeService - obterTabelaReferencia - Erro: ", JSON.stringify(error));
                    reject(null);
                });

        });
    }

    obterMarcas(referencia: string, tipo: string): Promise<any> {

        return new Promise((resolve, reject) => {

            const json = {
                "codigoTabelaReferencia": `${referencia}`,
                "codigoTipoVeiculo": `${tipo}`
            };


            this.httpClientProxy.post(this.configuracaoService.webApiUrl(), WEBAPI_PATH_MARCA, json)
                .subscribe((response: any) => {
                    if (response) {

                        //console.log("-------------------------------------",response);
                        resolve(response);
                    }
                    else {
                        resolve(null);
                    }
                }, (error: any) => {
                    console.error("FipeService - obterMarcas - Erro: ", JSON.stringify(error));
                    reject(null);
                });

        });
    }

    obterModelos(referencia: string, tipo: string, marca: string): Promise<any> {

        return new Promise((resolve, reject) => {

            const json = {
                "codigoTabelaReferencia": `${referencia}`,
                "codigoTipoVeiculo": `${tipo}`,
                "codigoMarca": `${marca}`
            }

            this.httpClientProxy.post(this.configuracaoService.webApiUrl(), WEBAPI_PATH_MODELO, json)
                .subscribe((response: any) => {
                    if (response) {

                        //console.log("-------------------------------------",response);
                        resolve(response);
                    }
                    else {
                        resolve(null);
                    }
                }, (error: any) => {
                    console.error("FipeService - obterModelos - Erro: ", JSON.stringify(error));
                    reject(null);
                });

        });
    }


    obterAnoModelo(params: any): Promise<any> {

        return new Promise((resolve, reject) => {
            const json = {
                "codigoTipoVeiculo": params.codigoTipoVeiculo,
                "codigoTabelaReferencia": params.codigoTabelaReferencia,
                "codigoMarca": params.codigoMarca,
                "codigoModelo": params.codigoModelo,
                "ano": params.ano,
                "codigoTipoCombustivel": params.codigoTipoCombustivel,
                "anoModelo": params.anoModelo,
                "modeloCodigoExterno": params.modeloCodigoExterno
            }

            this.httpClientProxy.post(this.configuracaoService.webApiUrl(), WEBAPI_PATH_ANOMODELO, json)
                .subscribe((response: any) => {
                    if (response) {

                        //console.log("-------------------------------------",response);
                        resolve(response);
                    }
                    else {
                        resolve(null);
                    }
                }, (error: any) => {
                    console.error("FipeService - obterAnoModelo - Erro: ", JSON.stringify(error));
                    reject(null);
                });

        });

    }

    obterValor(params: any): Promise<any> {

        return new Promise((resolve, reject) => {

            const json = {
                "codigoTabelaReferencia": params.codigoTabelaReferencia,
                "codigoMarca": params.codigoMarca,
                "codigoModelo": params.codigoModelo,
                "codigoTipoVeiculo": params.codigoTipoVeiculo,
                "anoModelo": params.anoModelo,
                "codigoTipoCombustivel": params.codigoTipoCombustivel,
                "tipoVeiculo": params.tipoVeiculo,
                "modeloCodigoExterno": params.modeloCodigoExterno,
                "tipoConsulta": params.tipoConsulta
            }

            this.httpClientProxy.post(this.configuracaoService.webApiUrl(), WEBAPI_PATH_VALOR, json)
                .subscribe((response: any) => {
                    if (response) {

                        console.log("-------------------------------------",response);
                        resolve(response);
                    }
                    else {
                        resolve(null);
                    }
                }, (error: any) => {
                    console.error("FipeService - obterValor - Erro: ", JSON.stringify(error));
                    reject(null);
                });

        });

    }

}
