import { AbstractControl } from "@angular/forms";

export class CustomValidator {
    // Number only validation
    static numeric(control: AbstractControl) {
        let val = control.value;

        if (val === null || val === '') return null;

        if (!val?.toString().match(/^[0-9 ]+(\.?[0-9 ]+)?$/)) return { 'invalidNumber': true };

        return null;
    }

    static numericGreater(control: AbstractControl) {
        let val = control.value;

        if (val === null || val === '') return null;

        // Check if the value is a valid number
        if (!val.toString().match(/^(?!0+(\.0*)?$)[0-9]*(\.[0-9]+)?$/)) {
            return { 'invalidNumber': true };
        }

        return null;
    }

    static onlyString(control: AbstractControl) {
        let val = control.value;

        if (val === null || val === '') return null;

        if (!val?.toString().match(/^[a-zA-Z\u00C0-\u017F ]+$/)) return { 'invalidString': true };

        return null;
    }

    static noSpecialCharacters(control: AbstractControl) {
        let val = control.value;

        if (val === null || val === '') return null;

        if (!val?.toString().match(/(?<!\S)[A-Za-z0-9]+(?!\S)/g)) return { 'invalid': true };

        return null;
    }

    static onlyLetterNumbers(control: AbstractControl) {
        let val = control.value;

        if (val === null || val === '') return null;

        if (!val?.toString().match(/[A-Za-z0-9]/g)) return { 'invalid': true };

        return null;
    }

    static validateLatLng(control: AbstractControl) {
        let num = control.value;
        if (num == 0) return { 'invalidLatitude': true }
        return null;
    }

    static isValidCode(control: AbstractControl) {
        let num = control.value;
        if (parseInt(num) == 0) return { 'invalid': true }
        return null;
    }

    static noSpaces(control: AbstractControl) {
        let val = control.value;
        // if(!val) return  { 'invalid': true }
        if (val.trim() == "") return { 'invalid': true }
        return null;
    }

    static isLegalAge(control: AbstractControl) {
        if (control.value) {
            let val: Date = control.value;
            const today = new Date();
            const difference = today.getFullYear() - val.getFullYear();
            if (difference < 18) return { 'ilegalAge': true };
        }
        return null;
    }
}