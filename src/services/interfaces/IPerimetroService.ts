import { PerimetroDto } from "../../dto/PerimetroDto";

export interface IPerimetroService {

    getAll(companyId: string, userId: string) : Promise<any>;
    getById(perimeterId: string): Promise<any>;

    save(perimetroDto: PerimetroDto): Promise<any>;
}