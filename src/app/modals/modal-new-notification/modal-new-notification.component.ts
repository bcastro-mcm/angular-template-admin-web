import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IUserAuth } from '@infrastructure/dto/users.dto';
import { NotificationsService } from '@infrastructure/services/notifications.service';
import { UserService } from '@infrastructure/services/user.service';
import { Paginator } from '@models/api.model';
import { INotification, NewNotification, StatusNotifications } from '@models/notification.model';
import { ColumnsData, DialogData } from '@models/public.model';
import { GlobalService } from '@services/global.service';
import { AppText } from '@utils/app-text';
import { CustomValidator } from '@utils/validations';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-modal-new-notification',
  templateUrl: './modal-new-notification.component.html',
  styleUrl: './modal-new-notification.component.scss'
})
export class ModalNewNotificationComponent {
  txt = AppText;
  user: IUserAuth | undefined;

  formNotifications = this.fb.group({
    title: ['', [Validators.required, CustomValidator.noSpaces,Validators.minLength(5)]],
    body: ['', [Validators.required, CustomValidator.noSpaces, Validators.minLength(5)]],
  });

  columns: ColumnsData[] = [
    {
      label: 'name',
    },
    {
      label: 'business_role',
    },
    {
      label: 'selection',
      maxWidth: 100,
    },
  ];

  datasource: any = [];

  paginator: Paginator = {
    count: 0,
    currentPage: 0,
    firstItem: {
      _id: '',
    },
    lastItem: {
      _id: '',
    },
    hasMorePages: false,
    perPage: 0,
    totalPages: 0,
    total: 0,
  };

  isLoad: boolean = true;

  constructor(
    private dialogRef: MatDialogRef<ModalNewNotificationComponent>,
    private fb: FormBuilder,
    private _notification: NotificationsService,
    @Inject(MAT_DIALOG_DATA) public notificationParam: INotification | undefined,
  ) {
    this.setForm();
  }

  setForm() {
    if (this.notificationParam) {
      this.formNotifications.disable();
      this.formNotifications.patchValue({
        title: this.notificationParam?.title,
        body: this.notificationParam?.description
      })
    }
  }

  async onSubmit() {
    this.formNotifications.markAllAsTouched();

    if (this.formNotifications.invalid) return;

    const { title, body} = this.formNotifications.value

    const notification: NewNotification = {
      title: title!,
      description: body!
    }

    const response = this._notification.createNotification(notification)
    if (response) {
      this.dialogRef.close(response)
    }
  }

  public get statusMsg() : string {

    const statusMessages = {
      [StatusNotifications.SEND]: AppText.MSG_SEND,
      [StatusNotifications.SENDING]: AppText.MSG_SENDING,
      [StatusNotifications.NOT_SENDING]: AppText.MSG_NOT_SENDING,
      [StatusNotifications.INCOMPLETED]: AppText.MSG_INCOMPLETED,
      [StatusNotifications.ERROR]: AppText.MSG_ERROR,
      [StatusNotifications.CANCELED]: AppText.MSG_CANCELED,
    };

    return statusMessages[this.notificationParam!.status!] ?? AppText.no_data
  }

}
