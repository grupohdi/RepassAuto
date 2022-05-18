import { CompanyDto } from "../../dto/CompanyDto";

export interface ICompanyService {

    getById(companyId: string): Promise<any>;
    getByCNPJ(cnpj: string): Promise<any>;
    update(company: CompanyDto): Promise<any>;
}