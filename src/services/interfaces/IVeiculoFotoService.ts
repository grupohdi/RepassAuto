import { VeiculoFotoDto } from '../../dto/VeiculoFotoDto';

export interface IVeiculoFotoService {
    tiraFoto(veiculoId: string): Promise<any>;
    tryEnviarFoto(veiculoFotoDto: VeiculoFotoDto): Promise<boolean>;
    tryExcluirFoto(veiculoFotoId: string): Promise<boolean>;
}