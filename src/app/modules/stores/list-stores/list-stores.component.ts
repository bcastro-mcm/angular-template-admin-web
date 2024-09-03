import { Component } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { Router } from '@angular/router';
import { EnumBusiness, IStore, ParamApiStore } from '@infrastructure/dto/stores.dto';
import { StoresService } from '@infrastructure/services/stores.service';
import { Paginator } from '@models/api.model';
import { ColumnsData, ParamGetApi } from '@models/public.model';
import { GlobalService } from '@services/global.service';
import { AppRoutes } from '@utils/app-routes';
import { AppText } from '@utils/app-text';
import { clone } from '@utils/app-utils';

@Component({
  selector: 'app-list-stores',
  templateUrl: './list-stores.component.html',
  styleUrl: './list-stores.component.scss'
})
export class ListStoresComponent {

  txt = AppText

  columns: ColumnsData[] = [
    {
      label: 'city',
      maxWidth: 130
    },
    {
      label: 'address'
    },
    // {
    //   label: 'address_ref'
    // },
    {
      label: 'schedule',
      align: 'justify-content-center',
    },
    {
      label: 'phones',
      maxWidth: 180
    },
    {
      label: 'actions',
      maxWidth:95,
      align: 'justify-content-center',
      colorAction: 'warn',
      iconAction: 'delete_forever'
    },
  ]

  datasource: IStore[] = []
  paginator!: Paginator

  isLoad: boolean = false;

  paramApi: ParamApiStore = {
    company: EnumBusiness.FRAGANCIAS,
    page: 1,
    limit: 15
  }

  business = EnumBusiness

  constructor(
    private router:Router,
    private _stores:StoresService,
    private _global:GlobalService
  ){
    this.getStores()
  }

  addStore(){
    this.router.navigate([AppRoutes.add_store])
  }

  onChangeBusiness(event:MatButtonToggleChange){
    console.log("🚀 ~ onChangeBusiness ~ event:", event)
    this.paramApi.company = event.value
    this.paramApi.page = 1
    this.getStores()
  }

  onSearch(query:string){
    this.paramApi.query = query
    this.paramApi.page = 1
    this.getStores()
  }

  onChangePage(event:Paginator){
    this.paginator = event;
    this.paramApi.page = event.currentPage
    this.paramApi.limit = event.perPage
    this.getStores()
  }

  async getStores(){
    this.isLoad = true
    const response = await this._stores.getStores(this.paramApi)
    console.log("🚀 ~ getStores ~ stores:", response)

    if (response) {
      this.datasource = clone(response.data.stores)
      this.paginator = clone(response.meta.paginatorInfo)
    }

    this.isLoad = false
  }

  openStore( event:IStore ){
    this.router.navigate([AppRoutes.edit_store( event._id )])
  }

  async deleteStore( event:IStore){
    const isConfirm = await this._global.dialogConfirm({
      title: AppText.delete_register,
      msg: AppText.msg_delete_store
    })

    if(isConfirm){
      console.log("🚀 ~ deletestore ~ isConfirm:", isConfirm)
      const response = await this._stores.deleteStore(event._id)
      if(response){
        this.paramApi.page = 1
        this.getStores()
      }
    }
  }
}
