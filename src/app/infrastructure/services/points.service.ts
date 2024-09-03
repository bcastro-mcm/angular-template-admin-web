import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PayloadLevel } from '@infrastructure/dto/points.dto';
import { ResponseAPI } from '@models/api.model';
import { ParamGetApi } from '@models/public.model';
import { GlobalService } from '@services/global.service';
import { Api } from '@utils/api-routes';
import { AppText } from '@utils/app-text';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PointsService {

  constructor(
    private http:HttpClient,
    private _global:GlobalService
  ) { }

  async getLevelPoints(  param:ParamGetApi  ){
    try {
      const response:ResponseAPI = await lastValueFrom<any>(
        this.http.get(Api.getLevels(param))
      )

      if( this._global.isInvalidResponse(response) ) return null

      if( !response.data.points ) return null

      response.data.points = response.data.points.map( item => {
        const { range_end,range_start } = item.range_points
        item.name_level = item.name
        item.color = item.color.toUpperCase()
        item.range = `${range_start} => ${range_end ?? '∞'}`
        return item
      })

      return response

    } catch (error) {
      this._global.catchError(error)
      return null
    }
  }

  async getLevel(  idStore: string  ){
    const loader = this._global.showLoading(AppText.getting_data)
    try {
      const response:ResponseAPI = await lastValueFrom<any>(
        this.http.get(Api.getLevel(idStore))
      )

      if( this._global.isInvalidResponse(response) ) return null

      if( !response.data.point ) return null

      return response.data.point

    } catch (error) {
      this._global.catchError(error)
      return null
    } finally {
      loader.close()
    }
  }

  async createLevel( payload:PayloadLevel ){
    const loader = this._global.showLoading(AppText.creating)
    try {
      const response:ResponseAPI = await lastValueFrom<any>(
        this.http.post(Api.createLevel, payload)
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

  async updateLevel( idStore: string, payload:PayloadLevel ){
    const loader = this._global.showLoading(AppText.updating)
    try {
      const response:ResponseAPI = await lastValueFrom<any>(
        this.http.patch(Api.getLevel(idStore), payload)
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

  async deleteLevel( idPoint: string ){
    const loader = this._global.showLoading(AppText.deleting)
    try {
      const response:ResponseAPI = await lastValueFrom<any>(
        this.http.delete(Api.getLevel(idPoint))
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
