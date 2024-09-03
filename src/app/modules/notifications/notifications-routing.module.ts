import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListNotificationsComponent } from './list-notifications/list-notifications.component';
import { AppRoutes } from '@utils/app-routes';

const routes: Routes = [
  {
    path:'',
    component: ListNotificationsComponent,
    data: {
      title: 'Notificaciones',
      urls: [{ title: 'Notificaciones', url: `/${AppRoutes.dashboard}` }],
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationsRoutingModule { }
