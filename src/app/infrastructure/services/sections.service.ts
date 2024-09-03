import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IAbout, NewSection } from '@infrastructure/dto/about.dto';
import { ModalNewSectionComponent } from '@modals/modal-new-section/modal-new-section.component';
import { ResponseAPI } from '@models/api.model';
import { ParamGetApi } from '@models/public.model';
import { GlobalService } from '@services/global.service';
import { Api } from '@utils/api-routes';
import { AppText } from '@utils/app-text';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SectionsService {
  constructor(
    private http:HttpClient,
    private matDialog:MatDialog,
    private _global:GlobalService
  ) { }

  async modalNewSection(data?:IAbout){
    const ref = this.matDialog.open(ModalNewSectionComponent, {
      data
    })
    return ref
  }

  async getSections(param:ParamGetApi){
    try {
      const response:ResponseAPI = await lastValueFrom<any>(
        this.http.get(Api.getSections(param))
      )
      if( this._global.isInvalidResponse(response) ) return null

      return response
    } catch (error) {
      return null
    }
  }

  async createSection( param:NewSection ){
    const loader = this._global.showLoading(AppText.creating)
    try {
      const response:ResponseAPI = await lastValueFrom<any>(
        this.http.post(Api.about, param)
      )

      if( this._global.isInvalidResponse(response) ) return null

      this._global.showInfo({
        msg: AppText.success_create
      })

      return response
    } catch (error) {
      this._global.catchError(error)
      return null
    } finally {
      loader.close()
    }
  }

  async updateSection( idSection:string, param:NewSection ){
    const loader = this._global.showLoading(AppText.creating)
    try {
      const response:ResponseAPI = await lastValueFrom<any>(
        this.http.patch(Api.getAbout(idSection), param)
      )

      if( this._global.isInvalidResponse(response) ) return null

      this._global.showInfo({
        msg: AppText.success_update
      })

      return response
    } catch (error) {
      this._global.catchError(error)
      return null
    } finally {
      loader.close()
    }
  }

  async deleteAbout(idAbout:string){
    const loader = this._global.showLoading(AppText.deleting)
    try {
      const response:ResponseAPI = await lastValueFrom<any>(
        this.http.delete(Api.getAbout(idAbout))
      )

      if( this._global.isInvalidResponse(response) ) return null

      this._global.showInfo({
        msg: AppText.success_delete
      })

      return response
    } catch (error) {
      this._global.catchError(error)
      return null
    } finally {
      loader.close()
    }
  }
}
