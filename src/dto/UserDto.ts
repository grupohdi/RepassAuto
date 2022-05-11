export class UserDto {
    public id: string;
    public name = "";
    public mail: string;		
    public phone: string;	
    public password: string;	
    public role: string;	
    public logged: string;	
    public sessionToken: string;	
    public companyId: string;	
    public companyName: string;
    public createdAt: Date;
    public createdAtISO: string;
    public updatedAt: Date;	
    public updatedAtISO: string

    constructor() {

        this.id =  "";
        this.name =  "";
        this.mail =  "";	
        this.phone =  "";
        this.password =  "";
        this.role =  "";
        this.logged =  "";
        this.sessionToken =  "";	
        this.companyId =  "";
        this.companyName =  "";
        this.createdAt =  new Date();;
        this.createdAtISO =  "";
        this.updatedAt  =  new Date();;
        this.updatedAtISO =  "";
        }
 }
  