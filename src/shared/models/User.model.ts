export class User {
    public firstName: string;
    public lastName: string;
    public password: string;
    public mobile: string;
    public email: string;
    public confirmPassword: string;

    constructor() {
        this.email = '';
        this.firstName = '';
        this.lastName = "";
        this.mobile = "";
        this.password = "";
        this.confirmPassword = "";
    }
}