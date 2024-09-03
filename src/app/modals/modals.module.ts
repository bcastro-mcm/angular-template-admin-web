import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalInfoComponent } from './modal-info/modal-info.component';
import { MaterialModule } from '@app/material.module';
import { FormsModule } from '@angular/forms';
import { BeautyClubModule } from '@app/beautyclub.modules';
import { ModalNewNotificationComponent } from './modal-new-notification/modal-new-notification.component';
import { ModalNewSectionComponent } from './modal-new-section/modal-new-section.component';


@NgModule({
  declarations: [
    ModalInfoComponent,
    ModalNewNotificationComponent,
    ModalNewSectionComponent,
  ],
  imports: [
    CommonModule,
    BeautyClubModule
  ],
  exports: [
    ModalNewNotificationComponent
  ]
})
export class ModalsModule { }
