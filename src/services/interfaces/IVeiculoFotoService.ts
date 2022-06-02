import { VeiculoFotoDto } from '../../dto/VeiculoFotoDto';

export interface IVeiculoFotoService {
    tiraFoto(veiculoId: string, source:number): Promise<any>;
    tryEnviarFoto(veiculoFotoDto: VeiculoFotoDto): Promise<boolean>;
    tryExcluirFoto(veiculoFotoId: string): Promise<boolean>;
}