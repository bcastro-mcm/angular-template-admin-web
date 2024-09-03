import { Injectable } from '@angular/core';
import { StateData } from '@models/public.model';
import { AppText } from '@utils/app-text';

@Injectable({
  providedIn: 'root'
})
export class PublicService {

  private _listStates: StateData[] = [];

  constructor() { }

  public get listStates(): StateData[] {
    return this._listStates;
  }

  public set listStates(value: StateData[]) {
    this._listStates = value;
  }


  txt(txt: string) {
    return (AppText[txt as keyof typeof AppText] ?? txt) as string;
  }

}
