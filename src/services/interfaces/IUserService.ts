import { UserDto } from "../../dto/UserDto";

export interface IUserService {

    salvarOneSignal(oneSignalId: string): Promise<any>;
    deslogar(id: string): Promise<boolean>;
    logar(req: UserDto): Promise<any>;
    renovarToken(req: UserDto): Promise<any>;
}