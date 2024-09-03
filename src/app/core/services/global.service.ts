import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, Inject, inject, Injectable } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MaterialModule } from '@app/material.module';
import { AppLoaderComponent } from '@components/app-loader/app-loader.component';
import { DialogConfirm, ModalInfoComponent } from '@modals/modal-info/modal-info.component';
import { APIError, ApiSuccess, ResponseAPI } from '@models/api.model';
import { DialogData, MapperError } from '@models/public.model';
import { ApiMessages } from '@utils/api-msg';

import { AppText } from '@utils/app-text';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  /** @description  Stores user data key */
  STORAGE_USER: string = 'geoidentify-admin:user';
  /** @description Store session token key. */
  STORAGE_TOKEN_AUTH: string = 'geoidentify-admin:token-auth';

  constructor(
    private matDialog: MatDialog,
    private matSnackBar: MatSnackBar
  ) {}

  //#region LOCALSTORAGE FUNCTIONS *****************

  public saveData(key: string, value: any) {
    const valueStr = JSON.stringify(value);
    localStorage.setItem(key, valueStr);
  }

  public getData(key: string) {
    const valueStr = localStorage.getItem(key) ?? '';

    if(valueStr.length > 0){
      return JSON.parse(valueStr);
    }

    return null;
  }

  public removeData(key: string) {
    localStorage.removeItem(key);
  }

  public clearData() {
    localStorage.clear();
  }

  //#endregion


  //#region  UI FUNCTIONS *******************

  /**
   * Shows a loading dialog with an optional message.
   *
   * @param {string} message - The message to display in the loading dialog. Defaults to "AppText.wait".
   * @return {MatDialogRef} - The reference to the opened loading dialog.
   */
  showLoading( message: string = AppText.wait ): MatDialogRef<any> {
    const ref = this.matDialog.open( AppLoaderComponent, {
      data: message,
      disableClose: true
    });
    return ref;
  }

  /**
   * Show the info dialog with the given parameters.
   *
   * @param {DialogData} params - The data to be passed to the dialog.
   * @return {MatDialogRef<ModalInfoComponent>} The reference to the opened dialog.
   */
  showInfo(params: DialogData, disableClose:boolean = false): MatDialogRef<ModalInfoComponent>{
    const dialogRef = this.matDialog.open(ModalInfoComponent, { data: params, disableClose });
    return dialogRef;
  }

  /**
   * Asynchronously opens a dialog with a confirmation message and waits for the user's response.
   *
   * @param {Object} params - An object containing the title and message of the dialog.
   * @param {string} params.title - The title of the dialog.
   * @param {string} params.msg - The message of the dialog.
   * @return {Promise<any>} A promise that resolves with the user's response to the dialog.
   */
  async dialogConfirm(params: { title:string, msg:string }): Promise<any> {
    const dialogRef = this.matDialog.open(DialogConfirm, { data: params });
    const resp = await lastValueFrom(dialogRef.afterClosed())
    return resp;
  }

  /**
   * Shows a toast message with the given message.
   *
   * @param {string} message - The message to be displayed in the toast.
   */
  showToast(message: string){
    this.matSnackBar.open( message, AppText.ok, {
       verticalPosition: 'top',
       horizontalPosition: 'right',
       duration: 6000,
       panelClass: 'hospihome-toast'
    });
  }


  showToastLoad(){
    const ref = this.matSnackBar.openFromComponent(LoaderToast , {
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: 'hospihome-toast'
    })

    return ref
  }

  //#endregion

  /**
   * Checks if the API response is invalid.
   *
   * @param {ResponseAPI} response - The API response.
   * @return {boolean} Returns true if the response is a success, otherwise false.
   */
  isInvalidResponse( response: ResponseAPI ): boolean {

    if( response.error ) throw( response.error );

    if( response.value !== ApiSuccess ){
      this.showInfo({ msg: response.message });
      return true;
    }

    return false;
  }


  /**
   * Handle an error in the API response and display an appropriate message.
   *
   * @param {HttpErrorResponse | any} catchErr - The error object to be handled.
   */
  catchError( catchErr: HttpErrorResponse | any ){
    console.log("🚀 ~ catchError ~ error", catchErr);

    if(catchErr instanceof HttpErrorResponse){
      if(catchErr.error){

        const errTemp:any = {...catchErr.error.error};

        if(errTemp.options){
          if(errTemp.options.description){
            this.showInfo({
              title: AppText.operation_no_completed,
              msg: errTemp.options.description
            });
            return;
          }
        }

        const errApi: APIError = {...catchErr.error.error};
        const msg = ApiMessages[errApi.message as keyof typeof ApiMessages];

        if(msg){
          this.showInfo({
            title: AppText.operation_no_completed,
            msg: msg.toString()
          });
          return;
        }
      }
    }

    if(catchErr instanceof MapperError){
      this.showToast(catchErr.message);
      return;
    }

    if( 'isError' in catchErr && 'message' in catchErr){
      this.showInfo({msg: catchErr.message});
      return;
    }

    this.showToast( AppText.gloabal_err );
  }
}

@Component({
  selector: 'loader-toast',
  template: `
    <div class="d-flex gap-12 align-items-center flex-wrap animated-show">
        <mat-spinner diameter="24" strokeWidth="4"></mat-spinner>
        Enviando notificación, por favor no cierre ni recargue la página...
    </div>
  `,
  styles: `
    .example-pizza-party {
      color: hotpink;
    }
  `,
  standalone: true,
  imports:[MaterialModule]
})
export class LoaderToast {}
