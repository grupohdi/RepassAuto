export class PerimetroDto {
  public id: any;
  public description: any;
  public range: any;
  public latitude: any;
  public longitude: any;
  
  public companyId: string;	
  public userId: string;	

  public status: string;	

  public createdAt: Date;
  public createdAtISO: string;

  public updatedAt: Date;
  public updatedAtISO: string;

  public comments: string;
  public meta: any;
  public tags:string;

  constructor() {

    this.id = "";
    this.description = "";
    this.range = "";
    this.latitude = "";
    this.longitude = "";


    this.companyId = "";
    this.userId = "";

    this.status = "1";

    this.createdAt = new Date();
    this.createdAtISO = "";

    this.updatedAt = new Date();
    this.updatedAtISO = "";

    this.comments = "";
    this.meta = [];
    this.tags = "";
  }
}

