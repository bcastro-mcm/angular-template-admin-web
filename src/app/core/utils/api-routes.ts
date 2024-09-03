import { ParamApiStore } from "@infrastructure/dto/stores.dto";
import { ParamGetApi } from "@models/public.model";
import { environment } from "src/environments/environment.development";

const url = environment.apiUrl;

export class Api {
    static readonly login = `${url}auth/login-admin`;
    static readonly register = `${url}auth/register`;
    static readonly requestResetPassword = `${url}auth/request-reset-password`;
    static readonly verifyCodeReset = `${url}auth/verify-token-reset`;
    static readonly resetPassword = `${url}auth/reset-password`;
    static readonly getUser = (id:string ) => `${url}users/${id}`;
    static readonly listUsers = ( param:ParamGetApi ) => {
        let urlApi = `${url}users?page=${param.page}&limit=${param.limit}`;
        if( param.query ) urlApi += `&q=${param.query}`;
        return urlApi;
    }

    static readonly notifications = `${url}notifications`;
    static readonly notification = (id:string ) =>  `${url}notifications/${id}`;

    static readonly getNotifications = ( param:ParamGetApi ) => {
        let urlApi = `${url}notifications?page=${param.page}&limit=${param.limit}`;
        if( param.query ) urlApi += `&q=${param.query}`;
        return urlApi;
    }

    static readonly about = `${url}about`;
    static readonly getAbout = (id:string ) =>  `${url}about/${id}`;
    static readonly getSections = ( param:ParamGetApi ) => {
        let urlApi = `${url}about?page=${param.page}&limit=${param.limit}`;
        if( param.query ) urlApi += `&q=${param.query}`;
        return urlApi;
    }

    static readonly createStore = `${url}stores`;
    static readonly getStore = (id:string ) =>  `${url}stores/${id}`;


    static readonly getStores = ( param:ParamApiStore ) => {
        let urlApi = `${url}stores?page=${param.page}&limit=${param.limit}&company=${param.company}`;
        if( param.query ) urlApi += `&q=${param.query}`;
        if( param.city ) urlApi += `&city=${param.city}`;
        return urlApi;
    }

    static readonly getLevel = (id:string ) =>  `${url}points/${id}`;
    static readonly createLevel = `${url}points`;

    static readonly getLevels = ( param:ParamGetApi ) => {
        let urlApi = `${url}points?page=${param.page}&limit=${param.limit}`;
        if( param.query ) urlApi += `&q=${param.query}`;
        return urlApi;
    }

    static readonly getOnboarding = (id:string ) =>  `${url}onboarding/${id}`;
    static readonly createOnboarding = `${url}onboarding`;
    static readonly getOnboardings = ( param:ParamGetApi ) => {
        let urlApi = `${url}onboarding?page=${param.page}&limit=${param.limit}`;
        if( param.query ) urlApi += `&q=${param.query}`;
        return urlApi;
    }
}