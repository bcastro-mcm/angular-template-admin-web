import { Injectable } from "@angular/core";
import { AuthService } from "@infrastructure/services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {
  constructor(
    private _auth: AuthService
  ) {}

  async canActivate(): Promise<boolean> {

    const tokenAuth: string = this._auth.getTokenAuth();
    console.log("🚀 ~ AuthGuard ~ tokenAuth:", tokenAuth)

    if(!tokenAuth) {
      this._auth.logout();
      return false;
    }

    return true;
  }
}
