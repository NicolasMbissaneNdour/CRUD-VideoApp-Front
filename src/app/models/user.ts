export class User {
  email: String;
  password: String;
  token: String;
  isAuth: Boolean;
  isAdmin: Boolean;
  id: String;
  constructor(email:String,password:String){
    this.email = email;
    this.password = password
    this.token = '';
    this.isAuth = false;
    this.isAdmin = false;
    this.id = '';
  }
  
}
