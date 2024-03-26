import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environment";
import { Lot } from "../models/Lot";
import { DataManagerService } from "./DataManager.service";

@Injectable({
    providedIn: 'root'
})
export class LotService {

    constructor(private httpClient: HttpClient, private dms: DataManagerService) {

    }

    getAllLots(eventId: string) {
        let url = environment.baseUrl + `api/lots/event/${eventId}`;
        return this.httpClient.get(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.dms.getToken()}`
            }
        });
    }

    saveLot(lot: Lot) {
        let url = environment.baseUrl + `api/lots`;
        return this.httpClient.post(url, {
            "_id": lot.id,
            "name": lot.name,
            "eventId" : this.dms.getDataStoreValue("eventId"),
            "description": lot.description,
            "has_item": this.getLotItems(lot),
            // "eventId": 
        },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.dms.getToken()}`
                }
            });
    }

    private getLotItems(lot: Lot) {
        let items_payload:any[] = [];
        lot.items.forEach(item => {
            items_payload.push({
                "_id": item._id,
                "name": item.name,
                "description": "",
                "basePrice": item.basePrice,
                "quantity": item.quantity
            })
        })
        return items_payload;
    }

    deleteItem(id:any) {
        let url = environment.baseUrl + `api/lots/deleteitem/${id}`;
        return this.httpClient.get(url,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.dms.getToken()}`
            }
        }); 
    }

    deleteLot(ids:any[]) {
        let url = environment.baseUrl + `api/lots/deletelot`;
        return this.httpClient.post(url,ids,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.dms.getToken()}`
            }
        }); 
    }

}