export class PerimetroDto {
  public id: string;
  public range: string;
  public latitude: string;
  public longitude: string;
  
  public companyId: string;	
  public userId: string;	

  public createdAt: Date;
  public createdAtISO: string;


  constructor() {

    this.id = "";
    this.range = "";
    this.latitude = "";
    this.longitude = "";


    this.companyId = "";
    this.userId = "";

    this.createdAt = new Date();
    this.createdAtISO = "";

  }
}

