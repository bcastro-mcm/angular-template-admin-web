import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NewStore, ParamApiStore } from '@infrastructure/dto/stores.dto';
import { ResponseAPI } from '@models/api.model';
import { GlobalService } from '@services/global.service';
import { Api } from '@utils/api-routes';
import { AppText } from '@utils/app-text';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoresService {

  constructor(
    private http: HttpClient,
    private _global:GlobalService
  ) { }

  async getStores(param:ParamApiStore){
    try {
      const response:ResponseAPI = await lastValueFrom<any>(
        this.http.get(Api.getStores(param))
      )

      if( this._global.isInvalidResponse(response) ) return null

      return response
    } catch (error) {
      console.log("🚀 ~ getStores ~ error:", error)
      return null
    }
  }

  async getStore(idStore:string){
    const loader = this._global.showLoading(AppText.getting_data)

    try {
      const response:ResponseAPI = await lastValueFrom<any>(
        this.http.get(Api.getStore(idStore))
      )

      if( this._global.isInvalidResponse(response) ) return null

      if( !response.data.store ) return null

      return response.data.store

    } catch (error) {
      console.log("🚀 ~ getStores ~ error:", error)
      return null
    } finally {
      loader.close()
    }
  }

  async createStore( payload:NewStore ){
    const loader = this._global.showLoading(AppText.creating)
    try {
      const response:ResponseAPI = await lastValueFrom<any>(
        this.http.post(Api.createStore, payload)
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

  async updateStore( idStore: string, payload:NewStore ){
    const loader = this._global.showLoading(AppText.updating)
    try {
      const response:ResponseAPI = await lastValueFrom<any>(
        this.http.patch(Api.getStore(idStore), payload)
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

  async deleteStore( idStore: string ){
    const loader = this._global.showLoading(AppText.deleting)
    try {
      const response:ResponseAPI = await lastValueFrom<any>(
        this.http.delete(Api.getStore(idStore))
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
