import { Component } from '@angular/core';
import { IAbout } from '@infrastructure/dto/about.dto';
import { SectionsService } from '@infrastructure/services/sections.service';
import { Paginator } from '@models/api.model';
import { ColumnsData, ParamGetApi } from '@models/public.model';
import { GlobalService } from '@services/global.service';
import { AppText } from '@utils/app-text';
import { clone } from '@utils/app-utils';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-about-app',
  templateUrl: './about-app.component.html',
  styleUrl: './about-app.component.scss'
})
export class AboutAppComponent {

  txt = AppText

  columns: ColumnsData[] = [
    {
      label: 'title',
      maxWidth: 200
    },
    {
      label: 'description'
    },
    {
      label: 'actions',
      maxWidth:90,
      align: 'justify-content-center',
      colorAction: 'warn',
      iconAction: 'delete_forever'
    }
  ]

  datasource: IAbout[] = []
  paginator!: Paginator

  isLoad: boolean = false;

  paramApi: ParamGetApi = {
    page: 1,
    limit: 15
  }


  constructor(
    private _sections:SectionsService,
    private _global:GlobalService
  ) {
    this.getSections()
  }


  async actionSection(section?:IAbout){
    const ref = await this._sections.modalNewSection(section)
    const data = await lastValueFrom( ref.afterClosed() )
    if(data){
      this.paramApi.page = 1
      this.getSections()
    }
  }

  async getSections(){
    this.isLoad = true
    const response = await this._sections.getSections(this.paramApi)

    if (response) {
      this.datasource = clone(response.data.about)
      this.paginator = clone(response.meta.paginatorInfo)
    }

    this.isLoad = false
  }

  onSearch(query:string){
    this.paramApi.query = query
    this.paramApi.page = 1
    this.getSections()
  }

  onChangePage(event:Paginator){
    this.paginator = event;
    this.paramApi.page = event.currentPage
    this.paramApi.limit = event.perPage
    this.getSections()
  }

  async deleteAbout(event:IAbout){
    const isConfirm = await this._global.dialogConfirm({
      title: AppText.delete_register,
      msg: AppText.msg_delete_section
    })

    if(isConfirm){
      console.log("🚀 ~ deleteNotification ~ isConfirm:", isConfirm)
      const response = await this._sections.deleteAbout(event._id)
      if(response){
        this.paramApi.page = 1
        this.getSections()
      }
    }
  }
}
