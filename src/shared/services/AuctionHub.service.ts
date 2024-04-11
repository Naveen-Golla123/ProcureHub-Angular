import { Injectable } from "@angular/core";
import * as signalR from "@microsoft/signalr";
import { environment } from '../../environment';
import { DataManagerService } from "./DataManager.service";
@Injectable({
    providedIn: 'root'
})
export class AuctionHub{

    _hubConnection: signalR.HubConnection | undefined;
    constructor(private dms: DataManagerService) {
        let self = this;
        this._hubConnection = new signalR.HubConnectionBuilder()
            .withUrl(`${environment.baseUrl}auction`, {
                skipNegotiation: true,
                transport: signalR.HttpTransportType.WebSockets
            })
            .withAutomaticReconnect()
            .configureLogging(signalR.LogLevel.Trace)
            .build();

        this._hubConnection.onclose(()=>{
            self._hubConnection?.start();
        });
    }

    async startHub() {

        let userInfo = this.dms.getUserInfo();

        await this._hubConnection?.start().then((res:any)=>{
            let eventIdString = localStorage.getItem("eventId");
            let eventId = 0;
            if(eventIdString){
              eventId = Number(JSON.parse(eventIdString));
            }
            this._hubConnection?.invoke("AcknowledgeConnection", {
                eventId: eventId,
                userId : Number(userInfo.userId),
                connectionId: this._hubConnection.connectionId
            });
        });
    }
}