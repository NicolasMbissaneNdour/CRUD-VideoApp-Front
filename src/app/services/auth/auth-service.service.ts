import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user';
import { Response as ServerResponse } from 'src/app/models/response';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User;
  userSubject: Subject<User>;

  constructor(private http: HttpClient) {
    this.user = new User('','');
    this.userSubject = new Subject<User>();
  }

  public emmitUserSubject(): void {
    this.userSubject.next(this.user);
  }

  public async signup(user: User): Promise<ServerResponse> {
    try {
      const result = await <any>this.http.post('http://localhost:3000/signup',{user}).toPromise();
      if (result.status == 'OK') {
        this.user.email = user.email;
        this.user.token= result.token;
        this.user.id = result.user_id;
        this.user.isAuth = true ;
        this.emmitUserSubject();
        return new ServerResponse(true,'Connected with success');
      }
      else {
        return new ServerResponse(false,result.message);
      }
    } catch (error) {
      console.log(error);
      return new ServerResponse(false,'Erreur interne réessayez plus tard');
    }

  }

  public async signin(user: User): Promise<ServerResponse> {
    try {
      const result = await <any>this.http.post('http://localhost:3000/signin',{user}).toPromise();
      console.log(result);
      if (result.status == 'OK') {
        this.user.email = user.email;
        this.user.token = result.token;
        this.user.id = result.user_id;
        this.user.isAuth = true;
        this.emmitUserSubject();
        return new ServerResponse(true,`Connecté ${user.email}`);
      }
      return new ServerResponse(false,result.message);
    } catch (error) {
      console.log(error);
      return new ServerResponse(false,'Erreur interne réessayez plus tard');
    }
    

  }

  public logout(): void {
    this.user.email = '';
    this.user.isAuth = false;
    this.user.token = '';
    this.user.id = '';
    this.emmitUserSubject();
  }
}
