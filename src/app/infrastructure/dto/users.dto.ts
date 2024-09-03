export interface IUserAuth {
    _id:        string;
    email:      string;
    first_name: string;
    last_name:  string;
    role:       string;
    token:      string;
}


export interface UserUpdate {
    email:      string;
    first_name: string;
    last_name:  string;
    password?:  string;
}