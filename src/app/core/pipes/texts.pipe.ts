import { Pipe, PipeTransform } from '@angular/core';
import { PublicService } from '@infrastructure/services/public.service';
import { capitalize } from '@utils/app-utils';


@Pipe({
  name: 'txt'
})
export class AppTextPipe implements PipeTransform {

  constructor(
    private _public:PublicService
  ){}

  /**
   * Transforms the given value using the txt method from the _public object.
   * @param {string} value - The value to be transformed.
   * @return {string} The transformed value.
   */
  transform(value: string ): string {
    if( typeof value !== 'string') return value;
    if(!value) return value
    // const txt = value.replace('-','_')
    return this._public.txt(value) ?? value
  }

}


@Pipe({
  name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {

  constructor(){}

  /**
   * Capitalizes the first letter of the input string.
   *
   * @param {string} value - The input string to be capitalized.
   * @return {string} The string with the first letter capitalized.
   */
  transform(value: string ): string {
    return capitalize(value)
  }

}



@Pipe({
  name: 'cutTxt'
})
export class CutTextPipe implements PipeTransform {

  constructor(){}

  transform(value: string ): string {
    if( typeof value !== 'string') return value;
    if(!value) return '';
    if(value.length < 75) return value
    return value.substring(0, 220) + '...'
  }

}
