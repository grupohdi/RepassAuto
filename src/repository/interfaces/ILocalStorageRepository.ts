export interface ILocalStorageRepository {
    recuperaConfiguracaoPorChave(chave: string);
    adicionaConfiguracao(chave: string, valor: any): boolean;
    removeConfiguracao(chave: string): boolean;
}
