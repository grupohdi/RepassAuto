import { VeiculoDto } from '../dto/VeiculoDto';
import { VeiculoFotoDto } from '../dto/VeiculoFotoDto';


export class VeiculoOfertaDto {
    public id: string;            
    public userId: string;        
    public veiculoId: string;     

    public status: string;        //(1 - Ativa, 2 - Em Negociação, 3-Finalizada, 4-Cancelada

    public createdAt: Date;     
    public createdAtISO: string;  
    public comments: string;      
    public meta: any;          
    public tags: string;          

    veiculo: VeiculoDto;
    veiculoFotos: VeiculoFotoDto[];

    constructor() {

        this.id = "";            
        this.userId = "";        
        this.veiculoId = "";     
        this.status = "";        //(1 - Ativa, 2 - Em Negociação, 3-Finalizada, 4-Cancelada
        this.createdAt = new Date();     
        this.createdAtISO = "";  
        this.comments = "";      
        this.meta = {};          
        this.tags = "";          
    
        this.veiculo =  new VeiculoDto();
        this.veiculoFotos = [new VeiculoFotoDto()];
    }
}
