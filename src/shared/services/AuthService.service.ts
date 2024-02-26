import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment'
import { User } from "../models/User.model";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient) { }

    signIn(email:string, password:string) {
        return this.http.post<any>(environment.baseUrl + "api/authentication/login", {
            "email" : email,
            "password": password
        });
    }

    signUp(user: User) {
        var url = environment.baseUrl + "api/authentication/registeruser";
        return this.http.post<any>(url,{
            "name": user.firstName + " " + user.lastName,
            "email": user.email,
            "mobile": user.mobile,
            "password": user.password,
            "id": ""
          });
    }

    isEmailAvailable(email: string) {
        var url = environment.baseUrl + "api/authentication/isemailavailable";
        return this.http.post<any>(url,{'email': email});
    }
}