import { Injectable } from '@angular/core';

import { ILocalStorageRepository } from './interfaces/ILocalStorageRepository';

@Injectable()
export class LocalStorageRepository implements ILocalStorageRepository {

    constructor() { }

    recuperaConfiguracaoPorChave(chave: string) {
        return localStorage.getItem(chave);

    }

    adicionaConfiguracao(chave: string, valor: string): boolean {
        try {
            localStorage.setItem(chave, valor);
            return true;
        } catch (error) {
            return false;
        }
    }

    removeConfiguracao(chave: string): boolean {
        try {
            localStorage.removeItem(chave);
            return true;
        } catch (error) {
            return false;
        }
    }
}