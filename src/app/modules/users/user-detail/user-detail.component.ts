import { Component } from '@angular/core';
import { UserDetailFormComponent } from '@components/users/user-detail-form/user-detail-form.component';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [UserDetailFormComponent],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent {

}
