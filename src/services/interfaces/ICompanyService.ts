import { CompanyDto } from "../../dto/CompanyDto";

export interface ICompanyService {

    get(companyId: string): Promise<any>;
}