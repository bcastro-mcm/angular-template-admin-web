import { ModelSelect, ParamGetApi } from "@models/public.model";
import { AppText } from "@utils/app-text";


export interface NewStore {
    name:         string;
    company:      string;
    office_hours: Location;
    schedule:     string;
    country:      string;
    state:        string;
    location:     Location;
    city:         string;
    email:        string;
    address:      string;
    address_ref:  string;
    phones:       string;
}

export const OPTIONS_BUSINESS: ModelSelect[] = [
    { label: AppText.las_fragancias, value: 'las_fragancias' },
    { label: AppText.burbujas, value: 'burbujas' },
    { label: AppText.secretos_del_bano, value: 'secretos_del_bano' },
]

export enum EnumBusiness {
    FRAGANCIAS = 'las_fragancias',
    BURBUJAS = 'burbujas',
    SECRETOS = 'secretos_del_bano',
}

export interface ParamApiStore extends ParamGetApi {
    company: EnumBusiness;
    city?: string;
}

export interface OptionStore {
    company: EnumBusiness;
    logo: string;
}

export interface IStore {
    _id:          string;
    name:         string;
    company:      EnumBusiness;
    office_hours: IOfficeHours;
    location:     ILocation;
    country:      string;
    email:        string;
    state:        string;
    city:         string;
    address:      string;
    address_ref:  string;
    phones:       string;
    schedule:     string;
    created_at:   Date;
    __v:          number;
}

export interface ILocation {
    latitude:  string;
    longitude: string;
    _id:       string;
}

export interface IOfficeHours {
    monday:    IDay;
    tuesday:   IDay;
    wednesday: IDay;
    thursday:  IDay;
    friday:    IDay;
    saturday:  IDay;
    sunday:    IDay;
    _id:       string;
}

export interface IDay {
    start: string;
    end:   string;
}