import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationsRoutingModule } from './notifications-routing.module';
import { ListNotificationsComponent } from './list-notifications/list-notifications.component';
import { BeautyClubModule } from '@app/beautyclub.modules';


@NgModule({
  declarations: [
    ListNotificationsComponent
  ],
  imports: [
    CommonModule,
    NotificationsRoutingModule,
    BeautyClubModule
  ],
  exports: [
    ListNotificationsComponent
  ]
})
export class NotificationsModule { }
