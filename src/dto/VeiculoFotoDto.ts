export class VeiculoFotoDto {

    public id: string;
    public veiculoId: string;
    public ordem: string;
    public createdAt: Date;
    public createdAtISO: string;
    public status: string;
    public comments: string;
    public meta: any;
    public tags: string;
    public base64: string;

    constructor() {

        this.id = "";
        this.veiculoId = "";
        this.ordem = "";
        this.createdAt = new Date();
        this.createdAtISO = "";
        this.status = "";
        this.comments = "";
        this.meta = {};
        this.tags = "";
        this.base64 = "";

    }
}
