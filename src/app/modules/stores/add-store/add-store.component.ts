import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { NewStore, OPTIONS_BUSINESS } from '@infrastructure/dto/stores.dto';
import { PublicService } from '@infrastructure/services/public.service';
import { StoresService } from '@infrastructure/services/stores.service';
import { CityData, StateData } from '@models/public.model';
import { AppAssets } from '@utils/app-assets';
import { AppRoutes } from '@utils/app-routes';
import { toAwait } from '@utils/app-utils';
import { CustomValidator } from '@utils/validations';
import * as L from 'leaflet';

@Component({
  selector: 'app-add-store',
  templateUrl: './add-store.component.html',
  styleUrl: './add-store.component.scss'
})
export class AddStoreComponent implements OnInit, AfterViewInit {

  mapLeaflet!: L.Map;
  markerStore: L.Marker | undefined

  leafletAttr = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 23,
    attribution: '&copy; <a target="_blank" rel="noopener noreferrer" href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  })

  iconMarker = L.icon({
    iconUrl: AppAssets.markerMap,
    iconSize: [40, 90],
    shadowSize:   [50, 64],
    iconAnchor:   [22, 68]
  });

  formStore = this.form.group({
    name:['', [Validators.required, CustomValidator.noSpaces]],
    company:['', [Validators.required, CustomValidator.noSpaces]],
    schedule:['', [Validators.required,Validators.minLength(5), CustomValidator.noSpaces]],
    country:['EC', [Validators.required]],
    state:['', [Validators.required]],
    latitude:[0, [Validators.required,CustomValidator.validateLatLng]],
    longitude:[0, [Validators.required, CustomValidator.validateLatLng]],
    city:[{value:'', disabled:true}, [Validators.required]],
    email:['', [Validators.required,Validators.email]],
    address:['', [Validators.required, Validators.minLength(8),CustomValidator.noSpaces]],
    address_ref:['', [Validators.minLength(3),CustomValidator.noSpaces]],
    phones:['', [Validators.required, Validators.minLength(7),CustomValidator.noSpaces]],
  })

  business = OPTIONS_BUSINESS
  cities: CityData[] = []

  isEditMode: boolean = false
  idEdit: string | undefined
  noExist: boolean = false

  constructor(
    private router:Router,
    private activeRoute:ActivatedRoute,
    private form:FormBuilder,
    public _public:PublicService,
    private _store:StoresService,
  ){
    this.isEditMode = this.router.url.includes('edit')
    this.idEdit = this.activeRoute.snapshot.params['id']
  }

  ngOnInit(): void {}

  async ngAfterViewInit() {
    await toAwait(100)
    this.loadMap()
    await toAwait(100)
    if( this.isEditMode && !this.idEdit ){
      this.noExist = true
      return
    }
    await this.getStore()
    if (this.isEditMode && !this.noExist) {
      const { latitude, longitude } = this.formStore.value
      const latlng = new L.LatLng(latitude!, longitude!)
      this.markerStore = L.marker(latlng,{icon: this.iconMarker}).addTo(this.mapLeaflet);
      this.mapLeaflet.setView(latlng, 18, { animate: true })
    }
  }

  async getStore(){
    if (!this.idEdit) return

    const response = await this._store.getStore( this.idEdit )

    if(response){

      const { location, state } = response
      const { latitude,longitude } = location

      const {  city:cityCtrl } = this.formStore.controls
      cityCtrl.enable()
      const province = this._public.listStates.find( province => province.name == state )
      if (province)  this.cities = province.cities

      this.formStore.patchValue({
        ...response,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
      })

      console.log(this.formStore.value);

      return
    }

    this.noExist = true
  }

  onSelectProvince(event:MatSelectChange){
    const province:StateData = this._public.listStates.find( item => item.name == event.value)!
    const {  city, name} = this.formStore.controls
    city.setValue('')
    name.setValue(province.name.toUpperCase())
    city.enable()
    this.cities = province.cities
    const { lat, lng } = province.location
    this.mapLeaflet.setView(new L.LatLng(lat, lng),10, { animate: true })
  }

  loadMap(){
    this.mapLeaflet = L.map('map').setView([-1.252341676699616, -78.66210937500001], 7);
    this.leafletAttr.addTo(this.mapLeaflet);
    this.mapLeaflet.on('click', (e) => this.listenerMap(e) )
  }

  listenerMap( e: L.LeafletMouseEvent ) {
    if(this.markerStore) this.mapLeaflet.removeLayer(this.markerStore);

    const { latitude, longitude} = this.formStore.controls

    this.markerStore = L.marker(e.latlng,{icon: this.iconMarker, draggable: true}).addTo(this.mapLeaflet);
    this.mapLeaflet.setView(e.latlng, 18, { animate: true })
    latitude.setValue(e.latlng.lat)
    longitude.setValue(e.latlng.lng)

    const listenerMarker = (event: L.DragEndEvent) => {
      const marker = event.target;
      const position = marker.getLatLng();
      marker.setLatLng(new L.LatLng(position.lat, position.lng),{icon: this.iconMarker, draggable: true});
      latitude.setValue(e.latlng.lat)
      longitude.setValue(e.latlng.lng)
      this.mapLeaflet.setView(new L.LatLng(position.lat, position.lng),18, { animate: true })
    }

    this.markerStore?.on('dragend', listenerMarker );
  }

  onValidate(){
    this.formStore.markAllAsTouched()
    console.log(this.formStore.value);
    if(this.formStore.invalid) return

    if (this.isEditMode) {
      this.updateStore()
      return
    }
    this.createStore()
  }


  public get payload() : NewStore {
    const formData:any = this.formStore.value
    const payload:NewStore = {
      ...formData,
      location:{
        latitude:formData.latitude,
        longitude:formData.longitude
      }
    }
    return payload
  }


  async createStore(){
    const response = await this._store.createStore(this.payload)

    if(response){
      this.router.navigate([AppRoutes.list_stores])
    }
  }

  async updateStore(){
    const response = await this._store.updateStore( this.idEdit!, this.payload)

    if(response){
      this.router.navigate([AppRoutes.list_stores])
    }
  }

  cancel(){
    this.router.navigate([AppRoutes.list_stores])
  }
}
