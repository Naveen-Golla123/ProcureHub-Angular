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
        return this.httpClient.post(url, event,{headers : {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.dms.getToken()}`
          }});
    }

    updateEvent(event: any) {
        let url = environment.baseUrl + "api/event/updateevent";
        return this.httpClient.post(url, event,{headers : {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.dms.getToken()}`
          }});
    }

    getAllEvents() {
        let url = environment.baseUrl + "api/event/getallevents";
        return this.httpClient.get(url, {headers : {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.dms.getToken()}`
          }});
    }

    getEventById(eventId:number) {
        let url = environment.baseUrl +`api/event/geteventid/geteventbyid/${eventId}`
        return this.httpClient.get(url, {headers : {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.dms.getToken()}`
        }});
    }

}

