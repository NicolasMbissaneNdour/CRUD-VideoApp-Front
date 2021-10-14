import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth/auth-service.service';
import { SnackBarService } from 'src/app/services/snackbar/snack-bar.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  form: FormGroup;
  isLogin: Boolean = false;
  constructor(private formBuilder: FormBuilder,private authService: AuthService,private router: Router,private snackBarService: SnackBarService) { 
    this.form = formBuilder.group({
      email: ['',[Validators.email,Validators.required]],
      password: ['',[Validators.required,Validators.minLength(8)]]
    });
  }

  ngOnInit(): void {
  }

  async onSubmit() {
    const email = this.form.get('email')?.value;
    const password = this.form.get('password')?.value;
    const user = new User(email,password);
    try {
      const result = await this.authService.signin(user);
      if (result.success) {
        this.snackBarService.show(result.message,'mat-primary');
        this.router.navigate(['/create']);
      }
      else {
        this.snackBarService.show(result.message,'mat-warn');
      }
    } catch (error) {
      console.log(error);
    }
  }

}
