import { ParametroDto } from "../../dto/ParametroDto";

export interface IParametroRepository {
    tryGravaParametro(parametroDto: ParametroDto): Promise<boolean>;
    recuperarParametro(): Promise<ParametroDto>;
}