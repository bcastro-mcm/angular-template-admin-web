import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPipe } from './filter.pipe';
import { AppTextPipe, CapitalizePipe, CutTextPipe } from './texts.pipe';



@NgModule({
  declarations: [
    FilterPipe,
    AppTextPipe,
    CapitalizePipe,
    CutTextPipe
  ],
  exports:[
    FilterPipe,
    AppTextPipe,
    CapitalizePipe,
    CutTextPipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
