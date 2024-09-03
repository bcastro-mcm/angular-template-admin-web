import { Component, OnDestroy } from '@angular/core';
import { NotificationsService } from '@infrastructure/services/notifications.service';
import { Paginator } from '@models/api.model';
import { INotification, StatusNotifications } from '@models/notification.model';
import { ColumnsData, ParamGetApi } from '@models/public.model';
import { GlobalService } from '@services/global.service';
import { AppText } from '@utils/app-text';
import { clone } from '@utils/app-utils';
import { Observable, Observer, Subscription } from 'rxjs';

@Component({
  selector: 'app-list-notifications',
  templateUrl: './list-notifications.component.html',
  styleUrl: './list-notifications.component.scss'
})
export class ListNotificationsComponent implements OnDestroy {

  txt = AppText

  columns: ColumnsData[] = [
    {
      label: 'title',
      maxWidth: 250,
    },
    {
      label: 'description'
    },
    {
      label: 'status',
      maxWidth: 150,
      isBadge: true
    },
    {
      label: 'actions',
      maxWidth:90,
      align: 'justify-content-center',
      colorAction: 'warn',
      iconAction: 'delete_forever'
    }
  ]

  datasource: INotification[] = []
  paginator!: Paginator

  isLoad: boolean = false;

  paramApi: ParamGetApi = {
    page: 1,
    limit: 15
  }

  isCurrentSending: boolean = false

  evSending: Subscription
  constructor(
    private _notification:NotificationsService,
    private _global:GlobalService
  ){
    this.getNotifications()
    this.evSending = this._notification.evSending.subscribe( value => {
      if (value == 'finish') {
        this.reloadTable()
      }
    })
  }

  ngOnDestroy(): void {
    this.evSending.unsubscribe()
  }

  get statusSend() {
    return this._notification.evSending.value
  }

  get sendingOBS() : Observable<any> {
    return this._notification.obsSendNotification
  }

  async actionNotification(notification?:INotification){
    if(this.isCurrentSending) return
    const resp = await this._notification.modalNewNotification(notification)
    // if(resp){
    //   this.detectStatusSend()
    // }
  }

  reloadTable(){
    this.paramApi.page = 1
    this.paramApi.query = undefined
    this.getNotifications()
  }

  onSearch(query:string){
    this.paramApi.page = 1
    this.paramApi.query = query
    this.getNotifications()
  }

  onChangePage(event:Paginator){
    this.paginator = event;
    this.paramApi.page = event.currentPage
    this.paramApi.limit = event.perPage
    this.getNotifications()
  }

  async getNotifications(){
    this.isLoad = true
    const response = await this._notification.getNotifications(this.paramApi)

    if (response) {
      this.datasource = clone(response.data.notifications)
      this.paginator = clone(response.meta.paginatorInfo)

      const isSending = this.datasource.some( item => item.status == StatusNotifications.SENDING )

      if(this.paginator.currentPage === 1 ){
        this.isCurrentSending = isSending
      }
    }

    this.isLoad = false
  }

  async deleteNotification(notification:INotification){
    const isConfirm = await this._global.dialogConfirm({
      title: AppText.delete_notification,
      msg: AppText.msg_delete_notification
    })

    if(isConfirm){
      console.log("🚀 ~ deleteNotification ~ isConfirm:", isConfirm)
      const response = await this._notification.deleteNotification(notification._id)
      if(response){
        this.paramApi.page = 1
        this.getNotifications()
      }
    }
  }
}
