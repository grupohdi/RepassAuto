import { VeiculoOfertaDto } from "../../dto/VeiculoOfertaDto";

export interface IVeiculoOfertaService {

    getOffers(): Promise<VeiculoOfertaDto[]>;
}