import { Inject, Injectable } from '@angular/core';

import { UserDto } from '../dto/UserDto';
import { IUserService } from './interfaces/IUserService';
import { UserProvider } from '../providers/database/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IHttpClientProxy } from './interfaces/IHttpClientProxy';
import { IConfiguracaoService } from './interfaces/IConfiguracaoService';
import { ILocalStorageRepository } from '../Repository/interfaces/ILocalStorageRepository';
import { ValidacaoCamposProvider } from 'src/providers/validacao-campos/validacao-campos';

const WEBAPI_PATH_USER_FILTER = "/plt_user_v1/users/filters/items";
const WEBAPI_PATH_SECURITY_SESSIONS = "/plt_security_v1/sessions";


@Injectable()
export class UserService implements IUserService {

    constructor(
        public userProvider: UserProvider,
        public http: HttpClient,
        public vcProvider: ValidacaoCamposProvider,
        @Inject('LocalStorageRepositoryToken') private localStorageRepository: ILocalStorageRepository,
        @Inject('HttpClientProxyToken') private httpClientProxy: IHttpClientProxy,
        @Inject('ConfiguracaoServiceToken') private configuracaoService: IConfiguracaoService
    ) { }


    salvarOneSignal(oneSignalId: string): Promise<any> {

        return new Promise((resolve, reject) => {

            this.userProvider.saveOneSignal(oneSignalId)
                .then((result: any) => {
                    resolve(result);
                }).catch((error) => {
                    reject();
                });
        });

    }


    obter(user: UserDto): Promise<any> {

        let strJson: string = `{ "mail" : "${user.mail}"}`;

        return new Promise((resolve, reject) => {

            this.httpClientProxy.get(this.configuracaoService.webApiUrl(), WEBAPI_PATH_USER_FILTER, strJson)
                .subscribe((response: any) => {
                    if (response.data) {

                        let responseUser = response.data[0];
                        let newUser = new UserDto();

                        newUser.id = responseUser.id;
                        newUser.mail = responseUser.mail;
                        newUser.phone = responseUser.phone;
                        newUser.password = responseUser.password;
                        newUser.name = responseUser.name;
                        newUser.companyId = "XXX";
                        newUser.companyName = "Agência";
                        newUser.role = responseUser.role;
                        newUser.logged = "1";

                        this.localStorageRepository.adicionaConfiguracao("user", JSON.stringify(newUser));

                        resolve(true);
                    }
                    else {
                        resolve(null);
                    }
                }, (error:any) => {
                    console.error("UserService - logar - Erro: ", JSON.stringify(error));
                    reject(null);
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

                    console.log(response);
                    if (response.sessionToken) {

                        this.localStorageRepository.adicionaConfiguracao("sessionToken", response.sessionToken);

                        this.obter(user).then((responseObter: any) => {

                            resolve(true);
                        })
                            .catch((e:any) => {
                                debugger;
                                reject(false);
                            });
                    }
                    else {
                        reject(false);
                    }
                }, (error:any) => {
                    console.error("UserService - logar - Erro: ", JSON.stringify(error));
                    reject(false);
                });


        });

    }


    deslogar(mail: string): Promise<boolean> {

        return new Promise((resolve, reject) => {

            this.localStorageRepository.removeConfiguracao("sessionToken");

            this.userProvider.logoff(mail)
                .then((result: any) => {
                    resolve(true);
                }).catch((error) => {
                    reject(false);
                });
        });

    }

}
