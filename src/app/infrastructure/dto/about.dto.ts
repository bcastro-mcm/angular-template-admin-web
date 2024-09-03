export interface IAbout {
    _id:         string;
    title:       string;
    description: string;
    created_at:  Date;
    __v:         number;
}


export interface NewSection {
    title:       string;
    description: string;
}