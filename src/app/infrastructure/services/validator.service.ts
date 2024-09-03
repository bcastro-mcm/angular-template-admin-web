import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppText } from '@utils/app-text';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  constructor() { }

  /**
   * Returns the validation message for the specified input field in a form.
   *
   * @param {string} fieldInput - The name of the input field.
   * @param {FormGroup<any>} formCtrl - The form control object.
   * @return {string} The validation message for the input field.
   */
  validatorFormTxt(fieldInput: string, formCtrl: FormGroup<any>): string {

    const inputCtrl = formCtrl.get(fieldInput)!;

    if (!inputCtrl) return '';

    const { errors } = inputCtrl!;

    if (!inputCtrl.touched) return '';

    // if(inputCtrl.status == 'INVALID') return AppText.err_field_invalid;

    if (errors) {
      if (errors['existCode']) return AppText.err_code_repeated;
      if (errors['repeated']) return AppText.err_code_added;
      if (errors['scheduleEmpty']) return AppText.should_select_schedule;
      if (errors['ilegalAge']) return AppText.err_ilegal_age;
      if (errors['invalidLatitude']) return AppText.must_select_location_in_map;
      if (errors['minlength']) {
        const min = errors['minlength']['requiredLength'];
        return AppText.err_min_length(min);
      }
      if (errors['min']) {
        const min = errors['min']['min'];
        return AppText.err_min_value(min);
      }
      if (errors['max']) {
        const min = errors['max']['max'];
        return AppText.err_max_value(min);
      }
      if (errors['email']) return AppText.err_email;
      if (errors['maxlength']) {
        const reqLength = errors['maxlength']['requiredLength'];
        return AppText.err_max_length_msg(reqLength);
      }
      if (errors['noMatchPassword']) return AppText.password_not_match;
      if (errors['required']) return AppText.field_required;
      if (errors['range_max']) return AppText.err_max_range_value;
    }

    if (inputCtrl.touched && inputCtrl.status == "INVALID") return AppText.err_field_invalid;

    if (fieldInput == 'confirm_password') {

      const newPassword = formCtrl.get('new_password') ||  formCtrl.get('old_password') ;
      const confirmPassword = formCtrl.get('confirm_password')!;

      if (newPassword && newPassword.value !== confirmPassword.value) {
        confirmPassword.setErrors({ noMatchPassword: true });
        return AppText.password_not_match;
      }
    }

    return '';
  }
}
