import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalNewNotificationComponent } from '@modals/modal-new-notification/modal-new-notification.component';
import { ResponseAPI } from '@models/api.model';
import { INotification, NewNotification, StatusNotificationSend } from '@models/notification.model';
import { ParamGetApi } from '@models/public.model';
import { GlobalService } from '@services/global.service';
import { Api } from '@utils/api-routes';
import { AppText } from '@utils/app-text';
import { toAwait } from '@utils/app-utils';
import { BehaviorSubject, lastValueFrom, Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  obsSendNotification = new Observable()
  evSending = new BehaviorSubject<StatusNotificationSend>('none')

  constructor(
    private http:HttpClient,
    private matDialog:MatDialog,
    private _global:GlobalService
  ) { }

  async modalNewNotification( notification?:INotification ){
    const ref = this.matDialog.open(ModalNewNotificationComponent,{
      data: notification
    })
    const resp = await lastValueFrom<any>(ref.afterClosed())
    return resp
  }

  async getNotifications(param:ParamGetApi){
    try {
      const response:ResponseAPI = await lastValueFrom<any>(
        this.http.get(Api.getNotifications(param))
      )
      if( this._global.isInvalidResponse(response) ) return null

      return response
    } catch (error) {
      return null
    }
  }

  private async finishSend(status:StatusNotificationSend){
    this.evSending.next(status)
    await toAwait(1500)
    this.evSending.next('none')
  }
  async createNotification(param:NewNotification){
    try {

      const toast = this._global.showToastLoad()

      this.evSending.next('sending')

      const observer: Observer<any> = {
        next: value => {
          console.log("🚀 ~ obsSendNotification ~ value:", value)
        },
        error: error => {
          this._global.catchError(error)
          this.finishSend('error')
          toast.dismiss()
        },
        complete: () => {
          toast.dismiss()
          console.log('[Complete]')
          this.finishSend('finish')
          this._global.showToast('La notificación ha sido procesada y se está enviando correctamente.')
        },
      };

      this.http.post(Api.notifications, param).subscribe(observer)

      return this.http.post(Api.notifications, param)
    } catch (error) {
      // this._global.catchError(error)
      return null
    }
  }

  async deleteNotification(idNotification:string){
    const loader = this._global.showLoading(AppText.deleting)
    try {
      const response:ResponseAPI = await lastValueFrom<any>(
        this.http.delete(Api.notification(idNotification))
      )

      if( this._global.isInvalidResponse(response) ) return null

      this._global.showInfo({
        msg: AppText.notification_success_delete
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
