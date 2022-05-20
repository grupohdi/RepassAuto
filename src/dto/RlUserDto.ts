export class RlUserDto {
    public id: string;

    public userId: string;
    public companyId: string;
    public groupId: string;
    public subGroupId: string;

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

        this.userId =  "";
        this.companyId =  "";	
        this.groupId =  "";	
        this.subGroupId =  "";	
        
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
