import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[numberInput]'
})
export class NumberInputDirective {

  /** DEFINE IF INPUT IS FORM INTEGER NUMBERS @default false */
  @Input() isInteger: boolean = false;
  /** DEFINE MAX LENGTH OF THE INPUT */
  @Input() maxNumbers!: number;
  /** DEFINE MAX LIMIT THAT CAN ENTER */
  @Input() maxLimit!: number;
  /** DEFINE MIN LENGTH OF THE INPUT */
  @Input() minNumbers!: number;

  constructor(private el: ElementRef) { }

  @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {

    const keysAllowed = [
      "ArrowRight",
      "ArrowLeft",
      "Backspace",
      "Space",
      "Home",
      "End",
      "Tab",
      "Delete"
    ];

    let e = <KeyboardEvent> event;
    const key = event.key;
    const isInteger =  key == '.' && !this.isInteger;

    if (isInteger || key == '0' || Number(key) || keysAllowed.includes(e.code) || e.metaKey || e.ctrlKey) {
      return;
    }

    e.preventDefault();
  }

  @HostListener('keypress', ['$event']) onKeyPress(event: KeyboardEvent) {


    let e = <KeyboardEvent> event;
    const target = e.target as HTMLInputElement;
    const isOverLimit = this.maxNumbers == target.value.length || this.maxNumbers < target.value.length;

    if (this.maxNumbers && isOverLimit) {
      return false;
    }

    return true;
  }

  @HostListener('wheel', ['$event']) onWheel() {
    const input = this.el.nativeElement as HTMLInputElement;
    input.blur();
    return false;
  }
}
