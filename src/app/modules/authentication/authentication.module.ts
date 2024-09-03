import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';

import { AuthenticationRoutes } from './authentication.routing';
import { ErrorComponent } from '../error/error.component';
import { SideForgotPasswordComponent } from './side-forgot-password/side-forgot-password.component';
import { SideLoginComponent } from './side-login/side-login.component';
import { MaterialModule } from '@app/material.module';
import { ComponentsModule } from '@components/components.module';

@NgModule({
  declarations:[
    SideLoginComponent,
  ],
  exports:[
    SideLoginComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(AuthenticationRoutes),
    FormsModule,
    ReactiveFormsModule,
    TablerIconsModule.pick(TablerIcons),
    ErrorComponent,
    SideForgotPasswordComponent,
    MaterialModule,
    ComponentsModule
  ],
})
export class AuthenticationModule {}
