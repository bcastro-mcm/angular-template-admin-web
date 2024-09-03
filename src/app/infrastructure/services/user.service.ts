import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { GlobalService } from '@services/global.service';
import { Api } from '@utils/api-routes';
import { IUserAuth, UserUpdate } from '@infrastructure/dto/users.dto';
import { AppText } from '@utils/app-text';
import { ResponseAPI } from '@models/api.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userState = new BehaviorSubject<IUserAuth | undefined>(undefined);

  user$ = this.userState.asObservable();

  constructor(
    private http: HttpClient,
    private _globals:GlobalService
  ) { }

  public get user(): IUserAuth | undefined {
    return this.userState.value;
  }

  saveUser(user:IUserAuth){
    this.userState.next(user)
    this._globals.saveData(this._globals.STORAGE_USER,user);
  }

  currentUser() : IUserAuth | null {
    const strUser = this._globals.getData(this._globals.STORAGE_USER);
    console.log("🚀 ~ currentUser ~ strUser:", strUser)
    if(strUser){
      this.userState.next(strUser)
      return this.user!
    }
    return null
  }

  async getDetail(id: string): Promise<any> {
    const response = await lastValueFrom(
      this.http.get(Api.getUser(id))
    );
    return response;
  }

  async update(payload: UserUpdate): Promise<any> {
    const loader = this._globals.showLoading(AppText.updating)
    try {

      const response:ResponseAPI = await lastValueFrom<any>(
        this.http.patch(Api.getUser(this.user!._id), payload)
      );

      if( this._globals.isInvalidResponse(response) ) return null

      const { user } = response.data

      this.saveUser(user)

      const ref = this._globals.showInfo({
        msg: AppText.success_update
      })

    } catch (error) {
      this._globals.catchError(error)
      return null
    } finally {
      loader.close()
    }
  }
}
