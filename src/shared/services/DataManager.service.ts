import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class DataManagerService {
    constructor() {}

    getToken() {
        return localStorage.getItem('JWTtoken')
    }

    setToken(itemValue: string) {
        localStorage.setItem('JWTtoken', itemValue);
    }

    getUserContext() {}

}