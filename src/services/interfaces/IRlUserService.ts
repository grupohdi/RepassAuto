import { RlUserDto } from "../../dto/RlUserDto";

export interface IRlUserService {

    getByUser(userId: string): Promise<any>;
    getByCompany(companyId: string): Promise<any>;
}