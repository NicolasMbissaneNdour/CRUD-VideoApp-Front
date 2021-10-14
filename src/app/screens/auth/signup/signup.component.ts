import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth/auth-service.service';
import { SnackBarService } from 'src/app/services/snackbar/snack-bar.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  form: FormGroup;
  errorMsg: String;
  constructor(private formBuilder: FormBuilder,private authService: AuthService,private snackBarService: SnackBarService,private router: Router) {
    this.form = formBuilder.group({
      email: ['',[Validators.required,Validators.email]],
      password: ['',[Validators.required,Validators.minLength(8)]]
    });

    this.errorMsg = '';
   }

  ngOnInit(): void {
  }

  async onSubmit() {
    const email = this.form.get('email')?.value;
    const password = this.form.get('password')?.value;

    const user = new User(email,password);
    const response = await this.authService.signup(user);
    console.log(response);
    if (!response.success) {
      this.snackBarService.show(response.message,'mat-warn');
    }
    else {
      this.snackBarService.show(response.message,'mat-primary');
      this.router.navigate(['/create']);
    }
  }

}
