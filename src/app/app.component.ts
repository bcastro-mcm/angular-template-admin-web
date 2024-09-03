import { Component, HostListener, OnInit } from '@angular/core';
import { NotificationsService } from '@infrastructure/services/notifications.service';
import { PublicService } from '@infrastructure/services/public.service';
import { UserService } from '@infrastructure/services/user.service';
import { CityData, StateData } from '@models/public.model';
import { AppText } from '@utils/app-text';
import { toCapitalCase } from '@utils/app-utils';
import { statesEcuador } from '@utils/ecuador';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'admin';

  constructor(
    private _user:UserService,
    private _public:PublicService,
    private _notification:NotificationsService
  ){
    // this.registerCustomIcons()
    this._user.currentUser()
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification(event: any): any {

    const isSend = this._notification.evSending.value == 'sending'

    if (isSend) {
      let result = confirm(AppText.MSG_RELOAD_ALERT);
      if (!result) {
        event.returnValue = false;
      }
    }
  }

  ngOnInit(): void {
    this.setStateData()
  }

  setStateData(){
    let listStates: StateData[] = [];

    statesEcuador.map( (state, index:number) => {

      const keyCities = Object.keys( state.cantones );
      let cities: CityData[] = [];
      const list:any = state.cantones;

      keyCities.map( ( keyValue , index) => {

        const parish:string[] = Object.values(list[keyValue].parroquias)

        cities.push({
          id: keyCities[index],
          name: toCapitalCase(list[keyValue].canton),
          parish: parish.map( (item) => {
            return {
              id: item,
              name: item
            }
          })
        })
      })

      listStates.push({
        id: index + 1,
        location: state.location,
        name: toCapitalCase(state.provincia),
        cities: cities
      })
    });

    this._public.listStates = [...listStates];
  }
}
