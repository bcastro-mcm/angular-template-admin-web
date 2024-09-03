export interface INotification {
    _id:         string;
    title:       string;
    description: string;
    status?:     StatusNotifications;
    created_at:  Date;
    __v:         number;
}

export type StatusNotification = 'complete' | 'incomplete'

export interface NewNotification {
    title:       string;
    description: string;
}

export enum StatusNotifications {
  SEND = 'send',
  SENDING = 'sending',
  NOT_SENDING = 'not_sending',
  INCOMPLETED = 'incompleted',
  ERROR = 'error',
  CANCELED = 'canceled',
}

export type StatusNotificationSend = 'none' | 'sending' | 'finish' | 'error'
