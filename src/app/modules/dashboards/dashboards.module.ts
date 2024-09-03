import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DashboardsRoutes } from './dashboards.routing';

import { DashboardComponent } from './dashboard.component';
import { MaterialModule } from 'src/app/material.module';

@NgModule({
  imports: [
    RouterModule.forChild(DashboardsRoutes),
    DashboardComponent,
  ],
})
export class DashboardsModule {}
