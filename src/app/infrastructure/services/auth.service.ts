import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IUserAuth } from '@infrastructure/dto/users.dto';
import { UserMapper } from '@infrastructure/mapper/user.mapper';
import { ResponseAPI } from '@models/api.model';
import { ResetPassword } from '@models/auth.model';
import { GlobalService } from '@services/global.service';
import { Api } from '@utils/api-routes';
import { AppRoutes } from '@utils/app-routes';
import { AppText } from '@utils/app-text';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _tokenAuth: string = '';

  public get tokenAuth(): string {
    return this._tokenAuth;
  }

  public set tokenAuth(value: string) {
    this._tokenAuth = value;
  }

  constructor(
    private router:Router,
    private http:HttpClient,
    private _global:GlobalService
  ) { }

  async logout(){
    // const isConfirm = await this._global.dialogConfirm({
    //   title: AppText.logout,
    //   msg: AppText.logout_info
    // })

    // if(isConfirm){
    // }
    localStorage.clear();
    this.router.navigate([AppRoutes.auth], {
      replaceUrl: true,
      state: {}
    });
  }

  saveTokenAuth( token:string ){
    this.tokenAuth = token;
    this._global.saveData( this._global.STORAGE_TOKEN_AUTH, token );
  }

  getTokenAuth(){
    const token:string = this._global.getData(this._global.STORAGE_TOKEN_AUTH)
    this.tokenAuth = token;
    return token;
  }

  async login(email: string, password: string): Promise<IUserAuth | null>{
    const loader = this._global.showLoading();
    try {
      const response:ResponseAPI = await lastValueFrom<any>(
        this.http.post(Api.login, {email, password})
      )
      if( this._global.isInvalidResponse(response) ) return null;
      const userAuth = UserMapper.toIUser({
        ...response.data.user,
        token: response.data.token
      });
      return userAuth;
    } catch (error) {
      this._global.catchError(error);
      return null;
    } finally {
      loader.close();
    }
  }


  async requestResetPassword(email: string): Promise<boolean>{
    const loader = this._global.showLoading();
    try {
      const response:ResponseAPI = await lastValueFrom<any>(
        this.http.post(Api.requestResetPassword, {email})
      )
      if( this._global.isInvalidResponse(response) ) return false;
      return true;
    } catch (error) {
      this._global.catchError(error);
      return false;
    } finally {
      loader.close();
    }
  }

  async verifyCodeResetPassword(email: string, resetToken: string): Promise<boolean>{
    const loader = this._global.showLoading();
    try {
      const response:ResponseAPI = await lastValueFrom<any>(
        this.http.post(Api.verifyCodeReset, {email, resetToken})
      )
      if( this._global.isInvalidResponse(response) ) return false;
      return true;
    } catch (error) {
      this._global.catchError(error);
      return false;
    } finally {
      loader.close();
    }
  }

  async resetPassword( params:ResetPassword ){
    const loader = this._global.showLoading(AppText.updating);
    try {
      const response:ResponseAPI = await lastValueFrom<any>(
        this.http.post(Api.resetPassword, params)
      )
      if( this._global.isInvalidResponse(response) ) return false;

      this._global.showInfo({
        msg: AppText.succes_reset_password
      });

      return true;
    } catch (error) {
      this._global.catchError(error);
      return false;
    } finally {
      loader.close();
    }
  }
}
