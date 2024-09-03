import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../../material.module';
import { CommonModule, Location, NgIf } from '@angular/common';
import { CoreService } from '@services/core.service';
import { AppText } from '@utils/app-text';
import { AppRoutes } from '@utils/app-routes';
import { AppAssets } from '@utils/app-assets';
import { ResetPassword, StepsRecoveryPassword } from '@models/auth.model';
import { CustomValidator } from '@utils/validations';
import { interval, Observable, Subscription, timeInterval } from 'rxjs';
import { AuthService } from '@infrastructure/services/auth.service';
import { GlobalService } from '@services/global.service';
import { BeautyClubModule } from '@app/beautyclub.modules';

@Component({
  selector: 'app-side-forgot-password',
  standalone: true,
  imports: [RouterModule, CommonModule ,BeautyClubModule],
  templateUrl: './side-forgot-password.component.html',
})
export class SideForgotPasswordComponent {


  txt = AppText
  appRoutes = AppRoutes
  assets = AppAssets

  options = this.settings.getOptions();


  currentStep:StepsRecoveryPassword = 'send_code';

  emailRecovery = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  })

  formCode = new FormGroup({
    code: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(5), CustomValidator.numeric]),
  })

  newPasswordForm = new FormGroup({
    new_password: new FormControl('',[Validators.required, Validators.minLength(6)]),
    confirm_password: new FormControl('',[Validators.required, Validators.minLength(6)]),
  })

  timeWaiting: number = 90;
  $intervalTime: Observable<number> = new Observable();
  subscriptionTime!: Subscription;

  constructor(
    private location:Location,
    private settings: CoreService,
    private router: Router,
    private _auth:AuthService,
    private _global:GlobalService
  ) {}

  ngOnDestroy(): void {
    if (this.subscriptionTime) {
      this.subscriptionTime.unsubscribe();
    }
  }

  initTimer(){
    this.timeWaiting = 90
    this.$intervalTime = interval(1000);
    this.subscriptionTime = this.observableTimer();
  }

  observableTimer(){
    return this.$intervalTime
      .pipe(timeInterval())
      .subscribe(value => {
        if(this.timeWaiting == 1) this.subscriptionTime.unsubscribe();
        this.timeWaiting -= 1;
      });
  }

  async requestCode( msg:string = AppText.success_send_code_reset ) {
    this.emailRecovery.markAllAsTouched();
    if( this.emailRecovery.invalid ) return;
    const { email } = this.emailRecovery.value;
    const res = await this._auth.requestResetPassword(email!)
    if (res) {
      this._global.showToast(msg)
      this.initTimer()
      this.currentStep = 'enter_code';
    }
  }

  async verifyCode() {
    // console.log(this.form.value);
    this.formCode.markAllAsTouched();
    if( this.formCode.invalid ) return;
    const { code } = this.formCode.value;
    const { email } = this.emailRecovery.value;
    const res = await this._auth.verifyCodeResetPassword(email!, code!)
    if (res) {
      this.currentStep = 'new_password';
    }
  }

  async resetPassword(){

    this.newPasswordForm.markAllAsTouched();
    if( this.newPasswordForm.invalid ) return;

    const { new_password, confirm_password } = this.newPasswordForm.value;
    const { code } = this.formCode.value;
    const { email } = this.emailRecovery.value;

    const payload = new ResetPassword({
      email: email!,
      resetToken: code!,
      newPassword: new_password!,
      newPassword2: confirm_password!
    })

    const response = await this._auth.resetPassword(payload);

    if (response) {
      this.resetForms();
      this.router.navigate([AppRoutes.auth]);
    }
  }

  resetForms(){
    this.emailRecovery.reset();
    this.formCode.reset();
    this.newPasswordForm.reset();
  }

  back(){
    this.location.back()
  }
}
