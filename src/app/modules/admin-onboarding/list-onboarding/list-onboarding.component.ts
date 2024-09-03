import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OnboardingService } from '@infrastructure/services/onboarding.service';
import { Paginator } from '@models/api.model';
import { ColumnsData, ParamGetApi } from '@models/public.model';
import { GlobalService } from '@services/global.service';
import { AppRoutes } from '@utils/app-routes';
import { AppText } from '@utils/app-text';
import { clone } from '@utils/app-utils';

@Component({
  selector: 'app-list-onboarding',
  templateUrl: './list-onboarding.component.html',
  styleUrl: './list-onboarding.component.scss'
})
export class ListOnboardingComponent {
  txt = AppText

  columns: ColumnsData[] = [
    {
      label: 'step',
      align: 'justify-content-center',
      maxWidth: 100
    },
    {
      label: 'image',
      align: 'justify-content-center',
      isImg: true
    },
    {
      label: 'title',
      align: 'justify-content-center'
    },
    // {
    //   label: 'description',
    //   align: 'justify-content-center',
    // },
    {
      label: 'actions',
      maxWidth:95,
      align: 'justify-content-center',
      colorAction: 'warn',
      iconAction: 'delete_forever'
    },
  ]

  datasource: any[] = []
  paginator!: Paginator

  isLoad: boolean = false;

  paramApi: ParamGetApi = {
    page: 1,
    limit: 15
  }


  constructor(
    private router:Router,
    private _onboarding:OnboardingService,
    private _global:GlobalService
  ){
    this.getLevels()
  }

  addOnboarding(){
    this.router.navigate([AppRoutes.add_onboarding])
  }


  onSearch(query:string){
    this.paramApi.query = query
    this.paramApi.page = 1
    this.getLevels()
  }

  onChangePage(event:Paginator){
    this.paginator = event;
    this.paramApi.page = event.currentPage
    this.paramApi.limit = event.perPage
    this.getLevels()
  }

  async getLevels(){
    this.isLoad = true
    const response = await this._onboarding.getOnboardings(this.paramApi)
    console.log("🚀 ~ getStores ~ stores:", response)

    if (response) {
      this.datasource = clone(response.data.onboarding)
      this.paginator = clone(response.meta.paginatorInfo)
    }

    this.isLoad = false
  }

  openOnboarding( event:any ){
    this.router.navigate([AppRoutes.edit_onboarding( event._id )])
  }

  async deleteLevel( event:any){
    const isConfirm = await this._global.dialogConfirm({
      title: AppText.delete_register,
      msg: AppText.msg_delete_onboarding
    })

    if(isConfirm){
      console.log("🚀 ~ deletestore ~ isConfirm:", isConfirm)
      const response = await this._onboarding.deleteOnboarding(event._id)
      if(response){
        this.paramApi.page = 1
        this.getLevels()
      }
    }
  }
}
