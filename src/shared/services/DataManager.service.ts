import { keyframes } from "@angular/animations";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class DataManagerService {
    private dataStore: Map<string, any>;

    constructor() {
        this.dataStore = new Map<string, any>();
    }

    setDataStoreValue(keyValue: string, value: any) {
        this.dataStore.set(keyValue, value);
    }

    getDataStoreValue(keyValue: string) {
        return this.dataStore.get(keyValue);
    }

    getToken() {
        return localStorage.getItem('JWTtoken');
    }

    setToken(itemValue: string) {
        let tokenValues: string[] = itemValue.split(".");
        let userInfo = null
        if (tokenValues && tokenValues.length == 3) {
            let userInfoToken = tokenValues[1];
            userInfo = JSON.parse(atob(userInfoToken));
        }
        localStorage.setItem("UserInfo", JSON.stringify(userInfo));
        localStorage.setItem('JWTtoken', itemValue);
    }

    getUserInfo() {
        var userInfo = localStorage.getItem("UserInfo");
        return userInfo ? JSON.parse(userInfo) : null;
    }

    clearToken() {
        localStorage.removeItem("JWTtoken");
        localStorage.removeItem("UserInfo");
    }

    getUserContext() { }

}