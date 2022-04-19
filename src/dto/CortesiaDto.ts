export class CortesiaDto {
    public id: string;       
    public descricao: string;
    public companyId: string;
    public qtdeInicial: number;  //(Ex: 15 visualizações)
    public qtdeAtual: number;    //(Ex: 9 visualizações indicando que 6 já foram usadas)
    public createdAt: Date;   
    public createdAtISO: string;
    public updatedAt: Date;   
    public updatedAtISO: string;
    public comments: string;    
    public meta: any;            
    public tags: string;            

    constructor() {
      this.id = "";
      this.descricao = ""; // Cortesia de Adesao, Codigo Promocional,etc)
      this.companyId = "";
      this.qtdeInicial = 0; //(Ex: 15 visualizações)
      this.qtdeAtual = 0; //(Ex: 9 visualizações indicando que 6 já foram usadas)
  
      this.createdAt = new Date();
      this.createdAtISO = "";
      this.updatedAt = new Date();
      this.updatedAtISO = "";
      this.comments = "";
      this.meta = {};
      this.tags = "";
    }
  
}
