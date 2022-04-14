import { Inject, Injectable } from '@angular/core';

import { ParametroDto } from '../dto/ParametroDto';
import { ILocalStorageRepository } from './interfaces/ILocalStorageRepository';
import { IParametroRepository } from './interfaces/IParametroRepository';

@Injectable()
export class ParametroRepository implements IParametroRepository {

    constructor(@Inject('LocalStorageRepositoryToken') private localStorageRepository: ILocalStorageRepository) { }

    tryGravaParametro(parametroDto: ParametroDto): Promise<boolean> {
        return new Promise((resolve, reject) => {
            if (this.localStorageRepository.adicionaConfiguracao("parametros", JSON.stringify(parametroDto))) {
                resolve(true);
            } else {
                reject(false);
            }
        });
    }

    recuperarParametro(): Promise<ParametroDto> {
        return new Promise((resolve, reject) => {
            let parametros = this.localStorageRepository.recuperaConfiguracaoPorChave('parametros') as ParametroDto;
            if (parametros) {
                console.log('recuperaParametro - OK');
                console.log(parametros);
                resolve(parametros);
            } else {
                reject(null);
            }
        });
    }
}
