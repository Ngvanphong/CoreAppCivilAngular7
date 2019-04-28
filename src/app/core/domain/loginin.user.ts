export class LoggedInUser{
    /**
     *
     */
    public id:string;
    public access_token:string;
    public username:string;
    public fullName:string;
    public emmail:string;
    public avatar:string;
    public roles:any;
    public permissions:any;
    constructor(access_token:string, userName:string, fullName:string, email:string,avatar:string,
    roles:any,permissions:any) {
       this.access_token=access_token;
       this.username=userName;
       this.fullName=fullName;
       this.emmail=email;
       this.avatar=avatar;
       this.roles=roles;
       this.permissions=permissions;
    }
}