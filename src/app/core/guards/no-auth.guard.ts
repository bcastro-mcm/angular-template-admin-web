import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@infrastructure/services/auth.service';
import { AppRoutes } from '@utils/app-routes';


@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard {
  constructor(
    private router: Router,
    private _auth: AuthService
  ) {}

  async canActivate(): Promise<boolean> {

    const tokenAuth: string = this._auth.getTokenAuth();
    console.log("🚀 ~ NoAuthGuard ~ tokenAuth:", tokenAuth)

    if(tokenAuth){
      this.router.navigateByUrl(AppRoutes.home);
      return false;
    }

    return true;
  }
}
