import { IStore } from "@infrastructure/dto/stores.dto";
import { INotification } from "./notification.model";
import { IAbout } from "@infrastructure/dto/about.dto";
import { IRange } from "@infrastructure/dto/points.dto";
import { IOnboarding } from "@infrastructure/dto/onboarding.dto";
import { IUserAuth } from "@infrastructure/dto/users.dto";


export interface ResponseAPI {
    value:   string;
    data:    DataApi;
    meta:    Meta;
    message: string;
    error:   APIError;
}


export interface APIError {
    response: string;
    status:   number;
    message:  string;
    name:     string;
}

export interface Meta {
    paginatorInfo?: Paginator;
}

export interface DataApi {
    user: IUserAuth;
    token: string;
    notifications: INotification[];
    about: IAbout[];
    stores: IStore[];
    store: IStore;
    notification: INotification;
    points: IRange[];
    point: IRange;
    onboarding: IOnboarding[];
}


export const ApiSuccess = "1";

export const ApiFailed = "2";

export interface Paginator {
    count:        number;
    currentPage:  number;
    firstItem:    StItem;
    lastItem:     StItem;
    hasMorePages: boolean;
    perPage:      number;
    totalPages:   number;
    total:        number;
}

export interface StItem {
    _id: string;
}
