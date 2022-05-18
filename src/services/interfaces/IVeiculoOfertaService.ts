import { VeiculoOfertaDto } from "../../dto/VeiculoOfertaDto";

export interface IVeiculoOfertaService {

    getOffers(): Promise<VeiculoOfertaDto[]>;
    getByUser(userId:string): Promise<any>;
    save(veiculoOferta: VeiculoOfertaDto): Promise<any>;
}