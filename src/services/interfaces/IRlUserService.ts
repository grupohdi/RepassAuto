import { RlUserDto } from "../../dto/RlUserDto";

export interface IRlUserService {

    getByUser(userId: string): Promise<any>;
    getByCompany(companyId: string): Promise<any>;
    create(rlUser: RlUserDto): Promise<any>;
    delete(rlUser: RlUserDto): Promise<any>;
}