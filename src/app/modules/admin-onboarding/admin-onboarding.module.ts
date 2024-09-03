import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminOnboardingRoutingModule } from './admin-onboarding-routing.module';
import { ListOnboardingComponent } from './list-onboarding/list-onboarding.component';
import { AddOnboardingComponent } from './add-onboarding/add-onboarding.component';
import { BeautyClubModule } from '@app/beautyclub.modules';


@NgModule({
  declarations: [
    ListOnboardingComponent,
    AddOnboardingComponent
  ],
  imports: [
    CommonModule,
    AdminOnboardingRoutingModule,
    BeautyClubModule
  ],
  exports: [
    ListOnboardingComponent,
    AddOnboardingComponent
  ]
})
export class AdminOnboardingModule { }
