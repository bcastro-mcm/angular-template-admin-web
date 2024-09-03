import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IOnboarding } from '@infrastructure/dto/onboarding.dto';
import { ResponseAPI } from '@models/api.model';
import { ParamGetApi } from '@models/public.model';
import { GlobalService } from '@services/global.service';
import { Api } from '@utils/api-routes';
import { AppText } from '@utils/app-text';
import { dataURIToBlob, urlAsset } from '@utils/app-utils';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class OnboardingService {

  constructor(
    private http:HttpClient,
    private _global:GlobalService
  ) { }

  async getOnboardings(  param:ParamGetApi  ){
    try {
      const response:ResponseAPI = await lastValueFrom<any>(
        this.http.get(Api.getOnboardings(param))
      )

      if( this._global.isInvalidResponse(response) ) return null

      if( !response.data.onboarding ) return null

      // response.data.onboarding = response.data.onboarding.map( item => {
      //   const { image } = item
      //   console.log("🚀 ~ getOnboardings ~ image:", image)
      //   // item.image =  `${environment.apiUrl}${image}`
      //   return item
      // })

      return response

    } catch (error) {
      this._global.catchError(error)
      return null
    }
  }

  async getOnboarding(  idStore: string  ){
    const loader = this._global.showLoading(AppText.getting_data)
    try {
      const response:ResponseAPI = await lastValueFrom<any>(
        this.http.get(Api.getOnboarding(idStore))
      )

      if( this._global.isInvalidResponse(response) ) return null

      if( !response.data.onboarding ) return null

      const data:IOnboarding = response.data.onboarding as any
      return data

    } catch (error) {
      this._global.catchError(error)
      return null
    } finally {
      loader.close()
    }
  }

  async createOnboarding( payload:any , image: File){
    const loader = this._global.showLoading(AppText.creating)
    try {

      const formData = new FormData()


      for (const key in payload) {
        const data:any = payload;
        if(key == 'image'){
          formData.append('image', dataURIToBlob(data[key])  );
        } else {
          formData.append(key, data[key] ?? '');
        }
      }


      const response:ResponseAPI = await lastValueFrom<any>(
        this.http.post(Api.createOnboarding, formData)
      )

      if( this._global.isInvalidResponse(response) ) return null

      const ref = this._global.showInfo({
        msg: AppText.success_create
      })

      await lastValueFrom(ref.afterClosed())

      return response
    } catch (error) {
      console.log("🚀 ~ getStores ~ error:", error)
      this._global.catchError(error)
      return null
    } finally {
      loader.close()
    }
  }

  async updateOnboarding( idStore: string, payload:any ){
    const loader = this._global.showLoading(AppText.updating)
    try {
      const formData = new FormData()
      for (const key in payload) {
        if(key == 'image' && !payload[key].includes('images\\onboarding') ){
          formData.append('image', dataURIToBlob(payload[key])  );
        } else {
          formData.append(key, payload[key] ?? '');
        }
      }

      const response:ResponseAPI = await lastValueFrom<any>(
        this.http.patch(Api.getOnboarding(idStore), formData)
      )

      if( this._global.isInvalidResponse(response) ) return null

      const ref = this._global.showInfo({
        msg: AppText.success_update
      })

      await lastValueFrom(ref.afterClosed())

      return response
    } catch (error) {
      console.log("🚀 ~ getStores ~ error:", error)
      this._global.catchError(error)
      return null
    } finally {
      loader.close()
    }
  }

  async deleteOnboarding( id: string ){
    const loader = this._global.showLoading(AppText.deleting)
    try {
      const response:ResponseAPI = await lastValueFrom<any>(
        this.http.delete(Api.getOnboarding(id))
      )

      if( this._global.isInvalidResponse(response) ) return null

      const ref = this._global.showInfo({
        msg: AppText.success_delete
      })

      await lastValueFrom(ref.afterClosed())

      return response
    } catch (error) {
      console.log("🚀 ~ getStores ~ error:", error)
      this._global.catchError(error)
      return null
    } finally {
      loader.close()
    }
  }
}
