import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '@app/material.module';
import { DialogData } from '@models/public.model';
import { AppText } from '@utils/app-text';

@Component({
  selector: 'app-modal-info',
  templateUrl: './modal-info.component.html',
  styleUrls: ['./modal-info.component.scss']
})
export class ModalInfoComponent {

  txt = AppText;

  constructor(
    public dialogRef: MatDialogRef<ModalInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ){}

}



@Component({
  selector: 'dialog-animations-example-dialog',
  template: `<h2 mat-dialog-title>{{data.title}}</h2>
  <mat-dialog-content>
  {{data.msg}}
  </mat-dialog-content>
  <mat-dialog-actions align="center">
    <button mat-button  mat-dialog-close>Cancelar</button>
    <button mat-button  color="primary" (click)="confirm()" cdkFocusInitial>Confirmar</button>
  </mat-dialog-actions>`,
  standalone: true,
  imports: [MaterialModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogConfirm {
  constructor(
    public dialogRef: MatDialogRef<DialogConfirm>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ){}

  confirm(){
    this.dialogRef.close(true)
  }
}
