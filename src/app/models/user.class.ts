export class User {
    firstName: string;
    password: string;
    email:string;
    

  
  
    constructor(obj?: any) {
      this.firstName = obj ? obj.firstName: '';
      this.password = obj ? obj.password: '';
      this.email = obj ? obj.email: '';
     
    }        
    public toJSON(){
      return { 
        
        firstName: this.firstName|| "" ,
        password: this.password|| "" ,
        email: this.email|| "" ,

    }}
  } 
  