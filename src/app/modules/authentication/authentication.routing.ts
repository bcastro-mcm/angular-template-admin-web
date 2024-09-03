import { Routes } from '@angular/router';
import { ErrorComponent } from '../error/error.component';
import { SideForgotPasswordComponent } from './side-forgot-password/side-forgot-password.component';
import { SideLoginComponent } from './side-login/side-login.component';
import { RouterComponents } from '@utils/app-routes';

export const AuthenticationRoutes: Routes = [
  {
    path: '',
    component: SideLoginComponent
  },
  {
    path: RouterComponents.recovery_password,
    component: SideForgotPasswordComponent
  }
];
