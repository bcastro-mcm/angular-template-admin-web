import { Directive, ElementRef, HostListener } from '@angular/core';

/**
 * @description
 * DIRECTIVE TO GO NEXT INPUT PRESS ENTER KEY.
 * The input element must be inside form.
 */
@Directive({
  selector: '[enterNextInput]'
})
export class EnterNextInputDirective {

  constructor(private elementRef: ElementRef) {}

  @HostListener('keydown.enter', ['$event'])
  onEnter(event: KeyboardEvent) {
    event.preventDefault();
    event.stopPropagation();
    const form = this.elementRef.nativeElement.form;
    const index = Array.prototype.indexOf.call(form, this.elementRef.nativeElement);
    if (index >= 0 && index < form.length - 1) {
      const nextElement = form.elements[index + 1];
      if (nextElement) {
        nextElement.focus();
      }
    }
  }
}
