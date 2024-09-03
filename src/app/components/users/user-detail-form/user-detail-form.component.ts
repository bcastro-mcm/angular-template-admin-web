import { Component } from '@angular/core';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';
import {MatNativeDateModule} from '@angular/material/core';
import { UserApp } from '@models/user.model';
@Component({
  selector: 'app-user-detail-form',
  standalone: true,
  imports: [MaterialModule,TablerIconsModule,MatNativeDateModule],
  templateUrl: './user-detail-form.component.html'
})
export class UserDetailFormComponent {
  constructor(){}

}
