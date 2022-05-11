export interface IFipeService {

    obterTabelaReferencia(): Promise<any>;
    obterMarcas(referencia: string, tipo: string): Promise<any>;
    obterModelos(referencia: string, tipo: string, marca: string): Promise<any>;
    obterAnoModelo(params: any): Promise<any>;
    obterValor(params: any): Promise<any>;
}