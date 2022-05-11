import { UserDto } from "../../dto/UserDto";

export interface IUserService {

    obterPorId(userId: string): Promise<any>;
    obterPorEmail(email: string): Promise<any>;
    salvarOneSignal(oneSignalId: string): Promise<any>;
    deslogar(id: string): Promise<boolean>;
    logar(req: UserDto): Promise<any>;
    gerarToken(): Promise<any>;
    renovarToken(req: UserDto): Promise<any>;
    salvar(userDto: UserDto): Promise<UserDto>;
}