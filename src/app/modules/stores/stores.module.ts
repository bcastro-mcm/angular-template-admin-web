import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoresRoutingModule } from './stores-routing.module';
import { ListStoresComponent } from './list-stores/list-stores.component';
import { AddStoreComponent } from './add-store/add-store.component';
import { BeautyClubModule } from '@app/beautyclub.modules';


@NgModule({
  declarations: [
    ListStoresComponent,
    AddStoreComponent
  ],
  imports: [
    CommonModule,
    StoresRoutingModule,
    BeautyClubModule
  ],
  exports: [
    ListStoresComponent,
    AddStoreComponent
  ]
})
export class StoresModule { }
