import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environment";
import { DataManagerService } from "./DataManager.service";
import { Supplier } from "../models/supplier";

@Injectable({
    providedIn: 'root'
})
export class SupplierService {
    constructor(private httpClient: HttpClient, private dms: DataManagerService){

    }

    getAllSuppliers() {
        let url = environment.baseUrl + 'api/supplier';
        return this.httpClient.get(url, {headers : {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.dms.getToken()}`
          }});
    }

    getInvitedEvents() {
        let url = environment.baseUrl + 'api/event/getinvitedsuppliers';
        return this.httpClient.get(url, {headers : {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.dms.getToken()}`
          }});
    }

    updateSupplierReviews(user: Supplier) {
        let url = environment.baseUrl + 'api/supplier/updatesupplierreviews';
        return this.httpClient.post(url,{
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "isBuyer": false,
            "isAdmin": false,
            "isApproved": true,
            "isSupplier": true,
            "mobile": "string",
            "deliveryReview": user.deliveryReview,
            "qualityReview": user.qualityReview
        },{headers : {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.dms.getToken()}`
          }});
    }


}