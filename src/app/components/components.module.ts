import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppLoaderComponent } from './app-loader/app-loader.component';
import { MaterialModule } from '@app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MsgValidationComponent } from './msg-validation/msg-validation.component';
import { TableLoaderComponent } from './table-loader/table-loader.component';
import { SearchInputComponent } from './search-input/search-input.component';
import { TablerIconsModule } from 'angular-tabler-icons';
import { TableComponent } from './table/table.component';
import { PipesModule } from '@pipes/pipes.module';



@NgModule({
  declarations: [
    AppLoaderComponent,
    MsgValidationComponent,
    TableLoaderComponent,
    SearchInputComponent,
    TableComponent
  ],
  exports: [
    AppLoaderComponent,
    MsgValidationComponent,
    TableLoaderComponent,
    SearchInputComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    TablerIconsModule,
    ReactiveFormsModule,
    PipesModule
  ]
})
export class ComponentsModule { }
