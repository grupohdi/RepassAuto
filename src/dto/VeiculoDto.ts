export class VeiculoDto {

    public id: string;
    public companyId: string;
    public userId: string;
    public tipo: string;
    public chassi: string;
    public placa: string;
    public cor: string;
    public combustivel: string;
    public kms: string;
    public anoFabricacao: string;
    public anoModelo: string;
    public marca: string;
    public modelo: string;
    public versao: string;
    public fipe: string;
    public descricao: string;
    public preco: string;
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

    constructor() {

        this.id = "";
        this.companyId = "";
        this.userId = "";
        this.tipo = "";
        this.chassi = "";
        this.placa = "";
        this.cor = "";
        this.combustivel = "";
        this.kms = "";
        this.anoFabricacao = "";
        this.anoModelo = "";
        this.marca = "";
        this.modelo = "";
        this.versao = "";
        this.fipe = "";
        this.descricao = "";
        this.preco = "";
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
        this.status = "";
        this.comments = "";
        this.meta = {};
        this.tags = "";
    
    }

}
