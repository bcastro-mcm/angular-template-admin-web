import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserRoutes } from './users.routing';
import { UsersComponent } from './users.component';
import { AdminUserDetailComponent } from './admin-user-detail/admin-user-detail.component';
import { BeautyClubModule } from '@app/beautyclub.modules';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations:[
    AdminUserDetailComponent
  ],
  imports: [
    RouterModule.forChild(UserRoutes),
    UsersComponent,
    BeautyClubModule,
    CommonModule
  ],
})
export class UsersModules {}
