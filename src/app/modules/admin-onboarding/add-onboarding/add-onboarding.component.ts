import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OnboardingService } from '@infrastructure/services/onboarding.service';
import { PublicService } from '@infrastructure/services/public.service';
import { GlobalService } from '@services/global.service';
import { AppRoutes } from '@utils/app-routes';
import { processImage, urlAsset } from '@utils/app-utils';
import { CustomValidator } from '@utils/validations';

@Component({
  selector: 'app-add-onboarding',
  templateUrl: './add-onboarding.component.html',
  styleUrl: './add-onboarding.component.scss'
})
export class AddOnboardingComponent {

  acceptedFormatImg = "image/png, image/jpeg, image/jpg";

  isEditMode: boolean = false
  idEdit: string | undefined
  noExist: boolean = false

  formNew = this.form.group({
    step:[0, [Validators.required, Validators.min(1)]],
    title:['', [Validators.required, CustomValidator.noSpaces, Validators.minLength(3)]],
    description:['', [Validators.required, CustomValidator.noSpaces, Validators.minLength(5)]],
    image:[ '', [Validators.required, Validators.minLength(1)]],
  })

  fileImg: File | undefined
  inputImages!:HTMLInputElement;
  imageBase64: string = ''


  constructor(
    private router:Router,
    private activeRoute:ActivatedRoute,
    private form:FormBuilder,
    public _public:PublicService,
    private _onboarding:OnboardingService,
    private _global:GlobalService
  ){
    this.isEditMode = this.router.url.includes('edit')
    this.idEdit = this.activeRoute.snapshot.params['id']

    this.getLevel()
  }

  selectFile(event:Event){}

  async getLevel(){
    if (!this.idEdit) return

    const response = await this._onboarding.getOnboarding( this.idEdit )

    if(response){

      const { description,image,step,title } = response

      this.formNew.patchValue({
        step,
        title,
        description,
        image
      })

      this.imageBase64 = urlAsset(image)

      console.log(this.formNew.value);

      return
    }

    this.noExist = true
  }


  onOpenImageSelector(){
    const loader = this._global.showLoading();
    setTimeout(() => loader.close(), 1000);

    this.inputImages = document.querySelector('#fileInput') as HTMLInputElement;

    this.inputImages.addEventListener('change', async ( event ) => {
      const target = event.target as HTMLInputElement;
      if(!target.files) return;

      const files = target.files;
      const image = await processImage(files.item(0)!)
      this.imageBase64 = image.base64

      const { image:imgCtrl  } = this.formNew.controls
      imgCtrl.setValue(image.base64)

      this.fileImg = files.item(0)!;
    });
  }

  onValidate(){
    this.formNew.markAllAsTouched()
    console.log(this.formNew.value);
    if(this.formNew.invalid) return

    if (this.isEditMode) {
      this.updateStore()
      return
    }
    this.createStore()
  }


  public get payload() : any {
    const { step,description,title, image } = this.formNew.value
    const payload:any = {
      step: step!,
      title: title!,
      description: description,
      image: image
    }
    return payload
  }

  cancel(){
    this.router.navigate([AppRoutes.list_onboarding])
  }

  async createStore(){
    const response = await this._onboarding.createOnboarding(this.payload, this.fileImg!)

    if(response){
      this.router.navigate([AppRoutes.list_onboarding])
    }
  }

  async updateStore(){
    await this._onboarding.updateOnboarding( this.idEdit!, this.payload)
  }
}
