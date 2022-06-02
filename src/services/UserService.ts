import { Inject, Injectable } from '@angular/core';

import { UserDto } from '../dto/UserDto';
import { IUserService } from './interfaces/IUserService';
import { IRlUserService } from './interfaces/IRlUserService';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IHttpClientProxy } from './interfaces/IHttpClientProxy';
import { IConfiguracaoService } from './interfaces/IConfiguracaoService';
import { ILocalStorageRepository } from '../Repository/interfaces/ILocalStorageRepository';
import { ValidacaoCamposProvider } from 'src/providers/validacao-campos/validacao-campos';
import { RlUserDto } from 'src/dto/RlUserDto';

const WEBAPI_PATH_USER = "/plt_user_v1/users";
const WEBAPI_PATH_USER_FILTER = "/plt_user_v1/users/filters/items";


const WEBAPI_PATH_SECURITY_SESSIONS = "/plt_security_v1/sessions";


@Injectable()
export class UserService implements IUserService {

    rlUser: RlUserDto;

    constructor(
        public http: HttpClient,
        public vcProvider: ValidacaoCamposProvider,
        @Inject('LocalStorageRepositoryToken') private localStorageRepository: ILocalStorageRepository,
        @Inject('RlUserServiceToken') private rlUserService: IRlUserService,
        @Inject('HttpClientProxyToken') private httpClientProxy: IHttpClientProxy,
        @Inject('ConfiguracaoServiceToken') private configuracaoService: IConfiguracaoService
    ) {


        let rlUser = this.localStorageRepository.recuperaConfiguracaoPorChave('rlUser');
        if (rlUser) {
            this.rlUser = JSON.parse(rlUser);
        }

    }



    obterPorId(userId: string): Promise<any> {

        return new Promise((resolve, reject) => {

            this.httpClientProxy.get(this.configuracaoService.webApiUrl(), `${WEBAPI_PATH_USER}/${userId}`, null)
                .subscribe((response: any) => {
                    if (response) {
                        resolve(response);
                    }
                    else {
                        resolve(null);
                    }
                }, (error: any) => {
                    console.error("UserService - obter - Erro: ", JSON.stringify(error));
                    reject(null);
                });

        });
    }


    obterPorEmail(email: string): Promise<any> {

        let strJson: any = { "mail" : email};

        return new Promise((resolve, reject) => {

            this.httpClientProxy.get(this.configuracaoService.webApiUrl(), WEBAPI_PATH_USER_FILTER, strJson)
                .subscribe((response: any) => {
                    if (response) {

                        resolve(response.data[0]);
                    }
                    else {
                        resolve(null);
                    }
                }, (error: any) => {
                    console.error("UserService - obter - Erro: ", JSON.stringify(error));
                    reject(null);
                });

        });
    }


    gerarToken(): Promise<any> {

        let json = {
            "mail": "adminservice@grupohdi.com",
            "password": "admin123"
        };

        return new Promise((resolve, reject) => {

            this.httpClientProxy.post(this.configuracaoService.webApiUrl(), WEBAPI_PATH_SECURITY_SESSIONS, json)
                .subscribe((response: any) => {

                    if (response.sessionToken) {
                        this.localStorageRepository.adicionaConfiguracao("sessionToken", response.sessionToken);
                        resolve(true);
                    }
                    else {
                        reject(false);
                    }
                }, (error) => {
                    console.error("UserService - pegarToken - Erro: ", JSON.stringify(error));
                    reject(false);
                });


        });

    }


    renovarToken(user: UserDto) {

        let json = {
            "mail": user.mail,
            "password": user.password
        };

        return new Promise((resolve, reject) => {

            this.httpClientProxy.post(this.configuracaoService.webApiUrl(), WEBAPI_PATH_SECURITY_SESSIONS, json)
                .subscribe((response: any) => {

                    if (response.sessionToken) {
                        this.localStorageRepository.adicionaConfiguracao("sessionToken", response.sessionToken);
                        resolve(true);
                    }
                    else {
                        reject(false);
                    }
                }, (error) => {
                    console.error("UserService - pegarToken - Erro: ", JSON.stringify(error));
                    reject(false);
                });


        });

    }

    logar(user: UserDto): Promise<any> {

        let json = {
            "mail": user.mail,
            "password": user.password
        };

        return new Promise((resolve, reject) => {

            this.httpClientProxy.post(this.configuracaoService.webApiUrl(), WEBAPI_PATH_SECURITY_SESSIONS, json)
                .subscribe((response: any) => {

                    console.log('-------------logar----------------------');
                    console.log(response);

                    if (response.sessionToken) {
                        this.localStorageRepository.adicionaConfiguracao('user', JSON.stringify(response));
                        this.localStorageRepository.adicionaConfiguracao("sessionToken", response.sessionToken);
                        resolve(true);
                    }
                    else {
                        reject(false);
                    }
                }, (error: any) => {
                    console.error("UserService - logar - Erro: ", JSON.stringify(error));
                    reject(false);
                });


        });

    }


    salvar(userDto: UserDto): Promise<UserDto> {

        return new Promise((resolve, reject) => {

            //inclusao
            if (userDto.id == "") {

                this.httpClientProxy.post(this.configuracaoService.webApiUrl(), WEBAPI_PATH_USER, userDto)
                    .subscribe((response: UserDto) => {

                        if (response) {

                            let rlUser: RlUserDto = new RlUserDto();
                            rlUser.companyId = this.rlUser.companyId;
                            rlUser.userId = response.id;

                            this.rlUserService.create(rlUser).then((response2) => {

                                resolve(response2);

                            }).catch((error: any) => {
                                console.error("UserService - relationships incluir - Erro: ", JSON.stringify(error));
                                reject(false);
                            });
                        }

                    }, (error) => {
                        console.error("UserService - salvar incluir - Erro: ", JSON.stringify(error));
                        reject(false);
                    });


            }

            //alteração
            else {

                this.httpClientProxy.put(this.configuracaoService.webApiUrl(), `${WEBAPI_PATH_USER}/${userDto.id}`, userDto)
                    .subscribe((response: UserDto) => {
                        resolve(response);
                    }, (error) => {
                        console.error("UserService - salvar atualizar - Erro: ", JSON.stringify(error));
                        reject(false);
                    });

            }
        });

    }

    deletar(userDto: UserDto): Promise<UserDto> {

        return new Promise((resolve, reject) => {

            this.httpClientProxy.delete(this.configuracaoService.webApiUrl(), `${WEBAPI_PATH_USER}/${userDto.id}`)
                .subscribe((response: UserDto) => {

                    let rlUser: RlUserDto = new RlUserDto();
                    rlUser.companyId = this.rlUser.companyId;
                    rlUser.userId = response.id;

                    this.rlUserService.delete(rlUser).then((response2) => {

                        resolve(response2);

                    }).catch((error: any) => {
                        console.error("UserService - relationships deletar - Erro: ", JSON.stringify(error));
                        reject(false);
                    });

                }, (error) => {
                    console.error("UserService - salvar deletar - Erro: ", JSON.stringify(error));
                    reject(false);
                });

        });
    }

}
