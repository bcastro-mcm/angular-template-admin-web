import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IAbout, NewSection } from '@infrastructure/dto/about.dto';
import { SectionsService } from '@infrastructure/services/sections.service';
import { AppText } from '@utils/app-text';
import { CustomValidator } from '@utils/validations';

@Component({
  selector: 'app-modal-new-section',
  templateUrl: './modal-new-section.component.html',
  styleUrl: './modal-new-section.component.scss'
})
export class ModalNewSectionComponent {

  txt = AppText

  formSection = this.fb.group({
    title: ['', [Validators.required, CustomValidator.noSpaces,Validators.minLength(3)]],
    description: ['', [Validators.required, CustomValidator.noSpaces,Validators.minLength(10)]],
  });

  constructor(
    private fb:FormBuilder,
    private _section:SectionsService,
    private dialogRef: MatDialogRef<ModalNewSectionComponent>,
    @Inject(MAT_DIALOG_DATA) public sectionParam: IAbout | undefined,

  ){
    this.setForm()
  }

  setForm() {
    if (this.sectionParam) {
      this.formSection.patchValue({
        title: this.sectionParam?.title,
        description: this.sectionParam?.description
      })
    }
  }

  async onSubmit(){
    this.formSection.markAllAsTouched();

    if (this.formSection.invalid) return;

    const { title, description} = this.formSection.value

    const section: NewSection = {
      title: title!,
      description: description!
    }

    if(this.sectionParam){
      const respUpdate = await this._section.updateSection( this.sectionParam._id , section)
      if (respUpdate) {
        this.dialogRef.close(respUpdate.data)
      }
      return
    }

    const respCreate = await this._section.createSection(section)
    if (respCreate) {
      this.dialogRef.close(respCreate.data)
    }
  }

}
