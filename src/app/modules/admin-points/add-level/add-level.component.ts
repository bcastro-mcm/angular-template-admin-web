import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PayloadLevel } from '@infrastructure/dto/points.dto';
import { PointsService } from '@infrastructure/services/points.service';
import { PublicService } from '@infrastructure/services/public.service';
import { AppRoutes } from '@utils/app-routes';
import { CustomValidator } from '@utils/validations';

@Component({
  selector: 'app-add-level',
  templateUrl: './add-level.component.html',
  styleUrl: './add-level.component.scss'
})
export class AddLevelComponent {

  isEditMode: boolean = false
  idEdit: string | undefined
  noExist: boolean = false

  formLevel = this.form.group({
    name:['', [Validators.required, CustomValidator.noSpaces, Validators.minLength(5)]],
    color:['', [Validators.required, CustomValidator.noSpaces]],
    info:['', [Validators.required, CustomValidator.noSpaces, Validators.minLength(5)]],
    range_min:[0, [Validators.required, Validators.min(1), CustomValidator.numeric]],
    range_max:[0, [Validators.min(2), CustomValidator.numeric]],
  })

  constructor(
    private router:Router,
    private activeRoute:ActivatedRoute,
    private form:FormBuilder,
    public _public:PublicService,
    private _points:PointsService,
  ){
    this.isEditMode = this.router.url.includes('edit')
    this.idEdit = this.activeRoute.snapshot.params['id']

    this.getLevel()
  }

  async getLevel(){
    if (!this.idEdit) return

    const response = await this._points.getLevel( this.idEdit )

    if(response){

      const { range_end,range_start } = response.range_points
      this.formLevel.patchValue({
        ...response,
        range_min: range_start,
        range_max: range_end,
      })

      console.log(this.formLevel.value);

      return
    }

    this.noExist = true
  }

  onValidate(){
    this.formLevel.markAllAsTouched()
    console.log(this.formLevel.value);
    if(this.formLevel.invalid) return

    const { range_max,range_min } = this.formLevel.value
    if( range_max && Number(range_max) <= Number(range_min) ) {
      this.formLevel.get('range_max')?.setErrors({ range_max: true })
      return
    }

    if (this.isEditMode) {
      this.updateStore()
      return
    }
    this.createStore()
  }


  public get payload() : PayloadLevel {
    const formData:any = this.formLevel.value
    const payload:PayloadLevel = {
      ...formData,
      range_points:{
        range_start:formData.range_min,
        range_end:formData.range_max
      }
    }
    return payload
  }

  cancel(){
    this.router.navigate([AppRoutes.list_levels])
  }

  async createStore(){
    const response = await this._points.createLevel(this.payload)

    if(response){
      this.router.navigate([AppRoutes.list_levels])
    }
  }

  async updateStore(){
    await this._points.updateLevel( this.idEdit!, this.payload)
  }
}
