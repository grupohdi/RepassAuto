import { UserDto } from "../../dto/UserDto";

export interface IUserService {

    obterPorId(userId: string): Promise<any>;
    obterPorEmail(email: string): Promise<any>;
    logar(req: UserDto): Promise<any>;
    gerarToken(): Promise<any>;
    renovarToken(req: UserDto): Promise<any>;
    salvar(userDto: UserDto): Promise<UserDto>;
    deletar(userDto: UserDto): Promise<UserDto>;
}