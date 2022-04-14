import { Inject, Injectable } from '@angular/core';

import { ParametroDto } from '../dto/ParametroDto';
import { IParametroService } from './interfaces/IParametroService';
import { ParametroProvider } from '../providers/database/parametro';

import { Observable } from 'rxjs/Rx';

const WEBAPI_PATH = "Parametro/";

@Injectable()
export class ParametroService implements IParametroService {

    constructor( private parametrosProvider: ParametroProvider) { }

    obter(): Promise<ParametroDto> {
        return new Promise((resolve, reject) => {

             this.parametrosProvider.get()
                .then((result: any) => {

                    if (result.rows.length > 0) {
                         resolve(result.rows.item(0));
                    }
                    else {
                         resolve(null);
                    }
                })
                .catch((e) => {
                     reject(null);
                });
        });
    }


}
