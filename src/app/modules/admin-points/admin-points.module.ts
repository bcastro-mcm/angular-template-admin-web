import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminPointsRoutingModule } from './admin-points-routing.module';
import { ListPointsComponent } from './list-points/list-points.component';
import { BeautyClubModule } from '@app/beautyclub.modules';
import { AddLevelComponent } from './add-level/add-level.component';


@NgModule({
  declarations: [
    ListPointsComponent,
    AddLevelComponent
  ],
  imports: [
    CommonModule,
    AdminPointsRoutingModule,
    BeautyClubModule
  ],
  exports: [
    ListPointsComponent,
    AddLevelComponent
  ]
})
export class AdminPointsModule { }
