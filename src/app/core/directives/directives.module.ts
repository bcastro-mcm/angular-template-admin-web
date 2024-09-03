import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumberInputDirective } from './number-input.directive';
import { OptionsScrollDirective } from './options-scroll.directive';
import { LazyLoadImgDirective } from './lazy-load-img.directive';
import { EnterNextInputDirective } from './enter-next-input.directive';



@NgModule({
  declarations: [
    NumberInputDirective,
    OptionsScrollDirective,
    LazyLoadImgDirective,
    EnterNextInputDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NumberInputDirective,
    OptionsScrollDirective,
    LazyLoadImgDirective,
    EnterNextInputDirective
  ]
})
export class DirectivesModule { }
