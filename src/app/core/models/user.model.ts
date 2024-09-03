export interface UserApp {
    id:number,
    name:string,
    biography?: string
    business_role?: string
    url_linkendin?: string
    profile_image?: string
    isActive?: boolean
    location?: {
        latitude: string;
        longitude: string;
    }
}

export interface UsersColumnsTable {
    id: string;
    title: string;
}