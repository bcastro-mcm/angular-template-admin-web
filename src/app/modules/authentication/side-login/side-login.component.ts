import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CoreService } from '@services/core.service';
import { AppRoutes } from '@utils/app-routes';
import { AppAssets } from '@utils/app-assets';
import { AppText } from '@utils/app-text';
import { environment } from 'src/environments/environment.development';
import { AuthService } from '@infrastructure/services/auth.service';
import { UserService } from '@infrastructure/services/user.service';

@Component({
  selector: 'app-side-login',
  templateUrl: './side-login.component.html',
})
export class SideLoginComponent {

  routes = AppRoutes;
  assets = AppAssets;
  txt = AppText;

  options = this.settings.getOptions();

  hide: boolean = true;

  constructor(
    private settings: CoreService,
    private router: Router,
    private _auth:AuthService,
    private _user:UserService
  ) {
    if (!environment.production) {
      const { email, password } = this.form.controls;
      email.setValue('b.castro.admin@beautyclub.com');
      password.setValue('lasfragancias2024.');
    }
  }

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.minLength(6), Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });


  async submit() {
    // console.log(this.form.value);
    this.form.markAllAsTouched()
    if( this.form.invalid ) return;
    const { email, password } = this.form.value;
    const userAuth = await this._auth.login(email!, password!);
    if (userAuth) {
      this.goHome(userAuth)
    }
  }

  goHome(user:any){
    this._auth.saveTokenAuth(user.token)
    this._user.saveUser(user);
    this.router.navigate([AppRoutes.home]);
  }
}
