import { VeiculoFotoDto } from '../dto/VeiculoFotoDto';

export class VeiculoDto {

    public id: string;
    public companyId: string;
    public userId: string;
    public tipo: string;
    public referencia: string;
    public marca: string;
    public modelo: string;
    public anoModelo: string;
    public tipoDescricao: string;
    public referenciaDescricao: string;
    public marcaDescricao: string;
    public modeloDescricao: string;
    public anoModeloDescricao: string;
    public anoFabricacao: string;
    public codigoFipe: string;
    public valorFipe: string;
    public preco: string;
    public placa: string;
    public cor: string;
    public kms: string;
    public chassi: string;
    public descricao: string;
    public latitude: string;
    public longitude: string;
    public logradouro: string;
    public numero: string;
    public complemento: string;
    public bairro: string;
    public cep: string;
    public cidade: string;
    public uf: string;
    public pais: string;
    public createdAt: Date;
    public createdAtISO: string;
    public updatedAt: Date;
    public updatedAtISO: string;
    public status: string;
    public comments: string;
    public meta: any;
    public tags: string;
    public veiculoFotos: any;

    constructor() {

        this.id = "";
        this.companyId = "";
        this.userId = "";
        this.tipo = "";
        this.referencia = "";
        this.marca = "";
        this.modelo = "";
        this.anoModelo = "";
        this.tipoDescricao = "";
        this.referenciaDescricao = "";
        this.marcaDescricao = "";
        this.modeloDescricao = "";
        this.anoModeloDescricao = "";
        this.anoFabricacao = "";
        this.codigoFipe = "";
        this.valorFipe = "";
        this.preco = "";
        this.placa = "";
        this.cor = "";
        this.kms = "";
        this.chassi = "";
        this.descricao = "";
        this.latitude = "";
        this.longitude = "";
        this.logradouro = "";
        this.numero = "";
        this.complemento = "";
        this.bairro = "";
        this.cep = "";
        this.cidade = "";
        this.uf = "";
        this.pais = "";
        this.createdAt = new Date();
        this.createdAtISO = "";
        this.updatedAt = new Date();
        this.updatedAtISO = "";
        this.status = "1";
        this.comments = "";
        this.meta = [];
        this.tags = "";
        this.veiculoFotos = [];
    }

}
