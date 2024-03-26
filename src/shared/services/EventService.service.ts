import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"
import { environment } from "../../environment";
import { DataManagerService } from "./DataManager.service";

@Injectable({
    providedIn: 'root'
})
export class EventService {

    constructor(private httpClient: HttpClient, private dms: DataManagerService) {

    }

    createEvent(event: any) {
        let url = environment.baseUrl + "api/event/createevent";
        return this.httpClient.post(url, event, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.dms.getToken()}`
            }
        });
    }

    updateEvent(event: any) {
        let url = environment.baseUrl + "api/event/updateevent";
        return this.httpClient.post(url, event, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.dms.getToken()}`
            }
        });
    }

    getAllEvents() {
        let url = environment.baseUrl + "api/event/getallevents";
        return this.httpClient.get(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.dms.getToken()}`
            }
        });
    }

    getEventById(eventId: number) {
        let url = environment.baseUrl + `api/event/geteventbyid/${eventId}`
        return this.httpClient.get(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.dms.getToken()}`
            }
        });
    }

    addSuppliers(selectedSuppliers: any[], eventId: number) {
        let url = environment.baseUrl + `api/event/addsupplier/${eventId}`;
        return this.httpClient.post(url, selectedSuppliers, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.dms.getToken()}`
            }
        });
    }

    getAddedSuppliers(eventId: any) {
        let url = environment.baseUrl + `api/supplier/getaddedsuppliers/${eventId}`;
        return this.httpClient.get(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.dms.getToken()}`
            }
        });
    }

    submitAuction(eventId: number) {
        let url = environment.baseUrl + `api/event/submitauction/${eventId}`;
        return this.httpClient.post(url, {}, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.dms.getToken()}`
            }
        });
    }

    acceptEvent(eventId: number) {
        let url = environment.baseUrl + `api/event/acceptevent/${eventId}`;
        return this.httpClient.post(url, {}, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.dms.getToken()}`
            }
        });
    }

    rejectEvent(eventId: number) {
        let url = environment.baseUrl + `api/event/rejectevent/${eventId}`;
        return this.httpClient.post(url, {}, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.dms.getToken()}`
            }
        });
    }

    



}

