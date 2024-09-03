import { Component } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { TablerIconsModule } from 'angular-tabler-icons';
import { AppText } from '@utils/app-text';
import { Location } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';
import { CustomValidator } from '@utils/validations';
import { UserService } from '@infrastructure/services/user.service';
import { UserUpdate } from '@infrastructure/dto/users.dto';

@Component({
  selector: 'app-admin-user-detail',
  templateUrl: './admin-user-detail.component.html',
  styleUrl: './admin-user-detail.component.scss'
})
export class AdminUserDetailComponent {

  txt = AppText

  hide: boolean = true

  formEdit = this.form.group({
    first_name:['', [Validators.required, CustomValidator.onlyString, Validators.minLength(3)]],
    last_name:['',[Validators.required, CustomValidator.onlyString, Validators.minLength(3)]],
    email:['', [Validators.required, Validators.email]],
    password:['', [Validators.minLength(6)]],
  })

  constructor(
    private location: Location,
    private form:FormBuilder,
    private _user:UserService
  ){
    this.setForm()
  }

  setForm(){
    const user = this._user.user
    if(!user) return
    const { first_name,last_name,email } = user
    this.formEdit.patchValue({
      first_name,last_name,email
    })
  }

  cancel(){
    this.location.back()
  }

  public get payload() : UserUpdate {
    const { first_name,last_name,email, password} = this.formEdit.value
    const payload:UserUpdate = {
      first_name: first_name!,
      last_name: last_name!,
      email: email!,
    }

    if (password) {
      payload.password = password!
    }

    return payload
  }

  onValidate(){
    this.formEdit.markAllAsTouched()
    if( this.formEdit.invalid ) return
    this._user.update( this.payload )
  }
}
