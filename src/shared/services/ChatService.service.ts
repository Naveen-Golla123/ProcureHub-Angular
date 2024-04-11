import { Injectable, Injector } from "@angular/core";
import { environment } from "src/environment";
import { DataManagerService } from "./DataManager.service";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class ChatService {
    constructor(private httpClient:HttpClient, private dms: DataManagerService){ }

    getChatData(eventId: number, userId: number) {
        let url = environment.baseUrl + `api/chat/getallmessages/${eventId}/${userId}`;
        return this.httpClient.get(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.dms.getToken()}`
            }
        })
    }
} 