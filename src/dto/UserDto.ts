export class UserDto {
    public id: string;
    public name: string;
    public mail: string;		
    public phone: string;	
    public password: string;	
    public role: string;	

    public createdAt: Date;
    public createdAtISO: string;
    public updatedAt: Date;	
    public updatedAtISO: string;

    public status: string;
    public comments: string;
    public meta: any;
    public tags: string;

    constructor() {

        this.id =  "";
        this.name =  "";
        this.mail =  "";	
        this.phone =  "";
        this.password =  "";
        this.role =  "";
        this.createdAt =  new Date();;
        this.createdAtISO =  "";
        this.updatedAt  =  new Date();;
        this.updatedAtISO =  "";

        this.status = "1";
        this.comments = "";
        this.meta = [];
        this.tags = "";
    
    }
 }
  