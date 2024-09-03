export type StepsRecoveryPassword = 'send_code' | 'enter_code' | 'new_password';


export interface ParamsAuth {
    email: string;
    password: string;
}

export class ResetPassword {

    public email: string = "";
    public resetToken: string = "";
    public newPassword: string = "";
    public newPassword2: string = "";

    constructor(data: ResetPassword) {
        Object.assign(this, data);
    }
}