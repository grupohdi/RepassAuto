import { ParametroDto } from "../../dto/ParametroDto";

export interface IParametroService {
    obter(): Promise<ParametroDto>;
    //salvar(parametros: ParametroDto): Promise<boolean>;
    //buscarParametro(): Promise<ParametroDto>;
}