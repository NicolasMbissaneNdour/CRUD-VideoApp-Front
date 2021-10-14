import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { User } from 'src/app/models/user';
import { AuthService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  user: User;
  userSubscribtion: Subscription;

  constructor(private authService: AuthService,private router: Router) {
    this.user = new User('','');
    this.userSubscribtion = authService.userSubject.subscribe(
      (observer)=>{
        this.user = observer;
      }
    );
    authService.emmitUserSubject();
   }

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): boolean|Observable<boolean>|Promise<boolean> {
    
    if (this.user.isAuth) {
      return true;
    }
    return this.router.navigate(['/signin']);
  }
}
