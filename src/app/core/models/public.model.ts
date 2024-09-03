import { ILocation } from "@infrastructure/dto/stores.dto";
import { AppText } from "@utils/app-text";

export interface DialogData {
    /**
     * Here should enter a translation key.
     */
    title?: string;
    /**
     * Here should enter a translation key.
     */
    msg: string;
    /**
     * Here should add custom button actions to dialog
     */
    actions?: DialogActions[];
}

export interface DialogActions {
    text: AppText;
    action: VoidFunction;
}

export interface DialogConfirmData {
    /**
     * Here indicates if modal have input.
     */
    haveInput: boolean;
    /**
     * Here should enter a translation key.
     */
    msg: string;
}


export interface RespModalConfirm {
    isConfirm: boolean;
    value: string;
}

export interface Photo {
    /**
     * The url starting with 'data:image/jpeg;base64,' and the base64 encoded string representation of the image.
     */
    base64: string;
    /**
     * webPath returns a path that can be used to set the src attribute of an image for efficient
     * loading and rendering.
     */
    webPath?: string;
    /**
     * The format of the image, ex: jpeg, png, etc.
     */
    format: string;
}

export type AlignComlun = 'justify-content-center' | 'justify-content-start' | 'justify-content-end';

export interface ColumnsData {
    label: string;
    maxWidth?: number;
    isImg?: boolean;
    align?: AlignComlun;
    sort?: boolean;
    isColor?: boolean;
    isBadge?: boolean;
    iconAction?: string;
    colorAction?: 'primary' | 'accent' | 'warn'
}

export class MapperError {
    constructor(
        public message: string,
    ){}
}

export interface ParamGetApi {
    query?: string;
    page: number;
    limit: number;
}

export enum TypeView {
    LIST = 'list',
    GRID = 'grid'
}

export interface ModelSelect {
    value: string;
    label: string;
}


export interface StateData {
    id: number;
    location: LocationState;
    name: string;
    cities: CityData[];
}

export interface LocationState {
    lat:  number;
    lng: number;
}

export interface CityData {
    id: string;
    name: string;
    parish: ParishData[]
}

export interface ParishData {
    id: string;
    name: string;
}
