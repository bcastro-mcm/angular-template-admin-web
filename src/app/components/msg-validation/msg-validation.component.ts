import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ValidatorService } from '@infrastructure/services/validator.service';

@Component({
  selector: 'msg-validation',
  templateUrl: './msg-validation.component.html',
  styleUrl: './msg-validation.component.scss'
})
export class MsgValidationComponent {

  /** Name of de field form assigned */
  @Input() formField!: string;
  /** Text color to message */
  @Input() textColor!: string;
  /** The FormGrup when formField exist */
  @Input() formCtrl!:  FormGroup<any>;
  /** Define if message is floating ignoring the margin/gap/padding of container @default false */
  @Input() isFloat: boolean = true;
  /** Define simple message to show, without use Form @default '' */
  @Input() message: string = '';
  /** Define if message have padding @default true */
  @Input() withMargin: boolean = true;

  constructor(
    public _validator:ValidatorService
  ) { }
}
