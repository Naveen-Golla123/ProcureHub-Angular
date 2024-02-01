import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor() {

    }

    signIn() {
        console.log("Auth Service SignIn is triggered !!")
        return true;
    }

}