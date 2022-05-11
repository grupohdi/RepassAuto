import { VeiculoDto } from "../../dto/VeiculoDto";

export interface IVeiculoService {

    getById(vehicleId: string): Promise<VeiculoDto>;
    getMyVehicle(companyId: string, userId: string) : Promise<any>;

    save(vehicle: VeiculoDto): Promise<any>;
}