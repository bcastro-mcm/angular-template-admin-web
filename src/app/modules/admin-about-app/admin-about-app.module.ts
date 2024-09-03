import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminAboutAppRoutingModule } from './admin-about-app-routing.module';
import { AboutAppComponent } from './about-app/about-app.component';
import { BeautyClubModule } from '@app/beautyclub.modules';


@NgModule({
  declarations: [
    AboutAppComponent,
    AboutAppComponent
  ],
  imports: [
    CommonModule,
    AdminAboutAppRoutingModule,
    BeautyClubModule
  ],
  exports: [
    AboutAppComponent,
    AboutAppComponent
  ]
})
export class AdminAboutAppModule { }
