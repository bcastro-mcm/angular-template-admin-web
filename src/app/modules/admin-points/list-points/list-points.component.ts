import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IRange } from '@infrastructure/dto/points.dto';
import { PointsService } from '@infrastructure/services/points.service';
import { Paginator } from '@models/api.model';
import { ColumnsData, ParamGetApi } from '@models/public.model';
import { GlobalService } from '@services/global.service';
import { AppRoutes } from '@utils/app-routes';
import { AppText } from '@utils/app-text';
import { clone } from '@utils/app-utils';

@Component({
  selector: 'app-list-points',
  templateUrl: './list-points.component.html',
  styleUrl: './list-points.component.scss'
})
export class ListPointsComponent {

  txt = AppText

  columns: ColumnsData[] = [
    {
      label: 'name_level',
      align: 'justify-content-center'
    },
    {
      label: 'range',
      align: 'justify-content-center'
    },
    {
      label: 'color',
      align: 'justify-content-center',
      isColor: true
    },
    {
      label: 'actions',
      maxWidth:95,
      align: 'justify-content-center',
      colorAction: 'warn',
      iconAction: 'delete_forever'
    },
  ]

  datasource: IRange[] = []
  paginator!: Paginator

  isLoad: boolean = false;

  paramApi: ParamGetApi = {
    page: 1,
    limit: 15
  }


  constructor(
    private router:Router,
    private _points:PointsService,
    private _global:GlobalService
  ){
    this.getLevels()
  }

  addLevel(){
    this.router.navigate([AppRoutes.add_level])
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
    const response = await this._points.getLevelPoints(this.paramApi)
    console.log("🚀 ~ getStores ~ stores:", response)

    if (response) {
      this.datasource = clone(response.data.points)
      this.paginator = clone(response.meta.paginatorInfo)
    }

    this.isLoad = false
  }

  openLevel( event:IRange ){
    this.router.navigate([AppRoutes.edit_level( event._id )])
  }

  async deleteLevel( event:IRange){
    const isConfirm = await this._global.dialogConfirm({
      title: AppText.delete_register,
      msg: AppText.msg_delete_level
    })

    if(isConfirm){
      console.log("🚀 ~ deletestore ~ isConfirm:", isConfirm)
      const response = await this._points.deleteLevel(event._id)
      if(response){
        this.paramApi.page = 1
        this.getLevels()
      }
    }
  }
}
