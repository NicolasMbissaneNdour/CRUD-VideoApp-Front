import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from './models/user';
import { AuthService } from './services/auth/auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';
  user: User;
  userSubscription: Subscription;

  constructor(private authService: AuthService,private router: Router) {
    this.user = new User('','');
    this.userSubscription  = new Subscription();
  }

  ngOnInit() {
    this.userSubscription = this.authService.userSubject.subscribe(
      (observer)=>{
        this.user = observer;
      }
    );
    this.authService.emmitUserSubject();
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/signin']);
  }

  onLogin() {
    this.router.navigate(['/signin']);
  }
  
  onCreate() {
    this.router.navigate(['/create']);
  }

  onIndex() {
    this.router.navigate(['/index']);
  }
}
