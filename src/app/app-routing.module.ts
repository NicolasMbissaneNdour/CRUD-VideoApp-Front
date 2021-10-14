import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './screens/auth/signin/signin.component';
import { SignupComponent } from './screens/auth/signup/signup.component';
import { CreateComponent } from './screens/create/create.component';
import { IndexComponent } from './screens/index/index.component';
import { ShowComponent } from './screens/show/show.component';
import { UpdateComponent } from './screens/update/update.component';
import { AuthGuardService } from './services/auth/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'index',
    pathMatch: 'full'
  },
  {
    path: 'signin',
    component: SigninComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'create',
    component: CreateComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'index',
    component: IndexComponent
  },
  {
    path: 'show/:id',
    component: ShowComponent
  },
  {
    path: 'update/:id',
    component: UpdateComponent,
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
